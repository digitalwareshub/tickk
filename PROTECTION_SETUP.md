# 🛡️ Repository Protection Setup Guide

Follow these steps immediately after making your repository public to ensure maximum protection against code deletion or unauthorized changes.

## ⚡ Quick Setup (5 minutes)

### Step 1: GitHub Web Interface Setup

1. **Go to Repository Settings**
   ```
   https://github.com/digitalwareshub/opos-voice/settings
   ```

2. **Set Up Branch Protection Rules**
   - Navigate to: `Branches` → `Add Rule`
   - Branch name pattern: `main`
   - Check these boxes:
     - ✅ Require pull request reviews before merging
     - ✅ Require status checks to pass before merging
     - ✅ Require branches to be up to date before merging
     - ✅ Restrict pushes that create files over 100MB
     - ✅ Require linear history
     - ✅ Include administrators
   - Click "Create"

3. **Enable Security Features**
   - Go to `Security & analysis`
   - Enable:
     - ✅ Dependency graph
     - ✅ Dependabot alerts
     - ✅ Dependabot security updates
     - ✅ Secret scanning alerts

### Step 2: Add Collaborators/Maintainers

1. **Add Trusted Maintainers**
   ```
   Settings → Manage access → Invite a collaborator
   ```
   - Add at least 1-2 trusted developers
   - Give them "Maintain" or "Admin" permissions

2. **Set Up Team Access** (if using GitHub Organization)
   - Create a "Core Maintainers" team
   - Add team members with appropriate permissions

### Step 3: Configure Repository Settings

1. **General Settings**
   - ✅ Allow merge commits
   - ✅ Allow squash merging
   - ✅ Allow rebase merging
   - ✅ Automatically delete head branches

2. **Advanced Settings**
   - ✅ Restrict pushes that create files over 100 MB
   - ✅ Restrict editing and creation of workflows

## 🔄 Automated Protection (Already Set Up)

The following files have been created to protect your repository:

- ✅ `.github/workflows/backup.yml` - Daily automated backups
- ✅ `.github/CODEOWNERS` - Defines code ownership
- ✅ `SECURITY.md` - Security policy and vulnerability reporting
- ✅ `scripts/backup-repo.sh` - Manual backup script

## 🚨 Emergency Recovery Plan

If your repository is ever compromised:

### Immediate Actions:
1. **Revoke Access Tokens**
   - GitHub Settings → Developer settings → Personal access tokens
   - Revoke any suspicious tokens

2. **Change Repository Visibility**
   - Temporarily make repository private
   - Investigate the issue

3. **Restore from Backup**
   ```bash
   # From automated backup
   git clone repository-backup.bundle recovered-repo
   
   # From manual backup
   ./scripts/backup-repo.sh
   ```

4. **Force Push Protection**
   ```bash
   # Create new repository
   # Push clean version
   git remote set-url origin https://github.com/digitalwareshub/opos-voice-recovered.git
   git push -u origin main
   ```

## 📊 Monitoring & Alerts

### Set Up Notifications:
1. **GitHub Notifications**
   - Watch the repository for all activity
   - Enable email notifications for:
     - Push events
     - Pull requests
     - Issues
     - Security alerts

2. **Third-Party Monitoring**
   - Use GitHub Desktop for local monitoring
   - Set up RSS feeds for repository activity
   - Consider webhook notifications

## 🔐 Additional Security Measures

### For Maximum Protection:

1. **Enable Two-Factor Authentication**
   - Required for all maintainers
   - Use authenticator app (not SMS)

2. **Use Signed Commits**
   ```bash
   git config --global user.signingkey YOUR_GPG_KEY
   git config --global commit.gpgsign true
   ```

3. **Mirror Repository**
   - Create mirrors on GitLab, Bitbucket, or Codeberg
   - Set up automated sync between platforms

4. **Regular Security Audits**
   - Review access permissions monthly
   - Check for suspicious activity
   - Audit dependencies for vulnerabilities

## ✅ Verification Checklist

After setup, verify protection is active:

- [ ] Branch protection rules are enforced
- [ ] CODEOWNERS file is recognized
- [ ] Automated backups are running
- [ ] Security alerts are enabled
- [ ] Trusted maintainers have access
- [ ] Emergency contacts are documented
- [ ] Local backup script works
- [ ] All critical files are protected

## 🆘 Emergency Contacts

- **Primary Maintainer**: digitalwareshub
- **Security Issues**: security@digiwares.xyz
- **General Support**: write@digiwares.xyz

---

**Keep this guide secure and accessible offline!**
