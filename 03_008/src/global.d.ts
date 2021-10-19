declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}
