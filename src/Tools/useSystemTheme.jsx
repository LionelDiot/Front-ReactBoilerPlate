import { useMediaQuery } from "react-responsive";

export default function useSystemTheme() {
  const prefersDarkMode = useMediaQuery({
    query: "(prefers-color-scheme: dark)"
  });

  return prefersDarkMode;
}