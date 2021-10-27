type PathType = "/" | "/life" | "/food" | "/travel" | "/culture" | "/favorites" | "/detail";
type NavInfoType = { path: PathType; name: string };

type ZumHubContentKeys = "life" | "food" | "travel" | "culture";
type ZunContentKeys = "ranking" | ZumHubContentKeys;

type ZumHubContentKeyNames = { [key in ZumHubContentKeys]: string };

export type { PathType, NavInfoType, ZumHubContentKeys, ZunContentKeys, ZumHubContentKeyNames };
