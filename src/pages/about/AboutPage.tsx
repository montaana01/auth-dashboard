import {
  Box,
  Chip,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

const principles: string[] = [
  'THE FIRST REQUIREMENT: YOU NEED TO CREATE A UNIQUE INDEX IN DATABASE. YOU STORAGE SHOULD GUARANTEE E-MAIL UNIQUENESS INDEPENDENTLY OF HOW MANY SOURCES PUSH DATA INTO IT SIMULTANEOUSLY.',
  'THE SECOND REQUIREMENT: YOUR TABLE SHOULD LOOK LIKE TABLE AND YOUR TOOLBAR SHOULD LOOK LIKE TOOLBAR.',
  'THE THIRD REQUIREMENT: DATA IN THE TABLE SHOULD BE SORTED (E.G., BY THE LAST LOGIN TIME).',
  'THE FOURTH REQUIREMENT: MULTIPLE SELECTION SHOULD BE IMPLEMENTED USING CHECKBOXES (SELECT ALL/DELECT ALL IS ALSO A CHECKBOX). The leftmost column contains checkboxes without labels.',
  'There must be a toolbar over the table with the following actions: Block (button with text), Unblock (icon), Delete (icon), Delete unverified (icon). NO BUTTONS IN EACH ROW. Toolbar shouldn’t appear/disappear, but may change enabled/disable status.',
  "BEFORE EACH REQUEST EXCEPT FOR REGISTRATION OR LOGIN, SERVER SHOULD CHECK IF USER EXISTS AND ISN'T BLOCKED (if user account is blocked or deleted, any next user’s request should redirect to the login page).",
  'Users are registered right away and the corresponding message is show after the registration. The confirmation e-mail should be sent asynchronously. Clicking the link in the e-mail changes the status from "unverified" to "active" ("blocked" stays "blocked"). Deleted users should be deleted, not "marked". Blocked user should not be able to login, deleted user can re-register.',
];

export const AboutPage = () => {
  return (
    <Box sx={{ py: { xs: 2, sm: 3 } }}>
      <Container >
        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack spacing={1}>
              <Typography variant="h4" component="h1">
                Task #4 - User Management - About
              </Typography>

              <Typography variant="body1" color="text.secondary">
                Create a working and deployed (remotely accessible) web application with user registration and authentication.
                Non-authenticated users should not have access to the user management (admin panel) - they have only access to
                login form or registration form. Only authenticated non-blocked users should have access the user management table
                with fields: (selection checkbox), name, e-mail, last login time (or the last activity time), status (unverified/active/blocked).
              </Typography>

              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ pt: 1 }}>
                <Chip size="small" label="React" />
                <Chip size="small" label="MUI" />
                <Chip size="small" label="Express" />
                <Chip size="small" label="SQL (PostgreSQL/MySQL)" />
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="h6" component="h2">
                Requirements
              </Typography>

              <List dense disablePadding>
                {principles.map((text) => (
                  <ListItem key={text} sx={{ px: 0, py: 0.25 }}>
                    <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary={text} />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 1.5 }} />

              <Typography variant="h6" component="h2">
                User statuses
              </Typography>

              <List dense disablePadding>
                <ListItem sx={{ px: 0, py: 0.25 }}>
                  <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary='unverified - "unverified" status before e-mail confirmation' />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.25 }}>
                  <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary='active - "active" status after clicking the confirmation link' />
                </ListItem>
                <ListItem sx={{ px: 0, py: 0.25 }}>
                  <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary='blocked - "blocked" user should not be able to login ("blocked" stays "blocked")' />
                </ListItem>
              </List>
            </Stack>
          </Paper>

          <Typography variant="caption" color="text.secondary">
            NO WALLPAPERS UNDER THE TABLE. NO ANIMATIONS. NO BROWSER ALERTS. DON&apos;T INVENT ANYTHING, USE LIBRARIES FOR EVERYTHING.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
