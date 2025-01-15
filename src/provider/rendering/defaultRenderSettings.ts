export const defaultRenderSettings = {
    method: "default",
    timeout: (() => { 
      const NODE_ENV = typeof process !== 'undefined' ? process.env.NODE_ENV : ''; 
      return NODE_ENV === "development" || NODE_ENV === "test"; 
    })() ? null : 8000
} as const;