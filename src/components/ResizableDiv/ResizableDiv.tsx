import React, {useState, useRef, FC} from 'react';

interface ResizableDivProps {
  children: React.ReactNode;
}

const ResizableDiv: FC<ResizableDivProps> = ({children}) => {
  const [width, setWidth] = useState<number>(300); // initial width
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const resizableRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !resizableRef.current) return;

    // Get the position of the mouse relative to the container
    const newWidth = e.clientX - resizableRef.current.getBoundingClientRect().left;

    // Update the width dynamically
    if (newWidth > 50) { // Prevent width from becoming too small
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
      <div
          ref={resizableRef}
          style={{
            width: `${width}px`,
            height: '200px',
            border: '1px solid black',
            position: 'relative',
            backgroundColor: 'lightgray',
          }}
      >
        <div
            onMouseDown={handleMouseDown}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '5px',
              cursor: 'ew-resize',
              backgroundColor: 'darkgray',
            }}
        />
        {children}
      </div>
  );
};

export default ResizableDiv;
