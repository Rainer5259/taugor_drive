import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FirebaseServices from '~/services/firebase';
import {RootState} from '~/services/redux/store';

export const useUsedSpace = () => {
  const dispatch = useDispatch();
  const {user, uploading} = useSelector((state: RootState) => state.user);

  const [totalBytesUsed, setTotalBytesUsed] = useState<number>(0);

  useEffect(() => {
    const fetchUsedSpace = async () => {
      try {
        const bytes = await FirebaseServices.storage.get.getMetadataByUserID(
          user!.id,
        );

        if (bytes !== 0) {
          const gigabytes = bytes / (1024 * 1024 * 1024);
          setTotalBytesUsed(parseFloat(gigabytes.toFixed(2)));
        } else {
          setTotalBytesUsed(0);
        }
      } catch (error) {}
    };

    if (user) {
      fetchUsedSpace();
    }
  }, [uploading === false]);

  return totalBytesUsed;
};
