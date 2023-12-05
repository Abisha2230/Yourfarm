import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
// material
import { styled } from '@mui/material/styles';
//
//import EditorToolbar, { formats, redoChange, undoChange } from './QuillEditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  "& .ql-toolbar":{
    border:'none',
    borderBottom: `solid 1px ${theme.palette.grey[500_32]}`,
    button:{
      "&:hover":{
      color:theme.palette.primary.main,
        "& .ql-fill":{
          fill:theme.palette.primary.main,
        }
      },
    
    },
    "& .ql-active":{
      color:theme.palette.primary.main,
       "& .ql-fill":{
        fill:theme.palette.primary.main,
       }
     },
    "& .ql-formats":{
      button:{
        "&:hover":{
        color:theme.palette.primary.main,
        "& .ql-stroke":{
          stroke:theme.palette.primary.main,
        }
        },
      },
      "& .ql-picker-label":{
        "&:hover":{
          color:theme.palette.primary.main,
          "& .ql-stroke":{
            stroke:theme.palette.primary.main,
          }
        }
      },
      "& .ql-active":{
        color:theme.palette.primary.main,
        "& .ql-stroke":{
          stroke:theme.palette.primary.main,
        }
      },
      "& .ql-picker-item":{
        "&:hover":{
         color:theme.palette.primary.main,
         "& .ql-stroke":{
          stroke:theme.palette.primary.main,
         }
        }
 },
    }
  },
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily,
     maxHeight:"500px",
     overflowY:"scroll", 
       '&::-webkit-scrollbar':
{
height: '6px',
width:"6px",
  borderRadius: "10px",
  backgroundColor:theme.palette.background.neutral,
},

'&::-webkit-scrollbar-track': 
{
  width:" 6px",
},

'&::-webkit-scrollbar-thumb':
{
  borderRadius: '10px',

  backgroundColor: theme.palette.grey[400],
},

  },
  '& .ql-editor': {
    minHeight: 200,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900]
    }
  }
}));
// ----------------------------------------------------------------------

QuillEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  sx: PropTypes.object
};

export default function QuillEditor({ id, error, value, onChange,placeHolder, simple = false, sx, ...other }) {
  var toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],   
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],   // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],

    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
  };


  return (
    <RootStyle
      sx={{
        ...(error && {
          border: (theme) => `solid 1px ${theme.palette.error.main}`
        }),
        ...sx
      }}
    >
      
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder={`${placeHolder}...`}
        {...other}
      />
    </RootStyle>
  );
}
