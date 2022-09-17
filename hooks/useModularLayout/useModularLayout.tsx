import {
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from '@chakra-ui/react'
import React from 'react'
import { Box } from '@chakra-ui/layout'
import { ConditionalWrapper } from '../../components/ConditionalWrapper'

interface HookProps {
  gap?: string | {}
  borderColor?: string
  borderSize?: string
  borderRadius?: string
  isRenderWrapper?: boolean
  columnMaxWidth?: string
  paddingWrapperWithBorder?: string
  buttonSize?: {} | string
}

export const useModularLayout = ({
  gap = { base: 3, md: 4 },
  borderColor: borderColorGlobal = 'white',
  borderSize: borderSizeGlobal = '1px',
  borderRadius: borderRadiusGlobal = '5px',
  isRenderWrapper: isRenderWrapperGlobal,
  columnMaxWidth = '700px', // // small laptops generally have max width px of 1366, 2x700=1400 which will cover small laptops
  paddingWrapperWithBorder: paddingWrapperWithBorderGlobal = '15px',
  buttonSize: buttonSizeGlobal,
}: HookProps): {
  ModularConditionalWrapper: any
  ModularChild: any
  ModularParent: any
  ModularButton: any
  ModularTabs: any
  ModularTab: any
  ModularTabList: any
  ModularTabPanels: any
  ModularTabPanel: any
  blackAlphaBg: string
  whiteAlphaBg: string
  borderRadius: string
  border: string
} => {
  const buttonSizeDefault = useBreakpointValue({ base: 'sm', md: 'md' })
  const defaultButtonWidth = { base: '100%', sm: 'auto' }
  const justifyModularChildDefault = { base: 'center', sm: 'flex-start' }
  const blackAlphaBg = 'blackAlpha.300'
  const whiteAlphaBg = 'whiteAlpha.100'
  const border = `${borderSizeGlobal} solid ${borderColorGlobal}`

  const ModularParent = ({ children, bg, ...rest }: any): JSX.Element => (
    <Flex p={gap} w="100%" h="100%" bg={bg}>
      <Flex wrap={'wrap'} gap={gap} justify={'center'} w={'100%'} {...rest}>
        {children}
      </Flex>
    </Flex>
  )

  const ModularChild = ({
    children,
    showBorder,
    borderRadius,
    justify,
    order,
    paddingWrapperWithBorder,
    borderSize,
    blackAlphaBg: blackAlphaBgArg,
    whiteAlphaBg: whiteAlphaBgArg,
    bg,
    ...rest
  }: any): JSX.Element => (
    <Flex
      w={'100%'}
      border={
        showBorder
          ? `${borderSize ?? borderSizeGlobal} solid ${borderColorGlobal}`
          : undefined
      }
      borderRadius={borderRadius ?? borderRadiusGlobal}
      justify={justify ?? justifyModularChildDefault}
      p={
        bg || showBorder
          ? paddingWrapperWithBorderGlobal ?? paddingWrapperWithBorder
          : undefined
      }
      order={order}
      bg={
        bg
          ? bg
          : blackAlphaBgArg
          ? blackAlphaBg
          : whiteAlphaBgArg
          ? whiteAlphaBg
          : undefined
      }
      overflow={'hidden'}
      direction="column"
      {...rest}>
      {children}
    </Flex>
  )

  const ModularConditionalWrapper = ({
    isRenderWrapper,
    children,
    ...rest
  }): JSX.Element => (
    <ConditionalWrapper
      condition={isRenderWrapper ?? isRenderWrapperGlobal}
      wrapper={(children) => (
        <Box flex={1} maxW={columnMaxWidth} {...rest}>
          <Flex wrap={'wrap'} gap={gap}>
            {children}
          </Flex>
        </Box>
      )}>
      {children}
    </ConditionalWrapper>
  )

  const ModularButton = ({
    children,
    size: buttonSize,
    w,
    ...rest
  }): JSX.Element => (
    <Button
      size={buttonSize ?? buttonSizeGlobal ?? buttonSizeDefault}
      w={w ?? defaultButtonWidth}
      {...rest}>
      {children}
    </Button>
  )

  const ModularTabs = ({ children, ...rest }): JSX.Element => (
    <Tabs w={'100%'} {...rest}>
      {children}
    </Tabs>
  )

  const ModularTab = ({ children, ...rest }): JSX.Element => (
    <Tab {...rest}>{children}</Tab>
  )

  const ModularTabList = ({ children, ...rest }): JSX.Element => (
    <TabList justifyContent={{ base: 'center', sm: 'flex-start' }} {...rest}>
      {children}
    </TabList>
  )

  const ModularTabPanels = ({ children, ...rest }): JSX.Element => (
    <TabPanels borderRadius={borderRadiusGlobal} border={border} {...rest}>
      {children}
    </TabPanels>
  )

  const ModularTabPanel = ({ children, ...rest }): JSX.Element => (
    <TabPanel p={paddingWrapperWithBorderGlobal} m={0} {...rest}>
      {children}
    </TabPanel>
  )

  return {
    ModularChild,
    ModularParent,
    ModularConditionalWrapper,
    ModularButton,
    ModularTabs,
    ModularTab,
    ModularTabList,
    ModularTabPanels,
    ModularTabPanel,
    blackAlphaBg,
    whiteAlphaBg,
    borderRadius: borderRadiusGlobal,
    border,
  }
}
