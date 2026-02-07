import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store.ts';
import { clearSelectedIds } from '@/features/users/model/usersSelectionSlice.ts';
import {
  useBlockMutation,
  useDeleteUnverifiedMutation,
  useDeleteUsersMutation,
  useUnblockMutation,
} from '@/features/users/api/usersApi.ts';
import type { ActionResponse } from '@/features/users/types/userApiTypes.ts';
import { Alert, Button, IconButton, Snackbar, Stack, Tooltip } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import type {ActionSuccess, Snack} from "@/features/users/types/usersTableTypes.ts";
import {isFetchBaseQueryError, isSerializedError} from "@/shared/helpers/constants.ts";


const getErrorMessage = (error: unknown, fallback: string) => {
  if (isFetchBaseQueryError(error)) {
    const payload = error.data;
    if (payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string') {
      return payload.message;
    }
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }
    return `${fallback} (${String(error.status)})`;
  }
  if (isSerializedError(error) && typeof error.message === 'string') {
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
};

export const UsersToolbar = () => {
  const dispatch = useDispatch();
  const selectedIds = useSelector((s: RootState) => s.usersSelection.selectedIds);

  const [blockUsers, blockState] = useBlockMutation();
  const [unblockUsers, unblockState] = useUnblockMutation();
  const [deleteUsers, deleteState] = useDeleteUsersMutation();
  const [deleteUnverified, deleteUnverifiedState] = useDeleteUnverifiedMutation();

  const [snack, setSnack] = useState<Snack>({ open: false, severity: 'success', text: '' });

  const selectedNumericIds = useMemo(
    () => Array.from(new Set(selectedIds.filter((id) => Number.isInteger(id) && id > 0))),
    [selectedIds],
  );

  const hasSelection = selectedNumericIds.length > 0;
  const busy = blockState.isLoading || unblockState.isLoading || deleteState.isLoading || deleteUnverifiedState.isLoading;

  const selectionLabel = useMemo(() => {
    if (!hasSelection) return 'No selection';
    return `Selected: ${selectedNumericIds.length}`;
  }, [hasSelection, selectedNumericIds.length]);

  const showOk = (text: string) => setSnack({ open: true, severity: 'success', text });
  const showErr = (text: string) => setSnack({ open: true, severity: 'error', text });

  const handleActionResponse = (response: ActionResponse, successText: string, failureText: string) => {
    if (response.ok) {
      const payload: ActionSuccess = response;
      showOk(payload.message || successText);
      dispatch(clearSelectedIds());
      return true;
    }
    showErr(response.message || failureText);
    return false;
  };

  const onBlock = async () => {
    try {
      const response = await blockUsers({ ids: selectedNumericIds }).unwrap();
      handleActionResponse(response, 'Users blocked', 'Failed to block users');
    } catch (error) {
      showErr(getErrorMessage(error, 'Failed to block users'));
    }
  };

  const onUnblock = async () => {
    try {
      const response = await unblockUsers({ ids: selectedNumericIds }).unwrap();
      handleActionResponse(response, 'Users unblocked', 'Failed to unblock users');
    } catch (error) {
      showErr(getErrorMessage(error, 'Failed to unblock users'));
    }
  };

  const onDelete = async () => {
    try {
      const response = await deleteUsers({ ids: selectedNumericIds }).unwrap();
      handleActionResponse(response, 'Users deleted', 'Failed to delete users');
    } catch (error) {
      showErr(getErrorMessage(error, 'Failed to delete users'));
    }
  };

  const onDeleteUnverified = async () => {
    try {
      const response = await deleteUnverified().unwrap();
      handleActionResponse(response, 'Unverified users deleted', 'Failed to delete unverified users');
    } catch (error) {
      showErr(getErrorMessage(error, 'Failed to delete unverified users'));
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Tooltip title="Block selected users">
            <span>
              <Button
                startIcon={<BlockIcon />}
                variant="contained"
                disabled={!hasSelection || busy}
                onClick={onBlock}
              >
                Block
              </Button>
            </span>
          </Tooltip>

          <Tooltip title="Unblock selected users">
            <span>
              <IconButton disabled={!hasSelection || busy} onClick={onUnblock} aria-label="unblock">
                <LockOpenIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Delete selected users">
            <span>
              <IconButton disabled={!hasSelection || busy} onClick={onDelete} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Delete all unverified users">
            <span>
              <IconButton disabled={busy} onClick={onDeleteUnverified} aria-label="delete-unverified">
                <MarkEmailUnreadIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <span style={{ opacity: 0.8 }}>{selectionLabel}</span>
        </Stack>
      </Stack>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snack.text}
        </Alert>
      </Snackbar>
    </>
  );
};
