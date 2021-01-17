declare module "*.json" {
  const content: any;
  export default content;
}

declare module '*.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}