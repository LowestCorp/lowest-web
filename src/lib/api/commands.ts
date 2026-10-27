import { globalCache } from './globalCache';

const CACHE_DURATION = 24 * 60 * 60 * 1000;
const COMMANDS_CACHE_KEY = 'lowest_commands_data';
const API_BASE_URL = process.env.NEXT_PUBLIC_BOT_API || 'https://4o6pqo2k6u.apps.bot-hosting.cloud';
const API_ENDPOINT = `${API_BASE_URL}/raw`;

export interface CommandData {
  name: string;
  brief?: string | null;
  description?: string | null;
  permissions?: string[] | null;
  bot_permissions?: string[] | null;
  usage?: string | null;
  example?: string | null;
}

export interface StaticCommandData {
  name: string;
  brief?: string | null;
  example?: string | null;
}

export interface CommandsResponse {
  [category: string]: CommandData[];
}

export interface StaticCommandsResponse {
  [category: string]: StaticCommandData[];
}

let staticCommandsData: StaticCommandsResponse;

async function loadStaticCommandsData(): Promise<CommandsResponse> {
  if (!staticCommandsData) {
    try {
      const module = await import('@/data/commands.json');
      staticCommandsData = module.default;
    } catch (error) {
      console.error('Failed to load static commands data:', error);
      return {};
    }
  }
  
  const convertedData: CommandsResponse = {};
  
  for (const [category, commands] of Object.entries(staticCommandsData)) {
    convertedData[category] = commands.map(cmd => ({
      name: cmd.name,
      brief: cmd.brief || null,
      description: null,
      permissions: null,
      bot_permissions: null,
      usage: null,
      example: cmd.example || null
    }));
  }
  
  return convertedData;
}

export async function fetchCommands(): Promise<CommandsResponse> {
  return globalCache.withGlobalCache<CommandsResponse>(
    COMMANDS_CACHE_KEY,
    async () => {
      try {
        const response = await fetch(API_ENDPOINT, {
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        return await response.json();
      } catch (error) {
        console.log('Using local commands fallback...');
        
        const cachedData = localStorage.getItem(COMMANDS_CACHE_KEY);
        if (cachedData) {
          try {
            const { data } = JSON.parse(cachedData);
            if (data && Object.keys(data).length > 0) {
              return data;
            }
          } catch (e) {}
        }
        
        return await loadStaticCommandsData();
      }
    },
    CACHE_DURATION
  );
}

export function refreshCommands(): void {
  globalCache.clearCache(COMMANDS_CACHE_KEY);
}