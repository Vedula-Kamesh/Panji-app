export const downloadCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert("No data to export!");
    return;
  }

  // 1. Extract the column headers dynamically from the first object's keys
  const headers = Object.keys(data[0]);
  
  // 2. Map the data into CSV string format
  const csvRows = [
    headers.join(','), // Add the header row
    ...data.map(row => 
      headers.map(fieldName => {
        // Wrap values in quotes and escape existing quotes to prevent comma splitting issues
        let value = row[fieldName] === null || row[fieldName] === undefined ? '' : String(row[fieldName]);
        return `"${value.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');

  // 3. Create a Blob (a file-like object) and trigger the browser download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};