import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Button
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./CommunityAbout.css";

const CommunityAbout = () => {
  const { slug } = useParams();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const res = await fetch(
          `http://192.168.29.86:5001/api/communities/slug/${slug}`
        );
        if (!res.ok) throw new Error("Community not found");
        const data = await res.json();
        setCommunity(data.data.community);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [slug]);

  if (loading) return <p className="community-loading">Loading...</p>;
  if (error) return <p className="community-error">{error}</p>;

  return (
    <div className="community-wrapper">

      <div className="community-container">

  <Box sx={{ mb: 2 }}>
  <Button
    startIcon={<ArrowBackIcon />}
    variant="text"
    onClick={() => navigate(-1)}
    sx={{
      textTransform: "none",
      fontWeight: 500,
      pl: 0,
    }}
  >
    Back
  </Button>
</Box>

        {/* Header */}
        <div className="community-header">
          <img
            src={community.logo}
            alt="Community Logo"
            className="community-logo"
          />
          <div>
            <Typography variant="h4">{community.name}</Typography>
            <Chip label={community.category} size="small" />
          </div>
        </div>

        {/* About */}
        <Card className="community-card">
          <CardContent>
            <Typography variant="h6">About This Community</Typography>
            <Typography className="community-text">
              {community.description}
            </Typography>
          </CardContent>
        </Card>

        {/* Info */}
        <Grid container spacing={2} className="community-info">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Pricing</Typography>
                <Typography>
                  {community.pricing.type === "paid"
                    ? `${community.pricing.price} ${community.pricing.currency} / ${community.pricing.billingPeriod}`
                    : "Free"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Members</Typography>
                <Typography>{community.memberCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Features */}
        <Card className="community-card">
          <CardContent>
            <Typography variant="h6">Features</Typography>
            <Divider sx={{ my: 1 }} />
            <div className="feature-list">
              {Object.entries(community.features).map(
                ([key, value]) =>
                  value && (
                    <Chip
                      key={key}
                      label={key.replace("has", "")}
                      variant="outlined"
                    />
                  )
              )}
            </div>
          </CardContent>
        </Card>

        {/* Gallery */}
        {community.introImages?.length > 0 && (
          <>
            <Typography variant="h6" className="section-title">
              Gallery
            </Typography>
            <div className="gallery">
              {community.introImages.map((img) => (
                <img
                  key={img._id}
                  src={img.url}
                  alt={img.alt}
                  className="gallery-image"
                />
              ))}
            </div>
          </>
        )}

        {/* Video */}
        {community.introVideos?.length > 0 && (
          <>
            <Typography variant="h6" className="section-title">
              Introduction Video
            </Typography>
            <video
              src={community.introVideos[0].url}
              controls
              className="intro-video"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityAbout;
