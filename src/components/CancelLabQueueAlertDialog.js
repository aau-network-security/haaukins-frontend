import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'


export default function CancelLabQueueAlertDialog(props) {
    const onClickDelete = () => {
        props.cancelLabQueue()
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
                Cancel waiting for a lab?
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure you want to cancel waiting for a lab?<br/>
                If you try to create another lab you will be placed in the back of the queue.
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={props.cancelRef} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={onClickDelete} ml={3}>
                  Cancel waiting
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }