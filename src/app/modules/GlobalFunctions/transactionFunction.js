export const thousandSeparator = str => {
  return `${(str || '').toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export const rmThousandSeparator = str => (str || '').toString().replace(/\./g, '');

export const convertLanguage = text => {
  switch (text) {
    case 'Initial Payment':
      return 'Gadai Baru';
    case 'Completed':
      return 'Lunas';
    case 'Repayment':
      return 'Pelunasan Sebagian';
    case 'Extend':
      return 'Perpanjangan';
    case 'Overdue':
      return 'Diluar Masa Aktif';
    case 'Mortgaged':
      return 'Lelang';
    default:
      return '';
  }
};
