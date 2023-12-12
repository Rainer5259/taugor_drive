import {FormatterInputType} from '../../types/formatters';

export const formatInputValue = (
  value: number,
  type: FormatterInputType,
): any => {
  function formatSize(size: number) {
    function getSizeReference(a: number, b = 2) {
      if (!+a) {
        return 0;
      }
      let letter = 'B';
      const c = b < 0 ? 0 : b;
      const d = Math.floor(Math.log(a) / Math.log(1024));

      if (size < 1024) {
        return 'B';
      } else if (size < Math.pow(1024, 2)) {
        return 'KB';
      } else if (size < Math.pow(1024, 3)) {
        return 'MB';
      } else if (size < Math.pow(1024, 4)) {
        return 'GB';
      } else {
        return 'GB';
      }
    }

    if (!+size) {
      return 0;
    }

    if (size < 1024) {
      const roundedSize = parseFloat(size.toFixed(2));
      return {size: roundedSize, reference: 'B'};
    } else if (size < Math.pow(1024, 2)) {
      const roundedSize = parseFloat((size / 1024).toFixed(2));
      return {size: roundedSize, reference: 'KB'};
    } else if (size < Math.pow(1024, 3)) {
      const roundedSize = parseFloat((size / Math.pow(1024, 2)).toFixed(2));
      return {size: roundedSize, reference: 'MB'};
    } else {
      const roundedSize = parseFloat((size / Math.pow(1024, 3)).toFixed(1));
      return {size: roundedSize, reference: 'GB'};
    }
  }

  switch (type) {
    case 'size':
      return formatSize(value);

    default:
      return value;
  }
};
