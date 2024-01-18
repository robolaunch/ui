export default async function getCookies(): Promise<
  { name: string; value: string }[] | []
> {
  return (
    (document.cookie || "")?.split(";")?.map((cookie) => {
      const [name, value] = cookie.split("=").map((part) => part.trim());
      return { name, value };
    }) || []
  );
}
