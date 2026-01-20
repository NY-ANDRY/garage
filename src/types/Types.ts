export type ImgName = {
  icon?: string;
  name?: string;
};

export type CreationType = {
  date?: string;
  img?: string;
  made?: ImgName[];
  name?: string;
  title?: string;
  txt?: string;
  url?: string;
};

export type Tools = {
  from?: ImgName[];
  icon?: string;
  name?: string;
};

export type ToolsCategory = {
  skills?: Tools[];
  title?: string;
};

export type MessageStatus = {
  type?: string;
  text?: string;
}
/////