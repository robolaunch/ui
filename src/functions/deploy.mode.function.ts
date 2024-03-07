export function handleDeployMode() {
  const urlParams = window.location.href?.split("?")?.[1] || "";

  const params = urlParams?.split("&")?.map((param: string) => {
    const key = param?.split("=")?.[0];
    const value = Boolean(param?.split("=")?.[1]);

    return {
      key: key,
      value: value,
    };
  });

  return params.find((param) => param.key === "deploy")?.value || false;
}
