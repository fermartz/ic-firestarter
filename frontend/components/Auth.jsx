import React, { useCallback, useEffect, useState } from "react"
import {
  Box,
  Button,
  Typography,
  Hidden,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core"
import { AuthClient } from "@dfinity/auth-client"
import InfinityIcon from "@material-ui/icons/AllInclusiveOutlined"
import ExitIcon from "@material-ui/icons/ExitToAppOutlined"
import InfoIcon from "@material-ui/icons/InfoOutlined"
import IconButton from "@material-ui/core/IconButton"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
// Note: This is just a basic example to get you started
function Auth() {
  const [signedIn, setSignedIn] = useState(false)
  const [principal, setPrincipal] = useState("")
  const [client, setClient] = useState()

  const initAuth = async () => {
    const client = await AuthClient.create()
    const isAuthenticated = await client.isAuthenticated()

    setClient(client)

    if (isAuthenticated) {
      const identity = client.getIdentity()
      const principal = identity.getPrincipal().toString()
      setSignedIn(true)
      setPrincipal(principal)
    }
  }

  const signIn = async () => {
    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          const identity = client.getIdentity()
          const principal = identity.getPrincipal().toString()
          resolve({ identity, principal })
        },
        onError: reject,
      })
    })
    setSignedIn(true)
    setPrincipal(principal)
  }

  const signOut = async () => {
    await client.logout()
    setSignedIn(false)
    setPrincipal("")
  }
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    initAuth()
  }, [])

  return (
    <Box>
      {!signedIn && client ? (
        <Button
          variant="contained"
          color="primary"
          size="medium"
          endIcon={<InfinityIcon />}
          onClick={signIn}
        >
          Sign in
        </Button>
      ) : null}

      {signedIn ? (
        <Box>
          <Hidden mdDown>
            <Typography
              variant="subtitle1"
              style={{ display: "inline", margin: "1rem" }}
            >
              Signed in as: {principal}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              size="medium"
              endIcon={<ExitIcon />}
              onClick={signOut}
            >
              Sign out
            </Button>
          </Hidden>
          <Hidden lgUp>
            <IconButton onClick={handleClickOpen} aria-label="info">
              <InfoIcon />
            </IconButton>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-info-title"
              aria-describedby="alert-dialog-info-description"
            >
              <DialogTitle id="alert-dialog-info-title">
                Signed in as:
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-info-description">
                  {principal}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  color="primary"
                  size="medium"
                  endIcon={<ExitIcon />}
                  onClick={() => {
                    signOut()
                    handleClose()
                  }}
                >
                  Sign out
                </Button>
              </DialogActions>
            </Dialog>
          </Hidden>
        </Box>
      ) : null}
    </Box>
  )
}

export { Auth }
