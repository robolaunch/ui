export default function handleLogout() {
  [
    "tokens",
    "githubTokens",
    "persist:user",
    "persist:organization",
    "persist:roboticsCloud",
    "persist:fleet",
    "persist:robot",
    "persist:github",
    "persist:region",
    "persist:provider",
  ].map((item: string) => localStorage.removeItem(item));
}
