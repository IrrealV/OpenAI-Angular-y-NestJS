export interface Message {
  text?: string;
  isGpt: boolean;
  info?: Info;
  audioUrl?: string;
  imageInfo?: ImageInfo;
}

interface Info {
  userScore: number;
  errors: string[];
  message: string;
}

interface ImageInfo {
  url: string;
  alt: string;
}
