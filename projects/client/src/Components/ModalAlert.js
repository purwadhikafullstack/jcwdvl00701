import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure
} from '@chakra-ui/react'

function ModalAlert(props){
    console.log(props);
    const { isOpen, onOpen, onClose } = useDisclosure()
    if(props === "true"){
        alert("ada")
    }
    return(
        <>
            <Button onClick={onOpen}>Open Modal</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>oke</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                    </ModalContent>
            </Modal>
        </>
    )
}

export default ModalAlert