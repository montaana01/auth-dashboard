import { DataGrid, type GridColDef, type GridPaginationModel, type GridRenderCellParams, type GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store.ts';
import { useGetTableQuery } from '@/features/users/api/usersApi.ts';
import { setSelectedIds } from '@/features/users/model/usersSelectionSlice.ts';
import type {TableUserRow} from "@/features/users/types/usersTableTypes.ts";

const formatDateTime = (value: string | null | undefined) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString();
};

const renderFlag = (params: GridRenderCellParams<TableUserRow, boolean>) => {
  const enabled = Boolean(params.value);
  return (
    <Tooltip title={enabled ? 'Yes' : 'No'}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', lineHeight: 0 }}>
        {enabled ? (
          <CheckRoundedIcon color="success" fontSize="small" sx={{ display: 'block' }} />
        ) : (
          <CloseRoundedIcon color="error" fontSize="small" sx={{ display: 'block' }} />
        )}
      </Box>
    </Tooltip>
  );
};

const columns: GridColDef<TableUserRow>[] = [
  { field: 'id', headerName: 'ID', width: 60, align: 'left', headerAlign: 'center' },
  { field: 'name', headerName: 'Name', width: 220, align: 'left', headerAlign: 'center' },
  { field: 'email', headerName: 'Email', minWidth: 180, flex: 1, align: 'left', headerAlign: 'center' },
  {
    field: 'isBlocked',
    headerName: 'Blocked',
    width: 80,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: renderFlag,
  },
  {
    field: 'emailVerified',
    headerName: 'E-mail',
    width: 70,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: renderFlag,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (value) => formatDateTime(value),
  },
  {
    field: 'lastLoginAt',
    headerName: 'Last login',
    minWidth: 170,
    align: 'center',
    headerAlign: 'center',
    valueFormatter: (value) => formatDateTime(value),
  },
];

export const UsersTable = () => {
  const dispatch = useDispatch();
  const selectedIds = useSelector((s: RootState) => s.usersSelection.selectedIds);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 25 });

  const limit = paginationModel.pageSize;
  const offset = paginationModel.page * paginationModel.pageSize;

  const { data, isLoading, isFetching, error } = useGetTableQuery({ limit, offset });

  const rows = useMemo<TableUserRow[]>(() => {
    if (!data || !('ok' in data) || data.ok !== true) return [];
    return data.rows
      .map((row) => {
        const id = typeof row.id === 'number' ? row.id : Number(row.id);
        if (!Number.isInteger(id) || id <= 0) return null;
        return {
          ...row,
          id,
        };
      })
      .filter((row): row is TableUserRow => row !== null)
      .sort((a, b) => {
        const aTime = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : -Infinity;
        const bTime = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : -Infinity;
        return bTime - aTime;
      });
  }, [data]);

  const rowSelectionModel = useMemo<GridRowSelectionModel>(
    () => ({ type: 'include', ids: new Set(selectedIds) }),
    [selectedIds],
  );

  const serverErrorMessage = useMemo(() => {
    if (data && 'ok' in data && data.ok === false) return data.message;
    if (error && typeof error === 'object' && 'status' in error) {
      const payload = error.data;
      if (payload && typeof payload === 'object' && 'message' in payload && typeof payload.message === 'string') {
        return payload.message;
      }
      return `Request failed: ${String(error.status)}`;
    }
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
      return error.message;
    }
    return null;
  }, [data, error]);

  return (
    <Paper sx={{ height: 520, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        disableRowSelectionExcludeModel
        getRowId={(row) => row.id}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(model) => {
          const ids = Array.from(model.ids)
            .map((id) => (typeof id === 'number' ? id : Number(id)))
            .filter((id) => Number.isInteger(id) && id > 0);
          dispatch(setSelectedIds(Array.from(new Set(ids))));
        }}
        loading={isLoading || isFetching}
        sx={{
          border: 0,
          '& .MuiDataGrid-cell': {
            textAlign: 'center',
            alignItems: 'center',
          },
          '& .MuiDataGrid-cellCheckbox': {
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& .MuiDataGrid-columnHeaderTitleContainer': {
            justifyContent: 'center',
          },
          '& .MuiDataGrid-columnHeader': {
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            textAlign: 'center',
            width: '100%',
          },
        }}
        rowHeight={52}
        columnHeaderHeight={52}
        slots={{
          noRowsOverlay: () => (
            <div style={{ padding: 16 }}>
              {serverErrorMessage ? `Error: ${serverErrorMessage}` : 'No users'}
            </div>
          ),
        }}
      />
    </Paper>
  );
};
