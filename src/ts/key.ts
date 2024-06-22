async function getApiKey(): Promise<string> {
    const response: Response = await fetch('https://murilo-figueiredo.github.io/Projeto-Lista-Filmes/src/key/api-key.txt');
    const key: string = await response.text();
    
    return key;
}