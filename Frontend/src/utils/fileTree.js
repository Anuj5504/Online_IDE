
export function transformFilesToTree(files) {
  const root = [];

  files.forEach((file) => {
    const parts = file.path.split("/").filter(Boolean); // folder structure
    let current = root;

    parts.forEach((part, index) => {
      let existing = current.find(
        (node) => node.name === part && node.isFolder
      );

      if (!existing) {
        existing = {
          id: `${file._id}-folder-${index}-${part}`,
          name: part,
          isFolder: true,
          children: [],
        };
        current.push(existing);
      }

      current = existing.children;
    });

    current.push({
      id: file._id,
      name: file.name,
      language: file.fileType,
      isFolder: false,
      dirty: false, 
    });
  });

  return root;
}
