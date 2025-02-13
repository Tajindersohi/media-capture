import { Box, Typography } from "@mui/material";

export default function MediaCard({ media,  mediaType="image" }) {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
    {mediaType === "image" ? 

      <Box
        sx={{
          backgroundImage: `url(http://localhost:8000${media.mediaUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: { xs: "190px", sm: "133px", md: "125px", lg: "220px" },
          maxWidth: "100%",
          mx: "auto",
        }}
      />
      :
        <Box
            sx={{
                width: "100%",
                height: { xs: "190px", sm: "133px", md: "125px", lg: "220px" }, 
                maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
            }}
            >
            <video width="100%" controls>
                <source src={`http://localhost:8000${media.mediaUrl}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Box>
        }
      <Box my={2} px={2} textAlign={"left"}>
        <Typography color="#0c831f" variant="h5">
          <b>{media.title}</b>
        </Typography>
      </Box>
    </Box>
  );
}
