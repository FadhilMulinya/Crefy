import { FC } from 'react';
import { Folder, InsertDriveFile, ContentCopy, MoreVert, GetApp, Visibility, SwapHoriz, VisibilityOff } from '@mui/icons-material';
import { Menu, MenuItem, IconButton, Tooltip, Badge } from '@mui/material';
import { MouseEvent, useState } from 'react';

type File = {
    name: string;
    cid: string;
    date: string;
    size: string;
    type: 'file' | 'folder';
    isVerified?: boolean;
};

const files: File[] = [
    { name: 'High_School_Diploma.json', cid: 'Qmc3S...6vGQy', date: '11/8/2024', size: '1.16 MB', type: 'file', isVerified: true },
    { name: 'Campus_Degree.json', cid: 'QmTAw...F4VR7', date: '11/7/2024', size: '519 B', type: 'file', isVerified: true },
    { name: 'Encode_Club_Bootcamp.json', cid: 'Qmdu4...xcg4J', date: '10/17/2024', size: '99.41 KB', type: 'folder' },
];

const FileList: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [copiedCid, setCopiedCid] = useState<string | null>(null);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>, file: File) => {
        setAnchorEl(event.currentTarget);
        setSelectedFile(file);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedFile(null);
    };

    const handleAction = (action: string) => {
        if (selectedFile) {
            console.log(`${action} action on file: ${selectedFile.name}`);
        }
        handleMenuClose();
    };

    const handleCopyCid = (cid: string) => {
        navigator.clipboard.writeText(cid);
        setCopiedCid(cid);
        setTimeout(() => setCopiedCid(null), 2000);
    };

    return (
        <div className="text-gray-900 rounded-lg p-4">
            <div className="flex justify-between px-6 pb-4 border-b border-gray-700 text-gray-300 font-medium">
                <span className="w-1/4">Name</span>
                <span className="w-1/4 flex items-center justify-center">CID</span>
                <span className="w-1/4 flex items-center justify-center">Creation Date</span>
                <span className="w-1/4 text-center">Actions</span>
            </div>
            <div>
                {files.map((file, index) => (
                    <div 
                        key={index} 
                        className={`flex items-center p-5 py-6 ${hoveredRow === index ? 'bg-[#161736]' : 'bg-[#0A0B1E]'} border-gray-700 border my-2 rounded-xl transition-all duration-200`}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                    >
                        <div className="flex items-center w-1/4 gap-3 pr-1 overflow-hidden">
                            {file.type === 'file' ? (
                                <Badge
                                    color="success"
                                    variant="dot"
                                    invisible={!file.isVerified}
                                    overlap="circular"
                                >
                                    <div className="bg-[#1a1a3a] p-2 rounded-lg">
                                        <InsertDriveFile fontSize="large" style={{ color: '#4f9aff' }} />
                                    </div>
                                </Badge>
                            ) : (
                                <div className="bg-[#1a1a3a] p-2 rounded-lg">
                                    <Folder fontSize="large" style={{ color: '#ffc107' }} />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <p className="font-semibold text-gray-100 truncate">{file.name}</p>
                                <p className="text-xs text-gray-400">{file.size}</p>
                            </div>
                        </div>
                        <div className="w-1/4 flex items-center justify-center text-gray-400 font-mono truncate">
                            <span className="bg-[#121225] px-3 py-1 rounded-md text-sm">{file.cid}</span>
                            <Tooltip title={copiedCid === file.cid ? "Copied!" : "Copy CID"}>
                                <IconButton 
                                    onClick={() => handleCopyCid(file.cid)} 
                                    size="small" 
                                    className="ml-2"
                                    style={{ backgroundColor: copiedCid === file.cid ? '#1e3a57' : '#110a29' }}
                                >
                                    <ContentCopy fontSize="small" style={{ color: copiedCid === file.cid ? '#4CAF50' : '#ffffff' }} />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className="w-1/4 text-center text-gray-400">
                            {file.date}
                        </div>
                        <div className="w-1/4 flex justify-end items-center gap-2">
                            {hoveredRow === index && (
                                <>
                                    <Tooltip title="View">
                                        <IconButton 
                                            size="small" 
                                            style={{ backgroundColor: '#110a29', width: 36, height: 36 }}
                                            onClick={() => handleAction('View')}
                                        >
                                            <Visibility style={{ color: '#4CAF50' }} fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Transfer">
                                        <IconButton 
                                            size="small" 
                                            style={{ backgroundColor: '#110a29', width: 36, height: 36 }}
                                            onClick={() => handleAction('Transfer')}
                                        >
                                            <SwapHoriz style={{ color: '#0095FF' }} fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Hide">
                                        <IconButton 
                                            size="small" 
                                            style={{ backgroundColor: '#110a29', width: 36, height: 36 }}
                                            onClick={() => handleAction('Hide')}
                                        >
                                            <VisibilityOff style={{ color: '#ff5252' }} fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                            <IconButton 
                                onClick={(e) => handleMenuOpen(e, file)} 
                                style={{ 
                                    backgroundColor: '#110a29', 
                                    width: 40, 
                                    height: 40,
                                    transition: 'all 0.2s ease'
                                }}
                                className="hover:bg-[#1b1447]"
                            >
                                <MoreVert style={{ color: '#ffffff' }} />
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        backgroundColor: '#1f1f1f',
                        color: '#ffffff',
                        minWidth: '180px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    },
                }}
            >
                <MenuItem
                    style={{
                        padding: '12px 20px',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                    onClick={() => handleAction('View')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2e2e2e'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <Visibility style={{ color: '#4CAF50', marginRight: '10px' }} fontSize="small" />
                    <span style={{ color: '#ffffff', fontWeight: 500 }}>View</span>
                </MenuItem>
                <MenuItem
                    style={{
                        padding: '12px 20px',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                    onClick={() => handleAction('Transfer')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2e2e2e'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <SwapHoriz style={{ color: '#0095FF', marginRight: '10px' }} fontSize="small" />
                    <span style={{ color: '#ffffff', fontWeight: 500 }}>Transfer</span>
                </MenuItem>
                <MenuItem
                    style={{
                        padding: '12px 20px',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                    onClick={() => handleAction('Download')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2e2e2e'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <GetApp style={{ color: '#42a5f5', marginRight: '10px' }} fontSize="small" />
                    <span style={{ color: '#ffffff', fontWeight: 500 }}>Download</span>
                </MenuItem>
                <MenuItem
                    style={{
                        padding: '12px 20px',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                    onClick={() => handleAction('Hide')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2e2e2e'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <VisibilityOff style={{ color: '#ff5252', marginRight: '10px' }} fontSize="small" />
                    <span style={{ color: '#ffffff', fontWeight: 500 }}>Hide</span>
                </MenuItem>
            </Menu>

            <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-800 text-gray-300">
                <div className="text-sm">
                    Showing <span className="font-medium">1-{files.length}</span> of <span className="font-medium">{files.length}</span> certificates
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-300 text-sm">Rows per page:</span>
                        <select className="bg-[#12132D] border border-gray-700 rounded-md text-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option>10</option>
                            <option>20</option>
                            <option>30</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <button className="h-10 w-10 flex items-center justify-center rounded-md border border-gray-700 bg-[#12132D] text-gray-300 hover:bg-[#1a1b3a] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            {'<'}
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-md border border-gray-700 bg-[#12132D] text-gray-300 hover:bg-[#1a1b3a] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                            {'>'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileList;