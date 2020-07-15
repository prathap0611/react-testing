export interface RepoInfo {
    id: string,
    name:string;
    forks: number;
    watchers: number;
    issues: number;
}

export async function getRepos(query:string):Promise<RepoInfo[]> {
    try {
        if(query) {
            const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
            const data = await response.json();
            return ((data && data.items) || []).map((obj:any):RepoInfo => {
                return {
                    id: obj.id,
                    name: obj.full_name,
                    forks: obj.forks,
                    watchers: obj.watchers,
                    issues: obj.open_issues
                }
            });
        } else {
            return []
        }
    } catch (error) {
        throw error;
    }
} 

export async function getRepos1(query:string):Promise<RepoInfo[]> {
    try {
        if(query) {
            const response = await fetch(`https://api.github.com/search/repositories?q=${query}`);
            const data = await response.json();
            return ((data && data.items) || []).map((obj:any):RepoInfo => {
                return {
                    id: obj.id,
                    name: obj.full_name,
                    forks: obj.forks,
                    watchers: obj.watchers,
                    issues: obj.open_issues
                }
            });
        } else {
            return []
        }
    } catch (error) {
        throw error;
    }
}