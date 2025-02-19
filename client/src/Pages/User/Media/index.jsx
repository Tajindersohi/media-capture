import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Grid, Alert, IconButton, Tabs, Tab, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ThemeButton from "../../../Components/Common/ThemeButton";
import CommonModal from "../../../Components/Common/CommonModal";
import AddIcon from "@mui/icons-material/Add";
import { addMedia, getMediaList } from "../../../store/redux/mediaThunk";
import MediaUploader from '../../../Components/Common/MediaUploader'
import { showError } from "../../../Assets/Constants/showNotifier";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TabDetails from "./TabDetails";
import MediaCard from "./MediaCard";
import { appUrl } from "../../../Assets/Constant";

const tabLabels = ["All", "Images", "Videos"];
const skeletons = [1,2,3,4,5,6,7,8,9,0];
export default function ProductList() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.user);
  const { data: mediaList, isLoading, error } = useSelector((state) => state.media);
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [validError, setValidError] = useState('');
  const [newMedia, setNewMedia] = useState({
    title: "",
  });
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    dispatch(getMediaList());
  }, [dispatch]);


  console.log("isLoadingisLoading",user);

  const handleSubmit = async () => {
    if(!newMedia.title){
      setValidError('title');
      return;
    }
    if (!selectedMedia) {
      showError("Please choose an media");
      return;
    }
    const formData = new FormData();
    formData.append("title", newMedia.title);
    formData.append("media", selectedMedia.file);
  
    dispatch(addMedia(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setOpenAddProduct(false);
        dispatch(getMediaList());
        setSelectedMedia(null);
      }
    });
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  return (
    <Box maxWidth={"1200px"} p={3}>
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h5" color="#02cfac"><b>Your Media List</b></Typography>
        <Box>
          <IconButton
            sx={{ display: { xs: "block", sm: "none" } }} 
            color="success"
            onClick={() => setOpenAddProduct(true)}
          > 
            <AddCircleIcon fontSize="inherit" />
          </IconButton>

          <ThemeButton
            sx={{ display: { xs: "none", sm: "flex" } }} 
            label="Upload Media"
            onClick={() => setOpenAddProduct(true)}
            variant="primary"
            icon={<AddIcon />}
          />
        </Box>

      </Box>
      {error && <Alert sx={{my:2}} severity="error">{error}</Alert>}
      {isLoading ?
      <Grid container spacing={2}>
          {skeletons.map((i)=>{
            {console.log("iii",i)}
            return <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" width={350} height={200} />
            </Grid>
          })} 
        </Grid>
        :
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="media tabs">
              {tabLabels.map((label, index) => (
                <Tab key={index} label={label} {...a11yProps(index)} />
              ))}
            </Tabs>
          </Box>
          <TabDetails value={value} index={0}>
              {mediaList.length === 0 && (
              <Box height="400px"  display="flex" alignItems="center" justifyContent="center">
                <Box  display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                  <Box textAlign={'center'}>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                        <radialGradient id="NYhjVJE2nWDs9wte_btsba_119094_gr1" cx="242.813" cy="287.333" r="206.704" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#f4e9c3"></stop><stop offset=".219" stop-color="#f8eecd"></stop><stop offset=".644" stop-color="#fdf4dc"></stop><stop offset="1" stop-color="#fff6e1"></stop></radialGradient><path fill="url(#NYhjVJE2nWDs9wte_btsba_119094_gr1)" d="M6,4L6,4c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v0c0,2.209-1.791,4-4,4h0 C7.791,8,6,6.209,6,4z M7.5,64L7.5,64c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5h0C5.567,57,4,58.567,4,60.5v0 C4,62.433,5.567,64,7.5,64z M57.5,25h-10c-1.933,0-3.5,1.567-3.5,3.5v0c0,1.933,1.567,3.5,3.5,3.5H49c2.209,0,4,1.791,4,4v0 c0,2.209-1.791,4-4,4h-0.5c-1.381,0-2.5,1.119-2.5,2.5v0c0,1.381,1.119,2.5,2.5,2.5H54c2.209,0,4,1.791,4,4v0c0,2.209-1.791,4-4,4 h-8c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h0.5c1.933,0,3.5,1.567,3.5,3.5v0c0,1.933-1.567,3.5-3.5,3.5h-29 c-1.933,0-3.5-1.567-3.5-3.5v0c0-1.933,1.567-3.5,3.5-3.5h0c1.381,0,2.5-1.119,2.5-2.5v0c0-1.381-1.119-2.5-2.5-2.5H9 c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4h4.5c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5H5c-2.761,0-5-2.239-5-5v0 c0-2.761,2.239-5,5-5h3c1.657,0,3-1.343,3-3v0c0-1.657-1.343-3-3-3H5.5C3.567,21,2,19.433,2,17.5v0C2,15.567,3.567,14,5.5,14H24 c1.657,0,3-1.343,3-3v0c0-1.657-1.343-3-3-3h-2c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4l24,0c2.209,0,4,1.791,4,4v0 c0,2.209-1.791,4-4,4h-2c-2.209,0-4,1.791-4,4v0c0,2.209,1.791,4,4,4h13.5c2.485,0,4.5,2.015,4.5,4.5v0C62,22.985,59.985,25,57.5,25 z M63,36L63,36c0-2.209-1.791-4-4-4h0c-2.209,0-4,1.791-4,4v0c0,2.209,1.791,4,4,4h0C61.209,40,63,38.209,63,36z"></path><linearGradient id="NYhjVJE2nWDs9wte_btsbb_119094_gr2" x1="31.5" x2="31.5" y1="6" y2="57.004" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#a4a4a4"></stop><stop offset=".63" stop-color="#7f7f7f"></stop><stop offset="1" stop-color="#6f6f6f"></stop><stop offset="1" stop-color="#6f6f6f"></stop></linearGradient><path fill="url(#NYhjVJE2nWDs9wte_btsbb_119094_gr2)" d="M55.846,49.998l0.006-0.006L43.621,37.761C45.752,34.528,47,30.662,47,26.5 C47,15.178,37.822,6,26.5,6S6,15.178,6,26.5S15.178,47,26.5,47c4.163,0,8.031-1.249,11.265-3.381l12.232,12.229 c1.542,1.542,4.04,1.542,5.581,0l0.268-0.268C57.385,54.038,57.385,51.54,55.846,49.998z"></path><linearGradient id="NYhjVJE2nWDs9wte_btsbc_119094_gr3" x1="26.5" x2="26.5" y1="41" y2="12" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#739eeb"></stop><stop offset=".405" stop-color="#7ab5f0"></stop><stop offset="1" stop-color="#82d2f6"></stop></linearGradient><path fill="url(#NYhjVJE2nWDs9wte_btsbc_119094_gr3)" d="M26.5 12A14.5 14.5 0 1 0 26.5 41A14.5 14.5 0 1 0 26.5 12Z"></path><path fill="#fff" d="M30 22L30 22c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h0C30.9 24 30 23.1 30 22zM19 22L19 22c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h0C19.9 24 19 23.1 19 22z"></path><g><path fill="#fff" d="M31.5,34c-0.389,0-0.777-0.15-1.071-0.45C30.175,33.291,28.792,32,26.5,32 c-0.002,0-0.004,0-0.006,0c-2.29,0.002-3.669,1.292-3.923,1.55c-0.579,0.592-1.53,0.602-2.121,0.021s-0.601-1.53-0.021-2.121 c0.563-0.574,2.663-2.447,6.062-2.45c0.003,0,0.006,0,0.009,0c3.404,0,5.507,1.875,6.071,2.45c0.58,0.591,0.57,1.541-0.021,2.121 C32.258,33.857,31.879,34,31.5,34z"></path></g>
                    </svg>
                  </Box>
                    <Alert sx={{mt:3}} severity="info">No media found</Alert>
                </Box>
              </Box>
              
             )}
              <Grid container spacing={2}>
                {mediaList.map((media) => (
                  <Grid item xs={12} sm={6} md={4} key={media._id}>
                      {media.mediaType === "image" ? (
                          <Box
                            sx={{
                              position: "relative",
                              textAlign: "center",
                              border: "1px solid #ddd",
                              borderRadius: "10px",
                              transition:"height 2s",
                              overflow: "hidden",
                            }}
                            >
                            <Box
                              sx={{
                                backgroundImage: `url(${appUrl}${media.mediaUrl})`,
                                backgroundSize: "contain", 
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center", 
                                height: { xs: "190px", sm: "133px", md: "125px", lg: "220px" }, 
                                maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
                                mx: "auto",
                              }}
                              />

                            <Box my={2} px={2} textAlign={'left'} >
                                <Typography color="#0c831f" variant="h5"><b>{media.title}</b></Typography>
                            </Box>
                        </Box>
                      ) : (
                        <Box
                            sx={{
                              position: "relative",
                              textAlign: "center",
                              border: "1px solid #ddd",
                              borderRadius: "10px",
                              transition:"height 2s",
                              overflow: "hidden",
                            }}
                            >
                          <Box
                              sx={{
                                width: "100%",
                                height: { xs: "190px", sm: "133px", md: "125px", lg: "220px" }, 
                                maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
                              }}
                            >
                              <video width="100%" controls>
                                <source src={`${appUrl}${media.mediaUrl}`} type="video/mp4" />
                                  Your browser does not support the video tag.
                              </video>
                            </Box>
                            <Box my={2} px={2} textAlign={'left'} >
                                <Typography color="#0c831f" variant="h5"><b>{media.title}</b></Typography>
                            </Box>
                        </Box>              
                      )}
                  </Grid>
                ))}
              </Grid>
          </TabDetails>
          <TabDetails value={value} index={1}>
            {mediaList.length === 0 || (mediaList.filter((media)=>media.mediaType == 'image').length === 0) &&  (
            <Box height="400px"  display="flex" alignItems="center" justifyContent="center">
              <Box  display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                <Box textAlign={'center'}>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                      <radialGradient id="NYhjVJE2nWDs9wte_btsba_119094_gr1" cx="242.813" cy="287.333" r="206.704" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#f4e9c3"></stop><stop offset=".219" stop-color="#f8eecd"></stop><stop offset=".644" stop-color="#fdf4dc"></stop><stop offset="1" stop-color="#fff6e1"></stop></radialGradient><path fill="url(#NYhjVJE2nWDs9wte_btsba_119094_gr1)" d="M6,4L6,4c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v0c0,2.209-1.791,4-4,4h0 C7.791,8,6,6.209,6,4z M7.5,64L7.5,64c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5h0C5.567,57,4,58.567,4,60.5v0 C4,62.433,5.567,64,7.5,64z M57.5,25h-10c-1.933,0-3.5,1.567-3.5,3.5v0c0,1.933,1.567,3.5,3.5,3.5H49c2.209,0,4,1.791,4,4v0 c0,2.209-1.791,4-4,4h-0.5c-1.381,0-2.5,1.119-2.5,2.5v0c0,1.381,1.119,2.5,2.5,2.5H54c2.209,0,4,1.791,4,4v0c0,2.209-1.791,4-4,4 h-8c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h0.5c1.933,0,3.5,1.567,3.5,3.5v0c0,1.933-1.567,3.5-3.5,3.5h-29 c-1.933,0-3.5-1.567-3.5-3.5v0c0-1.933,1.567-3.5,3.5-3.5h0c1.381,0,2.5-1.119,2.5-2.5v0c0-1.381-1.119-2.5-2.5-2.5H9 c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4h4.5c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5H5c-2.761,0-5-2.239-5-5v0 c0-2.761,2.239-5,5-5h3c1.657,0,3-1.343,3-3v0c0-1.657-1.343-3-3-3H5.5C3.567,21,2,19.433,2,17.5v0C2,15.567,3.567,14,5.5,14H24 c1.657,0,3-1.343,3-3v0c0-1.657-1.343-3-3-3h-2c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4l24,0c2.209,0,4,1.791,4,4v0 c0,2.209-1.791,4-4,4h-2c-2.209,0-4,1.791-4,4v0c0,2.209,1.791,4,4,4h13.5c2.485,0,4.5,2.015,4.5,4.5v0C62,22.985,59.985,25,57.5,25 z M63,36L63,36c0-2.209-1.791-4-4-4h0c-2.209,0-4,1.791-4,4v0c0,2.209,1.791,4,4,4h0C61.209,40,63,38.209,63,36z"></path><linearGradient id="NYhjVJE2nWDs9wte_btsbb_119094_gr2" x1="31.5" x2="31.5" y1="6" y2="57.004" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#a4a4a4"></stop><stop offset=".63" stop-color="#7f7f7f"></stop><stop offset="1" stop-color="#6f6f6f"></stop><stop offset="1" stop-color="#6f6f6f"></stop></linearGradient><path fill="url(#NYhjVJE2nWDs9wte_btsbb_119094_gr2)" d="M55.846,49.998l0.006-0.006L43.621,37.761C45.752,34.528,47,30.662,47,26.5 C47,15.178,37.822,6,26.5,6S6,15.178,6,26.5S15.178,47,26.5,47c4.163,0,8.031-1.249,11.265-3.381l12.232,12.229 c1.542,1.542,4.04,1.542,5.581,0l0.268-0.268C57.385,54.038,57.385,51.54,55.846,49.998z"></path><linearGradient id="NYhjVJE2nWDs9wte_btsbc_119094_gr3" x1="26.5" x2="26.5" y1="41" y2="12" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#739eeb"></stop><stop offset=".405" stop-color="#7ab5f0"></stop><stop offset="1" stop-color="#82d2f6"></stop></linearGradient><path fill="url(#NYhjVJE2nWDs9wte_btsbc_119094_gr3)" d="M26.5 12A14.5 14.5 0 1 0 26.5 41A14.5 14.5 0 1 0 26.5 12Z"></path><path fill="#fff" d="M30 22L30 22c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h0C30.9 24 30 23.1 30 22zM19 22L19 22c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h0C19.9 24 19 23.1 19 22z"></path><g><path fill="#fff" d="M31.5,34c-0.389,0-0.777-0.15-1.071-0.45C30.175,33.291,28.792,32,26.5,32 c-0.002,0-0.004,0-0.006,0c-2.29,0.002-3.669,1.292-3.923,1.55c-0.579,0.592-1.53,0.602-2.121,0.021s-0.601-1.53-0.021-2.121 c0.563-0.574,2.663-2.447,6.062-2.45c0.003,0,0.006,0,0.009,0c3.404,0,5.507,1.875,6.071,2.45c0.58,0.591,0.57,1.541-0.021,2.121 C32.258,33.857,31.879,34,31.5,34z"></path></g>
                  </svg>
                </Box>
                  <Alert sx={{mt:3}} severity="info">No media found</Alert>
              </Box>
            </Box>
          )}
          <Grid container spacing={2}>
            {mediaList.filter((media)=>media.mediaType == 'image').map((media) => (
              <Grid item xs={12} sm={6} md={4} key={media._id}>
                <MediaCard media={media} />
              </Grid>
            ))}
          </Grid>
          </TabDetails>
          <TabDetails value={value} index={2}>
              {mediaList.length === 0 || (mediaList.filter((media)=>media.mediaType == 'video').length === 0) &&  (
                <Box height="400px"  display="flex" alignItems="center" justifyContent="center">
                  <Box  display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Box textAlign={'center'}>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 64 64">
                          <radialGradient id="NYhjVJE2nWDs9wte_btsba_119094_gr1" cx="242.813" cy="287.333" r="206.704" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#f4e9c3"></stop><stop offset=".219" stop-color="#f8eecd"></stop><stop offset=".644" stop-color="#fdf4dc"></stop><stop offset="1" stop-color="#fff6e1"></stop></radialGradient><path fill="url(#NYhjVJE2nWDs9wte_btsba_119094_gr1)" d="M6,4L6,4c0-2.209,1.791-4,4-4h0c2.209,0,4,1.791,4,4v0c0,2.209-1.791,4-4,4h0 C7.791,8,6,6.209,6,4z M7.5,64L7.5,64c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5h0C5.567,57,4,58.567,4,60.5v0 C4,62.433,5.567,64,7.5,64z M57.5,25h-10c-1.933,0-3.5,1.567-3.5,3.5v0c0,1.933,1.567,3.5,3.5,3.5H49c2.209,0,4,1.791,4,4v0 c0,2.209-1.791,4-4,4h-0.5c-1.381,0-2.5,1.119-2.5,2.5v0c0,1.381,1.119,2.5,2.5,2.5H54c2.209,0,4,1.791,4,4v0c0,2.209-1.791,4-4,4 h-8c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h0.5c1.933,0,3.5,1.567,3.5,3.5v0c0,1.933-1.567,3.5-3.5,3.5h-29 c-1.933,0-3.5-1.567-3.5-3.5v0c0-1.933,1.567-3.5,3.5-3.5h0c1.381,0,2.5-1.119,2.5-2.5v0c0-1.381-1.119-2.5-2.5-2.5H9 c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4h4.5c1.933,0,3.5-1.567,3.5-3.5v0c0-1.933-1.567-3.5-3.5-3.5H5c-2.761,0-5-2.239-5-5v0 c0-2.761,2.239-5,5-5h3c1.657,0,3-1.343,3-3v0c0-1.657-1.343-3-3-3H5.5C3.567,21,2,19.433,2,17.5v0C2,15.567,3.567,14,5.5,14H24 c1.657,0,3-1.343,3-3v0c0-1.657-1.343-3-3-3h-2c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4l24,0c2.209,0,4,1.791,4,4v0 c0,2.209-1.791,4-4,4h-2c-2.209,0-4,1.791-4,4v0c0,2.209,1.791,4,4,4h13.5c2.485,0,4.5,2.015,4.5,4.5v0C62,22.985,59.985,25,57.5,25 z M63,36L63,36c0-2.209-1.791-4-4-4h0c-2.209,0-4,1.791-4,4v0c0,2.209,1.791,4,4,4h0C61.209,40,63,38.209,63,36z"></path><linearGradient id="NYhjVJE2nWDs9wte_btsbb_119094_gr2" x1="31.5" x2="31.5" y1="6" y2="57.004" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#a4a4a4"></stop><stop offset=".63" stop-color="#7f7f7f"></stop><stop offset="1" stop-color="#6f6f6f"></stop><stop offset="1" stop-color="#6f6f6f"></stop></linearGradient><path fill="url(#NYhjVJE2nWDs9wte_btsbb_119094_gr2)" d="M55.846,49.998l0.006-0.006L43.621,37.761C45.752,34.528,47,30.662,47,26.5 C47,15.178,37.822,6,26.5,6S6,15.178,6,26.5S15.178,47,26.5,47c4.163,0,8.031-1.249,11.265-3.381l12.232,12.229 c1.542,1.542,4.04,1.542,5.581,0l0.268-0.268C57.385,54.038,57.385,51.54,55.846,49.998z"></path><linearGradient id="NYhjVJE2nWDs9wte_btsbc_119094_gr3" x1="26.5" x2="26.5" y1="41" y2="12" gradientUnits="userSpaceOnUse" spreadMethod="reflect"><stop offset="0" stop-color="#739eeb"></stop><stop offset=".405" stop-color="#7ab5f0"></stop><stop offset="1" stop-color="#82d2f6"></stop></linearGradient><path fill="url(#NYhjVJE2nWDs9wte_btsbc_119094_gr3)" d="M26.5 12A14.5 14.5 0 1 0 26.5 41A14.5 14.5 0 1 0 26.5 12Z"></path><path fill="#fff" d="M30 22L30 22c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h0C30.9 24 30 23.1 30 22zM19 22L19 22c0-1.1.9-2 2-2h0c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2h0C19.9 24 19 23.1 19 22z"></path><g><path fill="#fff" d="M31.5,34c-0.389,0-0.777-0.15-1.071-0.45C30.175,33.291,28.792,32,26.5,32 c-0.002,0-0.004,0-0.006,0c-2.29,0.002-3.669,1.292-3.923,1.55c-0.579,0.592-1.53,0.602-2.121,0.021s-0.601-1.53-0.021-2.121 c0.563-0.574,2.663-2.447,6.062-2.45c0.003,0,0.006,0,0.009,0c3.404,0,5.507,1.875,6.071,2.45c0.58,0.591,0.57,1.541-0.021,2.121 C32.258,33.857,31.879,34,31.5,34z"></path></g>
                      </svg>
                    </Box>
                      <Alert sx={{mt:3}} severity="info">No media found</Alert>
                  </Box>
                </Box>
            )}
              <Grid container spacing={2}>
                {mediaList.filter((media)=>media.mediaType == 'video').map((media) => (
                  <Grid item xs={12} sm={6} md={4} key={media._id}>
                    <MediaCard media={media} mediaType="video"/>
                  </Grid>
                ))}
              </Grid>
          </TabDetails>
        </Box>
      }

      <CommonModal open={openAddProduct} handleClose={() => setOpenAddProduct(false)} handleSubmit={handleSubmit} header="Upload Media" buttonTitle="Upload">
        <Grid container spacing={1}>
          <Grid item xs={12}>
           <TextField
              error={validError === "title"}
              helperText={validError === "title" ? "Title is required" : ""}
              fullWidth
              variant="outlined"
              label="Enter Media Title"
              onChange={(e) => {
                setNewMedia({ title: e.target.value });
                setValidError("");
              }}
            />
          </Grid>
          <Grid item xs={12 }>
              <MediaUploader selectedMedia={selectedMedia} setSelectedMedia ={setSelectedMedia } />
            {/* <input type="file" accept="image/*,video/*" onChange={handleFileChange} /> */}
          </Grid>
        </Grid>
      </CommonModal>
    </Box>
  );
}
