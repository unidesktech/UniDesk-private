export interface StyleConfig {
  className?: string;
  inlineStyles?: React.CSSProperties;
}

export interface IconLink {
  icon: React.ElementType;
  href?: string;
  label?: string;
}
