"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../contexts/AuthContext";
import { validateHeaderName } from "http";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

interface DialogContextProps {
    openDialog: () => void;
    closeDialog: () => void;
}

const DialogContext = React.createContext<DialogContextProps>({
    openDialog: () => {},
    closeDialog: () => {},
});

export function useDialog() {
    return React.useContext(DialogContext);
}

interface DialogProviderProps {
    children: React.ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);

    const openDialog = () => {
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            <LoginDialog open={open} onClose={closeDialog} />
        </DialogContext.Provider>
    );
};

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
    const [loading, setLoading] = React.useState(false);
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorMessageEmail, setErrorMessageEmail] = React.useState("");
    const [errorPW, setErrorPW] = React.useState(false);
    const [errorMessagePW, setErrorMessagePW] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { login } = useAuth();
    const handleClose = () => {
        if (loading) {
            return;
        }
        onClose();
    };
    const validateForm = () => {
        if (!email) {
            setErrorEmail(true);
            setErrorMessageEmail("Please enter an email ");
        } else {
            setErrorEmail(false);
            setErrorMessageEmail("");
        }
        if (!password) {
            setErrorPW(true);
            setErrorMessagePW("Please enter a password");
        } else {
            setErrorPW(false);
            setErrorMessagePW("");
        }
        return email && password;
    };

    React.useEffect(() => {
        if (email) {
            setErrorEmail(false);
            setErrorMessageEmail("");
        }
        if (password) {
            setErrorPW(false);
            setErrorMessagePW("");
        }
    }, [email, password]);

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        const res: any = await login(email, password);
        setLoading(false);
        if (res.result) {
            onClose();
        } else {
            setErrorEmail(true);
            setErrorMessageEmail(res.message);
            setErrorPW(true);
            setErrorMessagePW(res.message);
        }
    };

    return (
        <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogContent dividers>
                <TextField required={true} autoFocus margin="normal" label="Email" type="email" fullWidth disabled={loading} error={errorEmail} helperText={errorMessageEmail} onChange={(e) => setEmail(e.target.value)} />
                <TextField required={true} margin="normal" label="Password" type="password" fullWidth disabled={loading} error={errorPW} helperText={errorMessagePW} onChange={(e) => setPassword(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} disabled={loading}>
                    Cancel
                </Button>
                <LoadingButton onClick={handleLogin} loading={loading} variant="contained" color="primary">
                    <span>Login</span>
                </LoadingButton>
            </DialogActions>
        </BootstrapDialog>
    );
};
