import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'


export default function AlertDialogResetVm(props) {
    const onClickDelete = () => {
      console.log(props.vmName, props.connectionIdentifier)
        props.resetVm(props.connectionIdentifier)
        props.onClose()
    }
    return (
      <>  
        <AlertDialog
          isOpen={props.isOpen}
          leastDestructiveRef={props.cancelRef}
          onClose={props.onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Reset{' ' + props.vmName}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure you want to reset <b>{props.vmName}</b>?<br/>
                This will recreate the VM from scratch.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={props.cancelRef} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={onClickDelete} ml={3}>
                  Reset
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }