export function stringSlugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function stringCapitalization({ str }: { str: string }) {
  var splitStr = str?.toLowerCase().split(" ");
  for (var i = 0; i < splitStr?.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr?.join(" ");
}

export function handleGetRandomNumbers(length: number): number {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function organizationNameViewer({
  organizationName,
  capitalization = true,
}: {
  organizationName: string;
  capitalization?: boolean;
}) {
  if (capitalization) {
    return stringCapitalization({
      str: organizationName?.split("_")[1],
    });
  }

  return organizationName?.split("_")[1];
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
  ].map((item: string) => localStorage.removeItem(item));
}
