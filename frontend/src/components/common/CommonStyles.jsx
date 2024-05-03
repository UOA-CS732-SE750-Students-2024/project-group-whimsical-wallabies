export const CommonStyles = {
  loginHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2
  },
  loginHeaderImage: {
    width: 60,
    height: 60,
    mr: 1
  },
  loginHeaderText: {
    fontWeight: 'bold',
    color: '#333',
    mt: 2
  },
  loginFormContainer: {
    maxWidth: '600px',
    my: 10
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    minHeight: '55vh',
    mt: 1,
    p: 2,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
    width: '80%',
    maxWidth: '780px',
    mx: 'auto',
    my: 1
  },
  formHeader: {
    textAlign: 'center',
    p: 2
  },
  autoCompleteBox: {
    mb: 1,
    mt: 2
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    px: 2,
    mt: 2,
    mb: 3
  },
  actionButton: {
    flexGrow: 1,
    height: 56,
    mx: 1,
    borderRadius: '15px'
  },
  progressIndicator: {
    display: 'block',
    margin: '10px auto'
  },
  alert: {
    mt: 2,
    width: '100%'
  },
  dialogTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'primary.main',
    color: 'common.white',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    padding: 2
  },
  dialogContent: { pt: 2, pb: 3, px: 3, textAlign: 'center' },
  dialogContentText: { mt: 4, fontWeight: 'bold' },
  dialogAction: { flexDirection: 'column', p: 1 },
  dialogButton: {
    padding: '10px 20px',
    mb: 2,
    ':hover': {
      backgroundColor: 'primary.dark' // Darker color on hover
    }
  },
  homeContainerStyles: {
    backgroundColor: '#aad5dc',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden'
  },
  homeBoxStyles: {
    position: 'absolute',
    top: 100,
    left: 20,
    textAlign: 'center',
    zIndex: 2
  },
  homeTypographyStyles: {
    color: '#1a4c88',
    fontWeight: 'bold'
  },
  homeSubtitleStyles: {
    m: 1,
    color: '#1a4c88'
  },
  homeButtonStyles: {
    m: 2,
    backgroundColor: '#1a4c88'
  },
  matchDashboard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa'
  },
  matchSwipeContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '1000px',
    height: '80vh',
    overflow: 'hidden',
    marginTop: '50px'
  },
  matchCard: {
    width: '50%',
    height: '50%',
    borderRadius: '20px',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '250px',
    position: 'relative'
  },
  matchName: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 'bold',
    fontSize: '100px'
  },
  matchBreed: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    bottom: '25px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 'bold'
  },
  matchInfo: {
    color: 'white',
    textAlign: 'center',
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  matchLeftButton: {
    width: '80px',
    height: '40px',
    backgroundColor: '#aad5dc',
    color: 'white'
  },
  matchRightButton: {
    width: '80px',
    height: '40px',
    backgroundColor: '#aad5dc',
    color: 'white',
    marginLeft: '20px'
  }
};
