declare type Chain = {
  label: string;
  token: string;
  chainId: number;
  rpcUrl: string;
}

declare type Attribute = {
  trait_type: string;
  value: string;
}

declare type Metadata = {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  attributes: Array<Attribute>
}

export { Chain, Metadata, Attribute }