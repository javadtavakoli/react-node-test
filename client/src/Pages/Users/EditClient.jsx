import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/action/user';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema } from '../../utils/validationSchemas';
import { Dialog, DialogContent, DialogTitle, Slide, DialogActions, TextField } from '@mui/material';
import { PiNotepad, PiXLight } from 'react-icons/pi';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditClient = ({ open, setOpen }) => {
  const { isFetching, currentClient } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
    values: {
      ...currentClient,
    },
  });

  useEffect(() => {
    if (currentClient) {
      reset({ ...currentClient });
    }
  }, [currentClient, reset]);

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = data => {
    dispatch(updateUser(currentClient._id, data, setOpen));
    handleClose();
  };

  return (
    <Dialog
      scroll={'paper'}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth="sm"
      maxWidth="sm"
      aria-describedby="alert-dialog-slide-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Edit Client</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Client Details</span>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <TextField
                  size="small"
                  fullWidth
                  label="First Name"
                  {...register('firstName')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <TextField
                  size="small"
                  fullWidth
                  label="Last Name"
                  {...register('lastName')}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <TextField
                  size="small"
                  fullWidth
                  label="Username"
                  {...register('username')}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <TextField
                  size="small"
                  fullWidth
                  label="Email"
                  placeholder="Optional"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <TextField
                  type="password"
                  size="small"
                  fullWidth
                  label="Password"
                  placeholder="Leave blank to keep current password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <TextField
                  type="number"
                  size="small"
                  fullWidth
                  label="Phone"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            type="button"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
          >
            {isFetching ? 'Updating...' : 'Update'}
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditClient;
