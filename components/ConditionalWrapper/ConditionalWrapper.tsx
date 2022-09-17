interface Props {
  condition: boolean
  wrapper: Function
  children: React.ReactNode
}

export const ConditionalWrapper = ({
  condition,
  wrapper,
  children
}: Props): JSX.Element => (condition ? wrapper(children) : children)
