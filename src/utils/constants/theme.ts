type Theme = {
    bg: string;
    primary: string;
    nodeBg: string;
    nodeColor: string;
    nodeBorder: string;
    minimapMaskBg: string;
    controlsBg: string;
    controlsBgHover: string;
    controlsColor: string;
    controlsBorder: string;
  };
  
  export const lightTheme: Theme = {
    bg: "#fff",
    primary: "#ff0072",
  
    nodeBg: "#f2f2f5",
    nodeColor: "#222",
    nodeBorder: "#222",
  
    minimapMaskBg: "#f2f2f5",
  
    controlsBg: "#fefefe",
    controlsBgHover: "#eee",
    controlsColor: "#222",
    controlsBorder: "#ddd",
  };
  
  export const darkTheme: Theme = {
    bg: "#000",
    primary: "#ff0072",
  
    nodeBg: "#343435",
    nodeColor: "#f9f9f9",
    nodeBorder: "#888",
  
    minimapMaskBg: "#343435",
  
    controlsBg: "#555",
    controlsBgHover: "#676768",
    controlsColor: "#dddddd",
    controlsBorder: "#676768",
  };
  