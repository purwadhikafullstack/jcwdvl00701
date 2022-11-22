import {Button, HStack, Input, useNumberInput} from "@chakra-ui/react";

function StepperInput(props) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    min: 0, defaultValue: 0
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <HStack>
      <Button rounded='full' {...dec}>-</Button>
      <Input style={{'width': '80px'}} textAlign='center' {...input}/>
      <Button rounded='full' {...inc}>+</Button>
    </HStack>
  )
}

export default StepperInput
