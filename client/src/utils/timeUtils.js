export const getFormattedTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { timeZoneName: 'short' });
}; 