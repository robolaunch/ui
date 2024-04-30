export function orgSplitter(orgName: string): string {
  return orgName?.split("_")[1];
}

export function stringSlugify(text: string): string {
  if (text) {
    return text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  return text;
}

export function stringCapitalization({ str }: { str: string }) {
  var splitStr = str?.toLowerCase().split(" ");
  for (var i = 0; i < splitStr?.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr?.join(" ");
}

export function handleGenerateRandomString(length: number): string {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}

export function handleLogout() {
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
    "persist:trial",
    "persist:marketplace",
    "persist:instance",
  ].map((item: string) => localStorage.removeItem(item));
}
