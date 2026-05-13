const LANG_STORAGE_KEY = "succeedora.language";
const DOCUMENT_FORMAT_STORAGE_KEY = "succeedora.documentFormat";
const RESUMES_STORAGE_KEY = "succeedora.resumes";
const COVER_LETTERS_STORAGE_KEY = "succeedora.coverLetters";
const THEME_STORAGE_KEY = "succeedora.theme";
const AUTH_VERIFIED_STORAGE_KEY = "succeedora.authVerified";
const AUTH_EMAIL_STORAGE_KEY = "succeedora.authEmail";
const PROFILE_STORAGE_KEY = "succeedora.profile";
const ACCESS_STORAGE_KEY = "succeedora.access";
const ACCOUNTS_STORAGE_KEY = "succeedora.accounts";
const SESSION_STORAGE_KEY = "succeedora.session";
const PENDING_ROUTE_STORAGE_KEY = "succeedora.pendingRoute";
const LEGACY_MIGRATION_STORAGE_KEY = "succeedora.legacyMigration";
const PAYMENT_REQUESTS_STORAGE_KEY = "succeedora.paymentRequests";
const SITE_ORIGIN = "https://succeedora.com";
const paymentConfig = {
  // Confirm this CNPJ is registered as a Pix key at the bank before using this QR Code in production.
  // If it is not registered, generated Pix BR Codes must not be considered valid for production payments.
  pixKey: "60099692000107",
  pixKeyType: "CNPJ",
  merchantName: "Succeedora",
  merchantCity: "SERRA",
  currency: "BRL",
  pixManualConfirmation: true,
  stripeEnabled: false,
  pixEnabled: true,
};
const PIX_ONE_TIME_PRODUCTS = {
  remove_watermark: { amount: 790, names: { pt: "Remover marca d'água", en: "Remove watermark" }, descriptions: { pt: "PDF sem marca da Succeedora para um currículo.", en: "Watermark-free PDF for one resume." } },
  premium_pdf: { amount: 2900, names: { pt: "PDF premium", en: "Premium PDF" }, descriptions: { pt: "Exportação premium em PDF para um currículo.", en: "Premium PDF export for one resume." } },
  premium_template: { amount: 1900, names: { pt: "Modelo premium", en: "Premium template" }, descriptions: { pt: "Desbloqueio manual futuro de um modelo premium.", en: "Future manual unlock for one premium template." } },
  career_pack: { amount: 7900, names: { pt: "Pacote carreira", en: "Career pack" }, descriptions: { pt: "Pacote avulso de recursos de carreira.", en: "One-time career resource pack." } },
  ai_credits: { amount: 1900, names: { pt: "Créditos de IA", en: "AI credits" }, descriptions: { pt: "Pacote avulso de créditos de IA para liberação futura.", en: "One-time AI credits pack for future unlock." } },
  online_resume_link: { amount: 2400, names: { pt: "Link de currículo online", en: "Online resume link" }, descriptions: { pt: "Link público do currículo para liberação futura.", en: "Public resume link for future unlock." } },
};
const DISPOSABLE_EMAIL_DOMAINS = new Set(["mailinator.com", "10minutemail.com", "temp-mail.org", "guerrillamail.com", "yopmail.com", "throwawaymail.com", "getnada.com", "emailondeck.com", "fakeinbox.com", "trashmail.com"]);
const BRAZIL_TIMEZONES = new Set([
  "America/Sao_Paulo",
  "America/Manaus",
  "America/Belem",
  "America/Fortaleza",
  "America/Recife",
  "America/Bahia",
  "America/Cuiaba",
  "America/Campo_Grande",
  "America/Porto_Velho",
  "America/Boa_Vista",
  "America/Rio_Branco",
  "America/Noronha",
  "Brazil/East",
  "Brazil/West",
  "Brazil/Acre",
  "Brazil/DeNoronha",
]);

const iconPaths = {
  sparkles: "M12 3l1.8 5.1L19 10l-5.2 1.9L12 17l-1.8-5.1L5 10l5.2-1.9L12 3zm6 12l.9 2.6 2.6.9-2.6.9L18 23l-.9-2.6-2.6-.9 2.6-.9L18 15zM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14z",
  file: "M6 2h8l4 4v16H6V2zm7 1.5V7h3.5M9 12h6M9 16h6M9 20h4",
  pen: "M4 20l4.5-1 10-10a2.1 2.1 0 00-3-3l-10 10L4 20zm11-13l3 3",
  mail: "M3 6h18v12H3V6zm1 1l8 6 8-6M4 17l6-5M20 17l-6-5",
  shield: "M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-3 10l2 2 4-5",
  globe: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-20c2.5 2.7 3.8 6 3.8 10S14.5 19.3 12 22m0-20C9.5 4.7 8.2 8 8.2 12S9.5 19.3 12 22M2.5 12h19M4.5 7h15M4.5 17h15",
  target: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-4a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z",
  download: "M12 3v11m0 0l-4-4m4 4l4-4M5 19h14",
  link: "M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1",
  layout: "M3 4h18v16H3V4zm0 5h18M9 9v11",
  settings: "M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zm0-13v3m0 13v3M4.2 4.2l2.1 2.1m11.4 11.4l2.1 2.1M1 12h3m16 0h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7l1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2l-1.4-1.4M12 16a4 4 0 100-8 4 4 0 000 8z",
  moon: "M21 14.5A8.5 8.5 0 119.5 3a7 7 0 0011.5 11.5z",
  card: "M3 6h18v12H3V6zm0 4h18M7 15h4",
  arrow: "M5 12h14m-6-6l6 6-6 6",
  arrowLeft: "M19 12H5m6-6l-6 6 6 6",
  check: "M20 6L9 17l-5-5",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
};

const I18N = {
  en: {
    metaTitle: "Succeedora — Professional Resume Builder",
    metaDescription: "Create professional resumes, cover letters and organize your job applications with modern templates and smart tools.",
    nav: { features: "Features", templates: "Templates", pricing: "Pricing", faq: "FAQ", signIn: "Sign In", getStarted: "Get Started", openNavigation: "Open navigation", mainNavigation: "Main navigation", languageSelector: "Language selector" },
    public: {
      eyebrow: "Global AI resume platform",
      heroTitle: "Create a professional resume in minutes with AI.",
      heroSubtitle: "Build, improve, translate and tailor your resume for any job application.",
      primaryCta: "Create My Resume",
      secondaryCta: "View Templates",
      trust: ["ATS-friendly", "Multilingual ready", "PDF export"],
      heroValues: [
        ["file", "Professional resume in minutes", "Build a job-ready version quickly."],
        ["shield", "ATS-friendly", "Clean templates designed for recruiting systems."],
        ["download", "PDF ready to send", "Export a professional-looking resume."],
        ["sparkles", "AI writing improvements", "Get suggestions for summaries, experience and skills."],
      ],
      editorButton: "Improve with AI",
      aiSuggestion: "AI suggestion",
      aiSuggestionText: "Quantify impact and align experience with the target role.",
      aiMessages: ["Professional summary improved", "Keywords added", "Experience aligned to the job", "Better ATS compatibility", "Clearer and more professional wording"],
      resumeScore: "Resume score",
      resumeScoreStatus: "Optimized",
      resumeScoreDelta: "+12 points",
      resumeScoreNote: "Improved with AI",
      templateApplied: "Template applied: Modern",
      featuresEyebrow: "Features",
      featuresTitle: "Everything you need to build a stronger resume.",
      featuresSubtitle: "Use AI to create, improve, translate and tailor your resume for every job application.",
      featuresCtaTitle: "Ready to build a better resume?",
      trustSectionTitle: "Why users trust Succeedora",
      trustCards: [
        ["shield", "ATS-Friendly", "Templates designed for modern recruiting systems."],
        ["sparkles", "Better content with AI", "Improve your summary, experience and skills with stronger suggestions."],
        ["download", "Ready for PDF and sharing", "Download a professional PDF or share your resume online."],
        ["target", "Built for real job applications", "Create clearer, more professional resumes tailored to different roles."],
      ],
      testimonialsTitle: "User testimonials",
      testimonialsSubtitle: "Real stories from people using Succeedora to build better resumes, coming soon.",
      howEyebrow: "How it works",
      howTitle: "From blank page to recruiter-ready resume in three steps.",
      templatesEyebrow: "Templates",
      templatesTitle: "Professional templates for every career stage",
      templatesSubtitle: "Choose from clean, modern and job-ready resume designs.",
      templatesCtaTitle: "Choose a template and start building your resume now.",
      viewTemplate: "View template",
      pricingEyebrow: "Pricing",
      pricingTitle: "Start free, upgrade when you need more career power.",
      faqEyebrow: "FAQ",
      faqTitle: "Clear answers before you start.",
      footer: "Create a resume that helps you get hired.",
      features: [
        ["sparkles", "AI Resume Builder", "Build a professional resume with clear structure, stronger writing and a job-ready layout."],
        ["pen", "Resume Improvement", "Get suggestions to make your summary, experience and skills more compelling."],
        ["mail", "Cover Letters", "Generate personalized cover letters for different job applications in minutes."],
        ["shield", "ATS-Friendly Templates", "Use clean, professional templates designed for recruiting systems."],
        ["globe", "Resume Translation", "Translate your resume into other languages while keeping a professional tone."],
        ["target", "Resume for Every Job", "Tailor your resume to the job description and highlight important keywords."],
        ["download", "PDF Export", "Download your resume as a professional PDF that is ready to send."],
        ["link", "Online Resume Link", "Share a professional resume page with a public link."],
      ],
      steps: [
        ["Choose a template", "Start with a polished format designed for your career stage."],
        ["Add your information", "Add experience, education, skills, projects and languages with guided fields."],
        ["Improve with AI and export", "Use AI to refine your content, then save or download your resume."],
      ],
      templates: [
        ["Modern", "A polished modern resume style for confident applications."],
        ["Minimal", "A clean minimal resume style for focused recruiter review."],
        ["Executive", "A premium executive resume style for senior professionals."],
        ["Creative", "A refined creative resume style with professional restraint."],
        ["Student", "A smart student resume style for early career applications."],
        ["International", "A globally readable format for multilingual applications."],
      ],
      faq: [
        ["Can I create a resume for free?", "Yes. The free plan lets you create one resume with basic templates and branded PDF export."],
        ["Can I download my resume as PDF?", "Yes. Every plan includes PDF export, with unbranded premium export available on Pro and Premium."],
        ["Does Succeedora support multiple languages?", "The interface is prepared for multilingual support, with English and Brazilian Portuguese as priority languages."],
        ["Can AI improve my resume?", "Yes. AI suggestions can strengthen summaries, work experience bullets, keywords, and role-specific positioning."],
        ["Are the templates ATS-friendly?", "Succeedora templates are designed with readable structure, clean hierarchy, and ATS-conscious formatting."],
        ["Can I create a cover letter?", "Yes. The cover letter generator helps create tailored letters using your career profile and job context."],
      ],
    },
    pricing: {
      popular: "Most popular",
      perMonth: "/month",
      choose: "Choose",
      oneTime: "One-time payment",
      payOnce: "Pay once",
      noSubscription: "No subscription",
      bestForMost: "Best for most users",
      bestValue: "Best value",
      multipleApplications: "For multiple applications",
      purchaseCtas: ["Get PDF", "Select", "Unlock", "Continue"],
      creditCta: "Buy credits",
      watermark: {
        title: "Remove watermark",
        description: "Pay once to download this resume without Succeedora branding.",
        price: "$2",
        button: "Remove watermark",
        label: "One-time payment",
        items: ["For one resume only", "No subscription required", "Brand-free PDF export"],
      },
      pricingPageTitle: "Pricing that fits how you apply",
      monthlyTitle: "Monthly plans",
      monthlySubtitle: "Best for ongoing access, multiple resumes, cover letters and AI tools.",
      oneTimeTitle: "One-time options",
      oneTimeSubtitle: "Pay once for a premium resume download, Career Pack, template or online resume link.",
      creditsTitle: "AI Credits",
      creditsSubtitle: "Use AI tools without a subscription. Buy credits only when you need them.",
      creditsUsageTitle: "Use credits to",
      paymentFaqTitle: "Payment options FAQ",
      landingOneTimeTitle: "Need just one resume?",
      landingOneTimeText: "You can also choose a one-time premium download or a Career Pack.",
      viewAllOptions: "View all payment options",
      plans: [
        ["Free", "$0", ["1 basic resume", "Limited templates", "Basic editing", "PDF with Succeedora branding"]],
        ["Pro", "$12", ["Premium templates", "Multiple resumes", "PDF without branding", "AI resume improvement", "Cover letter generator", "Resume translation", "Online resume link"]],
        ["Premium", "$24", ["Everything in Pro", "Job-specific resume tailoring", "ATS analysis", "Advanced AI suggestions", "Priority support", "Advanced career tools"]],
      ],
      oneTimeOptions: [
        ["Remove watermark", "$2", "Pay once", ["Download this resume without Succeedora branding", "For one resume only", "No subscription required"]],
        ["Premium PDF Download", "$9", "Pay once", ["No Succeedora branding", "Professional PDF export", "7 days of editing", "For one resume"]],
        ["Career Pack", "$19", "No subscription", ["Professional resume", "Cover letter", "Resume translation", "Basic ATS analysis", "Job-specific suggestions", "For important applications"]],
        ["Premium Template", "$6", "Pay once", ["One premium template", "Export with premium design"]],
        ["Online Resume Link", "$8", "Pay once", ["Shareable resume page", "Public link", "Professional profile", "Contact button"]],
      ],
      creditPackages: [
        ["Starter Credits", "$5", "Small package", ["Good for quick improvements"]],
        ["Growth Credits", "$15", "Best value", ["Medium package for active job seekers"]],
        ["Power Credits", "$29", "Larger package", ["Best for multiple applications"]],
      ],
      creditUses: ["Improve resume summary", "Rewrite work experience", "Generate cover letter", "Translate resume", "Tailor resume for a job", "Analyze job description", "Suggest ATS keywords"],
      paymentFaq: [
        ["Can I use Succeedora for free?", "Yes. The Free plan lets users test the builder and create a basic resume."],
        ["Can I pay only once?", "Yes. One-time options are available for users who need a single premium download, Career Pack, template or online resume link."],
        ["Do I need a subscription to download my resume?", "No. You can use a subscription or choose a one-time Premium PDF Download."],
        ["What are AI credits?", "AI Credits let you use AI tools such as rewriting, translation, cover letters and job tailoring without a subscription."],
        ["Can I cancel my subscription anytime?", "Yes. Real billing logic is not integrated yet, but the intended model supports cancellation at any time."],
        ["Can I upgrade later?", "Yes. Users can start free, buy once, use credits or upgrade to Pro or Premium later."],
      ],
    },
    auth: {
      slogan: "Create a resume that helps you get hired.",
      support: "Use AI to build, improve and tailor your resume for global job opportunities.",
      signInEyebrow: "Welcome back",
      signUpEyebrow: "Start today",
      signInTitle: "Sign in to Succeedora",
      signUpTitle: "Create your account",
      signInSubtitle: "Access your resumes, cover letters and career tools.",
      signUpSubtitle: "Start creating professional resumes in minutes.",
      google: "Continue with Google",
      or: "or",
      email: "Email",
      emailPlaceholder: "you@example.com",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      fullName: "Name",
      fullNamePlaceholder: "Your name",
      signInButton: "Sign in",
      signUpButton: "Create account",
      signingIn: "Signing in...",
      creatingAccount: "Creating account...",
      confirming: "Confirming...",
      sendingCode: "Sending code...",
      updatingPassword: "Updating password...",
      newUser: "New to Succeedora?",
      existingUser: "Already have an account?",
      createAccount: "Create account",
      signInLink: "Sign in",
      firstName: "First name",
      lastName: "Last name",
      confirmPassword: "Confirm password",
      acceptLegal: "I agree to the Terms of Use and Privacy Policy.",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      forgotPassword: "Forgot password?",
      verifyTitle: "Confirm your email",
      verifySubtitle: "Enter the 6-digit code sent to your email.",
      verifyButton: "Confirm and continue",
      resendCode: "Resend code",
      resetTitle: "Reset password",
      resetVerifyTitle: "Verify code",
      resetSubtitle: "Enter your email to receive reset instructions.",
      sendCode: "Send instructions",
      resetPrepared: "Password reset flow is prepared. Configure email sending to activate it in production.",
      newPasswordTitle: "Create new password",
      verificationCode: "Verification code",
      newPassword: "New password",
      updatePassword: "Update password",
      codeHelp: "Codes expire after 10 minutes. Resend is available after 60 seconds.",
      errors: {
        legal: "You must accept the Terms of Use and Privacy Policy.",
        name: "Enter a valid first and last name.",
        email: "Enter a valid professional email address.",
        suspicious: "Use a personal or professional email address you control.",
        disposable: "Disposable email addresses are not allowed.",
        duplicate: "This email is already registered.",
        login: "Email or password is incorrect.",
        password: "Use at least 8 characters.",
        confirm: "Passwords must match.",
        code: "Enter a valid 6-digit code.",
        expired: "This code has expired. Please request a new code.",
        attempts: "Too many attempts. Please resend the code.",
      },
    },
    legal: {
      termsTitle: "Terms of Use",
      privacyTitle: "Privacy Policy",
      intro: "These terms describe how Succeedora may be used and how current and planned platform features are handled.",
      updated: "Last updated: May 13, 2026",
      contact: "Contact: contato@succeedora.com",
      terms: [
        ["Acceptance of terms", "By using Succeedora, you agree to use the platform responsibly and follow these terms."],
        ["Use of the platform", "Succeedora provides tools to create resumes, cover letters, translations and career documents."],
        ["User account", "You are responsible for keeping your login credentials secure and for activity in your account."],
        ["Resume content responsibility", "You are responsible for the accuracy, legality and truthfulness of resume and career information you provide."],
        ["Free and paid features", "Succeedora may offer free and paid features, including subscription plans, one-time purchases, AI credits, premium templates, watermark-free exports and advanced tools for resumes, cover letters and job application analysis."],
        ["Payments", "Succeedora may offer payments via Pix and credit card processed by Stripe or an equivalent provider. Pix will be available only for one-time purchases. Card payments may be used for one-time purchases, subscriptions and installment payments when available."],
        ["One-time payments", "One-time payments may unlock specific features, such as watermark removal, premium PDF, premium templates, AI credits, career packs or online resume links. Pix payments will be accepted only for one-time purchases."],
        ["Installment payments", "Installment payments, when available, will be offered only by card and may depend on payment provider rules, purchase amount, country and currency."],
        ["Subscriptions", "Paid plans, such as Pro and Premium, may work as recurring subscriptions paid by card via Stripe when activated. Pix will not be used for automatic recurring billing."],
        ["Cancellations and refunds", "When payments are active, cancellation and refund rules may vary depending on purchase type, payment method, applicable law and payment provider policies. Succeedora may provide specific conditions at the time of purchase."],
        ["Smart tools and AI", "Succeedora may offer smart tools to assist with creating, reviewing, translating, tailoring and analyzing resumes and letters. These tools are supportive and do not replace human review, professional advice or recruiter decisions."],
        ["Prohibited use", "Do not use Succeedora to create fraudulent, misleading, harmful or unlawful content."],
        ["Account termination", "Accounts may be limited or terminated for misuse, security risk or violation of future production terms."],
        ["Changes to terms", "These terms may be updated as the product, features and legal requirements evolve."],
        ["Contact", "Questions about these terms can be sent to contato@succeedora.com."],
      ],
      privacy: [
        ["Information collected", "Succeedora may collect account details, resume content and product usage information needed to provide the service."],
        ["How information is used", "Information is used to operate the platform, improve the experience and support user-requested features."],
        ["Account data", "Account data can include name, email, authentication status and preferences."],
        ["Resume data", "Resume data may include professional history, education, skills, languages and documents created by the user."],
        ["Cookies and analytics", "Cookies or analytics may be added later to understand usage and improve reliability."],
        ["Payment data", "When paid features are activated, payment data may be processed by external providers such as Stripe, Pix or other available methods. Succeedora should not store full card details inside the app. We may store purchase-related information such as purchased plan, payment status, amount, date, transaction identifier and unlocked feature for access control, support and history."],
        ["Pix payments", "For Pix payments, we may process information necessary to identify and confirm the payment, such as name, email, amount, date, submitted receipt, confirmation status and requested feature. Pix will be used only for one-time payments."],
        ["Stripe payments", "For card payments via Stripe, the payment provider may process data required for one-time purchases, subscriptions and installment payments. Succeedora should not store full card details inside the app."],
        ["Future use of AI tools", "When AI tools are activated, information provided by the user, such as resume, letter, job description and professional preferences, may be used to generate suggestions, improvements, translations and analyses. Succeedora should clearly explain how these features work when they become available."],
        ["Data protection", "Production systems should use appropriate safeguards for access control, storage and transmission."],
        ["User rights", "Users should be able to request access, correction or deletion of their information when backend systems are implemented."],
        ["Data retention", "Retention rules should be defined before launch based on product needs and legal requirements."],
        ["Contact", "Privacy questions can be sent to contato@succeedora.com."],
      ],
    },
    dashboard: {
      workspace: "Workspace",
      publicSite: "Public site",
      backToWebsite: "Back to website",
      signOut: "Sign out",
      myProfile: "My profile",
      billing: "Billing",
      closeSidebar: "Close sidebar",
      openSidebar: "Open sidebar",
      collapseSidebar: "Collapse menu",
      expandSidebar: "Expand menu",
      searchPlaceholder: "Search resumes, letters or templates...",
      theme: "Theme",
      openAiQuick: "Open AI Assistant",
      userMenu: "Amanda",
      proPlan: "Pro plan",
      unlock: "Unlock AI, premium templates and brand-free PDF.",
      upgrade: "Upgrade",
      nav: { dashboard: "Home", resumes: "My Resumes", builder: "Resume Builder", coverLetters: "Cover Letters", templates: "Templates", ai: "AI Assistant", settings: "Settings", billing: "Pricing" },
      home: {
        title: "Welcome to Succeedora",
        text: "Keep building more professional, job-ready resumes.",
        createResume: "Create new resume",
        improveAi: "Open AI",
        createLetter: "Create cover letter",
        mainResume: "Main resume",
        complete: "68% complete",
        completionText: "Complete the remaining sections to make your resume stronger.",
        missing: ["Add professional summary", "Include work experience", "Add skills", "Download PDF"],
        recent: "Recent resumes",
        resumeActions: ["Edit", "Preview", "Download"],
        resumes: [["Product Manager Resume", "Edited today", "68%", "Modern"], ["Marketing Resume", "Edited yesterday", "82%", "Minimal"], ["International Resume", "Edited 3 days ago", "54%", "Executive"]],
        nextSteps: "Recommended next steps",
        tasks: ["Improve your summary with AI", "Tailor your resume for a job", "Create a cover letter", "Translate your resume to English", "Download your resume as PDF"],
        aiTitle: "AI tools",
        aiText: "Use AI to improve content, generate letters, translate resumes and tailor your profile for jobs.",
        openAi: "Open AI",
        buyCredits: "Buy credits",
        upgradeTitle: "Unlock more features",
        upgradeText: "Use premium templates, export without branding, create multiple versions and improve your resume with AI.",
        viewPlans: "View plans",
        emptyTitle: "You haven’t created any resumes yet.",
        emptyText: "Start with a professional template and customize it in minutes.",
        emptyButton: "Create my first resume",
      },
      resumes: { intro: "Manage resume versions for different roles, markets and languages.", newResume: "New Resume", items: ["Product Manager Resume", "Software Resume", "Brazilian Portuguese Resume", "Executive Resume"], primary: "Primary resume", draft: "Draft version", open: "Open" },
      library: { createNew: "Create new resume", actions: ["Edit", "Preview", "Download"], lastEdited: "Last edited", completion: "complete", template: "Template" },
      templateFilters: ["All", "Free", "Pro", "Modern", "Minimal", "Executive", "Creative", "Student", "International", "Classic", "Corporate", "Tech", "Simple ATS", "Elegant", "First Job"],
      useTemplate: "Use template",
      previewTemplate: "Preview",
      useThisTemplate: "Use this template",
      close: "Close",
      bestFor: "Best for",
      free: "Free",
      pro: "Pro",
      premium: "Premium",
      access: {
        currentPlan: "Current plan: Free",
        oneTime: "One-time",
        aiCredits: "AI Credits",
        buyCredits: "Buy credits",
        removeWatermark: "Remove watermark",
        paymentHistory: "Payment history coming soon",
        unlockTitle: "Unlock this feature",
        unlockText: "This feature is available with Pro, Premium or a one-time purchase.",
        viewPlans: "View plans",
        buyOneTime: "Buy one-time option",
        continueFree: "Continue free",
        aiRequired: "You need AI credits to use this action.",
        downloadWatermarkTitle: "Download without watermark",
        downloadWatermarkText: "Your free plan includes Succeedora branding on the PDF. You can remove the watermark from this resume with a one-time payment and make the file more professional for final applications.",
        downloadFree: "Download free with watermark",
        removeWatermarkPrice: "Remove watermark — $2",
        watermarkOfferTitle: "Watermark-free PDF",
        watermarkRecommended: "Recommended",
        watermarkOneTime: "One-time payment for this resume",
        watermarkBenefits: ["Watermark-free PDF", "More professional appearance", "One-time payment", "Ideal for final applications"],
        placeholder: "Payments are coming soon. This option is prepared for future Pix or card via Stripe payment methods.",
        resumeLimitTitle: "Free plan limit",
        resumeLimitText: "Free users can create one resume. Upgrade to create multiple resumes.",
      },
      coverLetters: {
        intro: "Create role-specific cover letters using your resume profile.",
        new: "New Cover Letter",
        emptyTitle: "No cover letters yet",
        emptyText: "Create a tailored letter to support your resume and strengthen your application.",
        fields: ["Target role", "Company", "Recruiter name, optional", "Letter tone", "Job description", "Strengths", "Main experience"],
        tones: ["Professional", "Formal", "Direct", "Confident", "Enthusiastic"],
        actions: ["Generate letter", "Save letter", "Preview", "Download PDF"],
        previewTitle: "Cover letter preview",
        sampleGreeting: "Dear hiring team,",
        sampleBody: "I am excited to apply for the Product Manager role at NovaTech Solutions. My experience with digital products, user research and cross-functional teams has prepared me to help improve product outcomes and support business goals.",
        sampleClosing: "Thank you for your consideration. I would welcome the opportunity to discuss how my background can support your team.",
      },
    },
    builder: {
      pageTitle: "Resume Builder",
      back: "Back",
      backToTemplates: "Back to templates",
      improve: "Improve with AI",
      download: "Download PDF",
      generatingPdf: "Generating PDF...",
      pdfSuccess: "PDF downloaded successfully.",
      pdfError: "Could not generate the PDF. Please try again.",
      previewBeforeDownload: "Preview PDF",
      save: "Save",
      saved: "Saved",
      saving: "Saving...",
      unsaved: "Unsaved changes",
      brandFree: "Brand-free export is available on Pro.",
      selectedTemplate: "Selected template",
      documentFormat: "Document format",
      formatShort: "Format",
      a4: "A4",
      usLetter: "US Letter",
      fullPreview: "Full screen",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      fit: "Fit",
      continueEditing: "Continue editing",
      changeTemplate: "Change template",
      next: "Next",
      completion: "Your resume is 68% complete",
      missingTitle: "Missing sections",
      missing: ["Add a professional summary", "Include at least one work experience", "Add relevant skills"],
      emptyState: "Start by filling in your personal information. Your resume preview will be built automatically.",
      suggestionsTitle: "Suggestions to improve",
      suggestions: ["Your summary could be more specific.", "Add measurable results to your experience.", "Include job-related keywords.", "Avoid generic descriptions."],
      sectionNav: ["Personal details", "Professional summary", "Experience", "Education", "Skills", "Languages", "Certifications", "Projects", "Links", "Finish"],
      editTab: "Edit",
      previewTab: "Preview",
      required: "Required",
      optional: "Optional",
      livePreview: "Live preview",
      generateSummary: "Generate Summary",
      generateWithAi: "Generate with AI",
      improveDescription: "Improve description",
      suggestSkills: "Suggest skills",
      createCoverLetter: "Create cover letter",
      addExperience: "Add Experience",
      addItem: "Add",
      remove: "Remove",
      templateLabel: "Template:",
      templates: ["Modern", "Minimal", "Executive", "Creative", "Student", "International"],
      upgradeTemplates: "Unlock premium templates with Pro",
      sections: ["Personal Details", "Professional Summary", "Work Experience", "Education", "Skills", "Languages", "Certifications", "Projects", "Professional Links", "Finish"],
      labels: { firstName: "First name", lastName: "Last name", fullName: "Full name", title: "Professional title", address: "Address", city: "City", state: "State", postalCode: "Postal code", email: "Email", phone: "Phone", location: "Location", company: "Company", role: "Role", period: "Period", achievements: "Achievements", summary: "Summary", school: "School", degree: "Degree", skills: "Skills", languages: "Languages", certifications: "Certifications", projects: "Projects", links: "LinkedIn or portfolio", coverLetter: "Cover Letter" },
      helpers: { summary: "Keep it focused on your target role, strengths and measurable impact.", experience: "Use action verbs and include numbers when possible.", skills: "Prioritize skills that match the job description.", links: "Add professional links that support your application." },
      placeholders: { summary: "Write 3-4 lines about your career focus, strengths and impact.", achievements: "Describe what you did, how you did it and the result.", skills: "Product strategy, analytics, stakeholder management", links: "linkedin.com/in/amanda-silva" },
      values: { professionalTitle: "Product Manager", location: "Sao Paulo, Brazil", summary: "Product manager with experience launching data-driven SaaS products across global markets.", school: "University of Sao Paulo", skills: "Product strategy, analytics, stakeholder management, SQL, experimentation", languages: "English, Portuguese, Spanish", certifications: "Certified Scrum Product Owner", projects: "AI onboarding assistant, international pricing dashboard", achievement: "Led cross-functional roadmap planning and improved activation by 18%." },
      document: { header: "Sao Paulo, Brazil | amanda@example.com", summaryTitle: "Professional Summary", summaryText: "Product manager with experience launching data-driven SaaS products across global markets. Skilled in roadmap strategy, experimentation and stakeholder alignment.", experienceTitle: "Work Experience", role: "Product Manager, Northstar Technologies", experienceText: "Led cross-functional roadmap planning and improved activation by 18% through onboarding experiments and customer research.", educationTitle: "Education", educationText: "University of Sao Paulo, Business Administration", skillsTitle: "Skills" },
    },
    ai: {
      title: "Optimize your resume for a specific job",
      navTitle: "AI Assistant",
      text: "Paste the job description and get suggestions to improve your resume.",
      selectResume: "Select resume",
      noResume: "Create a resume before using the AI Assistant.",
      createResume: "Create resume",
      jobTitle: "Job title",
      company: "Company, optional",
      label: "Job description",
      placeholder: "Paste job description here...",
      button: "Analyze job",
      analyzing: "Analyzing resume...",
      start: "Paste a job description to get started.",
      noSuggestions: "No suggestions found yet.",
      selectResumeError: "Select a resume to analyze.",
      jobDescriptionError: "Paste a job description before analyzing.",
      score: "Estimated ATS score",
      scoreLabels: ["Needs work", "Good start", "Good", "Very good"],
      suggestionsTitle: "Improvement suggestions",
      foundKeywords: "Keywords found",
      missingKeywords: "Missing keywords",
      skillsMatch: "Skills match",
      experienceMatch: "Experience match",
      categories: { summary: "Professional summary", experience: "Experience", skills: "Skills", keywords: "Keywords", formatting: "Formatting", upgrade: "Advanced optimization" },
      actions: { apply: "Apply suggestion", copy: "Copy suggestion", edit: "Edit in resume", copied: "Suggestion copied", pro: "Available with Pro" },
      suggestions: {
        summaryTarget: "Your professional summary could mention the target role more clearly.",
        summaryWeak: "Strengthen your summary with your main strengths and career focus.",
        measurable: "Add measurable outcomes to your work experience.",
        skills: "Add relevant skills from the job description to your skills section.",
        keywords: "Use the missing keywords naturally in your summary, experience or skills.",
        formatting: "Keep section headings clear and use concise bullet points for ATS readability.",
        contact: "Add email, phone and location so recruiters can contact you easily.",
        advanced: "Unlock deeper keyword recommendations and job-specific tailoring.",
      },
    },
    settings: {
      profileTitle: "Profile Information",
      preferencesTitle: "Preferences",
      themeTitle: "Theme",
      languageTitle: "Language",
      securityTitle: "Security",
      accountTitle: "Account",
      accountText: "Manage password, login providers and account security. Backend functionality can be added later.",
      updatePassword: "Change password",
      languagePreference: "Language",
      themePreference: "Theme",
      saveChanges: "Save changes",
      cancel: "Cancel",
      unsaved: "Unsaved changes",
      saved: "Profile updated successfully.",
      saveError: "Profile could not be saved. Check browser storage and try again.",
      professionalTitle: "Professional title",
      emailVerified: "Email verified",
      activeAccount: "Active account",
      changePasswordHelp: "Password changes are prepared for backend integration.",
      legalTitle: "Legal",
      backToDashboard: "Back to dashboard",
      languageOptions: { pt: "Portuguese (Brazil)", en: "English" },
      themeOptions: { light: "Light", dark: "Dark", system: "System" },
    },
  },
  pt: {
    metaTitle: "Succeedora — Criador de Currículos Profissionais",
    metaDescription: "Crie currículos profissionais, cartas de apresentação e organize suas candidaturas com modelos modernos e ferramentas inteligentes.",
    nav: { features: "Recursos", templates: "Modelos", pricing: "Preços", faq: "Dúvidas", signIn: "Entrar", getStarted: "Começar", openNavigation: "Abrir navegação", mainNavigation: "Navegação principal", languageSelector: "Seletor de idioma" },
    public: {
      eyebrow: "PLATAFORMA GLOBAL DE CURRÍCULOS COM IA",
      heroTitle: "Crie um currículo profissional em minutos com IA.",
      heroSubtitle: "Crie, melhore, traduza e adapte seu currículo para cada candidatura.",
      primaryCta: "Criar meu currículo",
      secondaryCta: "Ver modelos",
      trust: ["Compatível com ATS", "Pronto para vários idiomas", "Exportação em PDF"],
      heroValues: [
        ["file", "Currículo profissional em minutos", "Monte uma versão pronta para candidatura rapidamente."],
        ["shield", "Compatível com ATS", "Modelos limpos pensados para sistemas de recrutamento."],
        ["download", "PDF pronto para enviar", "Exporte seu currículo com aparência profissional."],
        ["sparkles", "IA para melhorar textos", "Receba sugestões para resumo, experiências e habilidades."],
      ],
      editorButton: "Melhorar com IA",
      aiSuggestion: "Sugestão da IA",
      aiSuggestionText: "Destaque resultados concretos e alinhe sua experiência à vaga desejada.",
      aiMessages: ["Resumo profissional melhorado", "Palavras-chave adicionadas", "Experiência alinhada à vaga", "Melhor compatibilidade com ATS", "Texto mais claro e profissional"],
      resumeScore: "Nota do currículo",
      resumeScoreStatus: "Otimizado",
      resumeScoreDelta: "+12 pontos",
      resumeScoreNote: "Melhorado com IA",
      templateApplied: "Modelo aplicado: Moderno",
      featuresEyebrow: "Recursos",
      featuresTitle: "Tudo que você precisa para criar um currículo mais forte.",
      featuresSubtitle: "Use IA para montar, melhorar, traduzir e adaptar seu currículo para cada vaga.",
      featuresCtaTitle: "Pronto para criar um currículo melhor?",
      trustSectionTitle: "Por que confiar na Succeedora",
      trustCards: [
        ["shield", "Compatível com ATS", "Modelos pensados para sistemas de recrutamento modernos."],
        ["sparkles", "Conteúdo melhor com IA", "Melhore seu resumo, experiências e habilidades com sugestões mais fortes."],
        ["download", "Pronto para PDF e compartilhamento", "Baixe seu currículo com aparência profissional ou compartilhe online."],
        ["target", "Feito para candidaturas reais", "Crie currículos mais claros, profissionais e adaptados a diferentes vagas."],
      ],
      testimonialsTitle: "Depoimentos de usuários",
      testimonialsSubtitle: "Em breve, histórias reais de pessoas que usaram a Succeedora para criar currículos melhores.",
      howEyebrow: "Como funciona",
      howTitle: "Do zero ao currículo pronto para candidatura em três passos.",
      templatesEyebrow: "Modelos",
      templatesTitle: "Modelos profissionais para cada etapa da sua carreira",
      templatesSubtitle: "Escolha entre modelos limpos, modernos e compatíveis com candidaturas reais.",
      templatesCtaTitle: "Escolha um modelo e comece seu currículo agora.",
      viewTemplate: "Ver modelo",
      pricingEyebrow: "Preços",
      pricingTitle: "Comece grátis e evolua quando quiser aumentar suas chances de entrevista.",
      faqEyebrow: "Dúvidas",
      faqTitle: "Respostas claras antes de você começar.",
      footer: "Crie um currículo que aumenta suas chances de entrevista.",
      features: [
        ["sparkles", "Criador de Currículo com IA", "Monte um currículo profissional com estrutura clara, textos melhores e visual pronto para candidatura."],
        ["pen", "Melhoria de Currículo", "Receba sugestões para deixar seu resumo, experiências e habilidades mais fortes."],
        ["mail", "Cartas de Apresentação", "Gere cartas personalizadas para diferentes vagas em poucos minutos."],
        ["shield", "Modelos Compatíveis com ATS", "Use templates limpos e profissionais, pensados para sistemas de recrutamento."],
        ["globe", "Tradução de Currículo", "Traduza seu currículo para outros idiomas sem perder o tom profissional."],
        ["target", "Currículo para Cada Vaga", "Adapte seu currículo conforme a descrição da vaga e destaque palavras-chave importantes."],
        ["download", "Exportação em PDF", "Baixe seu currículo em PDF com aparência profissional e pronto para enviar."],
        ["link", "Link Online do Currículo", "Compartilhe uma página profissional do seu currículo com link público."],
      ],
      steps: [["Escolha um modelo", "Comece com um formato profissional adequado ao seu momento de carreira."], ["Adicione suas informações", "Inclua experiência, formação, habilidades, idiomas, projetos e certificações."], ["Melhore com IA e exporte", "Use IA para melhorar currículo, revise o conteúdo e baixe em PDF."]],
      templates: [["Moderno", "Um modelo de currículo moderno para candidaturas profissionais."], ["Minimalista", "Um modelo limpo para facilitar a leitura de recrutadores."], ["Executivo", "Um modelo premium para profissionais sêniores e liderança."], ["Criativo", "Um visual mais autoral, mantendo sofisticação e credibilidade."], ["Estudante", "Um modelo inteligente para estágio, trainee e início de carreira."], ["Internacional", "Um formato global, ideal para currículos em mais de um idioma."]],
      faq: [["Posso criar um currículo grátis?", "Sim. O plano gratuito permite criar um currículo com modelos básicos e exportação em PDF com marca da Succeedora."], ["Posso baixar meu currículo em PDF?", "Sim. Todos os planos incluem currículo em PDF. Nos planos Pro e Premium, o PDF sai sem a marca da Succeedora."], ["A Succeedora funciona em vários idiomas?", "Sim. A plataforma foi preparada para suporte multilíngue, com prioridade para português do Brasil e inglês."], ["A IA pode melhorar meu currículo?", "Sim. A IA ajuda a melhorar resumo profissional, experiências, palavras-chave e adaptação para cada vaga."], ["Os modelos são compatíveis com ATS?", "Sim. Os modelos seguem uma estrutura limpa, com hierarquia clara e foco em leitura por sistemas de triagem."], ["Posso criar carta de apresentação?", "Sim. Você pode gerar carta de apresentação personalizada usando seu perfil e a descrição da vaga."]],
    },
    pricing: {
      popular: "Mais escolhido",
      perMonth: "/mês",
      choose: "Escolher",
      oneTime: "Pagamento único",
      payOnce: "Pague uma vez",
      noSubscription: "Sem assinatura",
      bestForMost: "Melhor para a maioria",
      bestValue: "Melhor custo-benefício",
      multipleApplications: "Para várias candidaturas",
      purchaseCtas: ["Baixar PDF", "Selecionar", "Desbloquear", "Continuar"],
      creditCta: "Comprar créditos",
      watermark: {
        title: "Remover marca d'água",
        description: "Pague uma vez para baixar este currículo sem a marca da Succeedora.",
        price: "R$ 7,90",
        button: "Remover marca",
        label: "Pagamento único",
        items: ["Para um currículo apenas", "Sem assinatura", "PDF sem marca da Succeedora"],
      },
      pricingPageTitle: "Preços para cada tipo de candidatura",
      monthlyTitle: "Planos mensais",
      monthlySubtitle: "Melhor para acesso contínuo, vários currículos, cartas de apresentação e ferramentas de IA.",
      oneTimeTitle: "Opções avulsas",
      oneTimeSubtitle: "Pague uma vez por download premium, Career Pack, modelo ou link online do currículo.",
      creditsTitle: "Créditos de IA",
      creditsSubtitle: "Use ferramentas de IA sem assinatura. Compre créditos apenas quando precisar.",
      creditsUsageTitle: "Use créditos para",
      paymentFaqTitle: "Dúvidas sobre formas de pagamento",
      landingOneTimeTitle: "Precisa de apenas um currículo?",
      landingOneTimeText: "Você também pode escolher um download premium avulso ou um Career Pack.",
      viewAllOptions: "Ver todas as opções de pagamento",
      plans: [["Grátis", "R$0", ["1 currículo básico", "Modelos limitados", "Edição básica", "PDF com marca da Succeedora"]], ["Pro", "R$59", ["Vários currículos", "Modelos premium", "PDF sem marca", "Melhorar currículo com IA", "Gerador de carta de apresentação", "Tradução de currículo", "Link online do currículo"]], ["Premium", "R$99", ["Tudo do Pro", "Adaptação do currículo para cada vaga", "Análise ATS", "Sugestões avançadas de IA", "Suporte prioritário", "Ferramentas avançadas de carreira"]]],
      oneTimeOptions: [["Remover marca d'água", "R$ 7,90", "Pague uma vez", ["Baixe este currículo sem a marca da Succeedora", "Para um currículo apenas", "Sem assinatura"]], ["Download PDF Premium", "R$29", "Pague uma vez", ["Sem marca da Succeedora", "Exportação em PDF profissional", "7 dias para editar", "Para um currículo"]], ["Career Pack", "R$79", "Sem assinatura", ["Currículo profissional", "Carta de apresentação", "Tradução de currículo", "Análise ATS básica", "Sugestões para a vaga", "Para candidaturas importantes"]], ["Modelo Premium", "R$19", "Pague uma vez", ["Um modelo premium", "Exportação com design premium"]], ["Link Online do Currículo", "R$24", "Pague uma vez", ["Página online compartilhável", "Link público", "Perfil profissional", "Botão de contato"]]],
      creditPackages: [["Créditos Starter", "R$19", "Pacote pequeno", ["Bom para melhorias rápidas"]], ["Créditos Growth", "R$49", "Melhor custo-benefício", ["Pacote médio para quem está se candidatando ativamente"]], ["Créditos Power", "R$99", "Pacote maior", ["Ideal para várias candidaturas"]]],
      creditUses: ["Melhorar resumo profissional", "Reescrever experiência profissional", "Gerar carta de apresentação", "Traduzir currículo", "Adaptar currículo para uma vaga", "Analisar descrição da vaga", "Sugerir palavras-chave ATS"],
      paymentFaq: [["Posso usar a Succeedora grátis?", "Sim. O plano Grátis permite testar o criador e fazer um currículo básico."], ["Posso pagar apenas uma vez?", "Sim. As opções avulsas servem para quem precisa de um download premium, Career Pack, modelo ou link online sem assinatura."], ["Preciso de assinatura para baixar meu currículo?", "Não. Você pode usar um plano mensal ou escolher o Download PDF Premium avulso."], ["O que são créditos de IA?", "Créditos de IA permitem usar recursos como reescrita, tradução, carta de apresentação e adaptação para vaga sem assinatura."], ["Posso cancelar minha assinatura quando quiser?", "Sim. A lógica real de cobrança ainda não foi integrada, mas o modelo previsto permite cancelamento a qualquer momento."], ["Posso fazer upgrade depois?", "Sim. Você pode começar grátis, comprar uma opção avulsa, usar créditos ou migrar para Pro ou Premium depois."]],
    },
    auth: {
      slogan: "Crie um currículo que aumenta suas chances de entrevista.",
      support: "Use IA para fazer currículo, melhorar seu perfil e adaptar sua candidatura para vagas no Brasil e no exterior.",
      signInEyebrow: "Bem-vindo de volta",
      signUpEyebrow: "Comece hoje",
      signInTitle: "Entrar na Succeedora",
      signUpTitle: "Criar sua conta",
      signInSubtitle: "Acesse sua conta para continuar criando currículos profissionais.",
      signUpSubtitle: "Crie seu espaço e comece hoje a montar currículos profissionais.",
      google: "Continuar com Google",
      or: "ou",
      email: "E-mail",
      emailPlaceholder: "voce@exemplo.com",
      password: "Senha",
      passwordPlaceholder: "Digite sua senha",
      fullName: "Nome completo",
      fullNamePlaceholder: "Seu nome",
      signInButton: "Entrar",
      signUpButton: "Criar conta",
      signingIn: "Entrando...",
      creatingAccount: "Criando conta...",
      confirming: "Confirmando...",
      sendingCode: "Enviando código...",
      updatingPassword: "Atualizando senha...",
      newUser: "Novo na Succeedora?",
      existingUser: "Já tem conta?",
      createAccount: "Criar uma conta",
      signInLink: "Entrar",
      firstName: "Nome",
      lastName: "Sobrenome",
      confirmPassword: "Confirmar senha",
      acceptLegal: "Li e aceito os Termos de Uso e a Política de Privacidade.",
      terms: "Termos de Uso",
      privacy: "Política de Privacidade",
      forgotPassword: "Esqueci minha senha",
      verifyTitle: "Confirme seu e-mail",
      verifySubtitle: "Digite o código de 6 dígitos enviado para seu e-mail.",
      verifyButton: "Confirmar e continuar",
      resendCode: "Reenviar código",
      resetTitle: "Recuperar senha",
      resetVerifyTitle: "Verificar código",
      resetSubtitle: "Digite seu e-mail e enviaremos um código para redefinir sua senha.",
      sendCode: "Enviar código",
      newPasswordTitle: "Criar nova senha",
      verificationCode: "Código de verificação",
      newPassword: "Nova senha",
      updatePassword: "Atualizar senha",
      codeHelp: "Os códigos expiram em 10 minutos. O reenvio fica disponível após 60 segundos.",
      errors: {
        legal: "Você precisa aceitar os Termos de Uso e a Política de Privacidade.",
        name: "Informe nome e sobrenome válidos.",
        email: "Informe um e-mail profissional válido.",
        suspicious: "Use um e-mail pessoal ou profissional que você controla.",
        disposable: "E-mails temporários não são permitidos.",
        duplicate: "Este e-mail já está cadastrado neste protótipo.",
        password: "Use pelo menos 8 caracteres com maiúscula, minúscula, número e caractere especial.",
        confirm: "As senhas precisam ser iguais.",
        code: "Digite um código válido com 6 dígitos.",
        expired: "Este código expirou. Solicite um novo código.",
        attempts: "Muitas tentativas. Reenvie o código.",
      },
    },
    legal: {
      termsTitle: "Termos de Uso",
      privacyTitle: "Política de Privacidade",
      intro: "Estes termos descrevem como a Succeedora pode ser utilizada e como os recursos atuais e planejados da plataforma são tratados.",
      updated: "Última atualização: 13 de maio de 2026",
      contact: "Contato: contato@succeedora.com",
      terms: [
        ["Aceitação dos termos", "Ao usar a Succeedora, você concorda em utilizar a plataforma com responsabilidade e seguir estes termos."],
        ["Uso da plataforma", "A Succeedora oferece ferramentas para criar currículos, cartas de apresentação, traduções e documentos de carreira."],
        ["Conta do usuário", "Você é responsável por manter suas credenciais seguras e pelas atividades realizadas em sua conta."],
        ["Responsabilidade pelo conteúdo", "Você é responsável pela precisão, legalidade e veracidade das informações profissionais fornecidas."],
        ["Recursos gratuitos e pagos", "A Succeedora pode oferecer recursos gratuitos e pagos, incluindo planos de assinatura, compras avulsas, créditos de IA, modelos premium, exportação sem marca d’água e ferramentas avançadas de currículo, cartas de apresentação e análise de candidatura."],
        ["Pagamentos", "A Succeedora poderá oferecer pagamentos via Pix e cartão de crédito processado por Stripe ou provedor equivalente. Pix será disponibilizado apenas para compras avulsas e pagamentos únicos. Pagamentos com cartão poderão ser usados para compras únicas, assinaturas e pagamentos parcelados, quando disponíveis."],
        ["Pagamentos únicos", "Pagamentos únicos podem liberar recursos específicos, como remoção de marca d'água, PDF premium, modelos premium, créditos de IA, pacotes de carreira ou link de currículo online. Pix será aceito apenas para compras avulsas e pagamentos únicos."],
        ["Pagamentos parcelados", "Pagamentos parcelados, quando disponíveis, serão oferecidos apenas por cartão e poderão depender das regras do provedor de pagamento, valor da compra, país e moeda."],
        ["Assinaturas", "Planos pagos, como Pro e Premium, poderão funcionar como assinaturas recorrentes pagas por cartão via Stripe quando forem ativados. Pix não será usado para cobrança recorrente automática."],
        ["Cancelamentos e reembolsos", "Quando os pagamentos estiverem ativos, regras de cancelamento e reembolso poderão variar conforme o tipo de compra, forma de pagamento, legislação aplicável e políticas dos provedores de pagamento. A Succeedora poderá informar condições específicas no momento da compra."],
        ["Ferramentas inteligentes e IA", "A Succeedora pode oferecer ferramentas inteligentes para auxiliar na criação, revisão, tradução, adaptação e análise de currículos e cartas. Essas ferramentas servem como apoio e não substituem revisão humana, aconselhamento profissional ou decisão de recrutadores."],
        ["Uso proibido", "Não use a Succeedora para criar conteúdo fraudulento, enganoso, prejudicial ou ilegal."],
        ["Encerramento de conta", "Contas podem ser limitadas ou encerradas por mau uso, risco de segurança ou violação de termos futuros."],
        ["Alterações nos termos", "Estes termos podem ser atualizados conforme o produto, os recursos e as exigências legais evoluírem."],
        ["Contato", "Dúvidas sobre estes termos podem ser enviadas para contato@succeedora.com."],
      ],
      privacy: [
        ["Informações coletadas", "A Succeedora pode coletar dados de conta, conteúdo de currículo e informações de uso necessárias para prestar o serviço."],
        ["Como as informações são usadas", "As informações são usadas para operar a plataforma, melhorar a experiência e oferecer recursos solicitados pelo usuário."],
        ["Dados da conta", "Dados da conta podem incluir nome, e-mail, status de autenticação e preferências."],
        ["Dados do currículo", "Dados do currículo podem incluir histórico profissional, formação, habilidades, idiomas e documentos criados pelo usuário."],
        ["Cookies e analytics", "Cookies ou analytics podem ser adicionados futuramente para entender o uso e melhorar a confiabilidade."],
        ["Dados de pagamento", "Quando recursos pagos forem ativados, dados de pagamento poderão ser processados por provedores externos, como Stripe, Pix ou outros meios disponíveis. A Succeedora não deve armazenar dados completos de cartão no próprio aplicativo. Podemos armazenar informações relacionadas à compra, como plano adquirido, status do pagamento, valor, data, identificador da transação e recurso liberado, para controle de acesso, suporte e histórico."],
        ["Pagamentos via Pix", "Para pagamentos via Pix, poderemos tratar informações necessárias para identificação e confirmação do pagamento, como nome, e-mail, valor, data, comprovante enviado, status de confirmação e recurso solicitado. Pix será usado apenas para pagamentos únicos."],
        ["Pagamentos via Stripe", "Para pagamentos com cartão via Stripe, o provedor de pagamento poderá processar dados necessários para compras únicas, assinaturas e pagamentos parcelados. A Succeedora não deve armazenar dados completos de cartão no próprio aplicativo."],
        ["Uso futuro de ferramentas de IA", "Quando ferramentas de IA forem ativadas, informações fornecidas pelo usuário, como currículo, carta, descrição de vaga e preferências profissionais, poderão ser usadas para gerar sugestões, melhorias, traduções e análises. A Succeedora deve informar de forma clara como esses recursos funcionam quando forem disponibilizados."],
        ["Proteção de dados", "Sistemas em produção devem usar proteções adequadas de acesso, armazenamento e transmissão."],
        ["Direitos do usuário", "Usuários devem poder solicitar acesso, correção ou exclusão de informações quando o backend for implementado."],
        ["Retenção de dados", "Regras de retenção devem ser definidas antes do lançamento com base nas necessidades do produto e exigências legais."],
        ["Contato", "Dúvidas sobre privacidade podem ser enviadas para contato@succeedora.com."],
      ],
    },
    dashboard: {
      workspace: "Área de trabalho",
      publicSite: "Site público",
      backToWebsite: "Voltar ao site",
      signOut: "Sair",
      myProfile: "Meu perfil",
      billing: "Faturamento",
      closeSidebar: "Fechar menu",
      openSidebar: "Abrir menu",
      collapseSidebar: "Recolher menu",
      expandSidebar: "Expandir menu",
      searchPlaceholder: "Buscar currículos, cartas ou modelos...",
      theme: "Tema",
      openAiQuick: "Abrir Assistente IA",
      userMenu: "Amanda",
      proPlan: "Plano Pro",
      unlock: "Desbloqueie IA, modelos premium e PDF sem marca.",
      upgrade: "Fazer upgrade",
      nav: { dashboard: "Início", resumes: "Meus Currículos", builder: "Criar Currículo", coverLetters: "Cartas de Apresentação", templates: "Modelos", ai: "Assistente IA", settings: "Configurações", billing: "Preços" },
      home: {
        title: "Bem-vindo à Succeedora",
        text: "Continue criando currículos mais profissionais e prontos para candidatura.",
        createResume: "Criar novo currículo",
        improveAi: "Abrir IA",
        createLetter: "Criar carta de apresentação",
        mainResume: "Currículo principal",
        complete: "68% completo",
        completionText: "Complete as seções restantes para deixar seu currículo mais forte.",
        missing: ["Adicionar resumo profissional", "Incluir experiência", "Adicionar habilidades", "Baixar PDF"],
        recent: "Currículos recentes",
        resumeActions: ["Editar", "Visualizar", "Baixar"],
        resumes: [["Currículo de Product Manager", "Editado hoje", "68%", "Moderno"], ["Currículo de Marketing", "Editado ontem", "82%", "Minimalista"], ["Currículo internacional", "Editado há 3 dias", "54%", "Executivo"]],
        nextSteps: "Próximos passos recomendados",
        tasks: ["Melhore seu resumo com IA", "Adapte seu currículo para uma vaga", "Crie uma carta de apresentação", "Traduza seu currículo para inglês", "Baixe seu currículo em PDF"],
        aiTitle: "Ferramentas de IA",
        aiText: "Use IA para melhorar textos, gerar cartas, traduzir currículos e adaptar seu perfil para vagas.",
        openAi: "Abrir IA",
        buyCredits: "Comprar créditos",
        upgradeTitle: "Desbloqueie mais recursos",
        upgradeText: "Use modelos premium, exporte sem marca, crie várias versões e melhore seu currículo com IA.",
        viewPlans: "Ver planos",
        emptyTitle: "Você ainda não criou nenhum currículo.",
        emptyText: "Comece com um modelo profissional e personalize em poucos minutos.",
        emptyButton: "Criar meu primeiro currículo",
      },
      resumes: { intro: "Gerencie versões do currículo para diferentes vagas, mercados e idiomas.", newResume: "Novo currículo", items: ["Currículo de Product Manager", "Currículo de tecnologia", "Currículo em inglês", "Currículo executivo"], primary: "Currículo principal", draft: "Versão em rascunho", open: "Abrir" },
      library: { createNew: "Criar novo currículo", actions: ["Editar", "Visualizar", "Baixar"], lastEdited: "Última edição", completion: "completo", template: "Modelo" },
      templateFilters: ["Todos", "Gratuitos", "Pro", "Moderno", "Minimalista", "Executivo", "Criativo", "Estudante", "Internacional", "Clássico", "Corporativo", "Tech", "ATS simples", "Elegante", "Primeiro emprego"],
      useTemplate: "Usar modelo",
      previewTemplate: "Visualizar",
      useThisTemplate: "Usar este modelo",
      close: "Fechar",
      bestFor: "Melhor para",
      free: "Gratuito",
      pro: "Pro",
      premium: "Premium",
      access: {
        currentPlan: "Plano atual: Gratuito",
        oneTime: "Compra única",
        aiCredits: "Créditos de IA",
        buyCredits: "Comprar créditos",
        removeWatermark: "Remover marca d'água",
        paymentHistory: "Histórico de pagamentos em breve",
        unlockTitle: "Desbloqueie este recurso",
        unlockText: "Este recurso está disponível no Pro, Premium ou como compra avulsa.",
        viewPlans: "Ver planos",
        buyOneTime: "Comprar opção avulsa",
        continueFree: "Continuar grátis",
        aiRequired: "Você precisa de créditos de IA para usar esta ação.",
        downloadWatermarkTitle: "Baixar sem marca d'água",
        downloadWatermarkText: "Seu plano gratuito inclui a marca da Succeedora no PDF. Você pode remover a marca d'água deste currículo com um pagamento único e deixar o arquivo mais profissional para envio.",
        downloadFree: "Baixar grátis com marca",
        removeWatermarkPrice: "Remover marca — R$ 7,90",
        watermarkOfferTitle: "PDF sem marca d'água",
        watermarkRecommended: "Recomendado",
        watermarkOneTime: "Pagamento único para este currículo",
        watermarkBenefits: ["PDF sem marca d'água", "Visual mais profissional", "Pagamento único", "Ideal para envio final"],
        placeholder: "Pagamentos em breve. Esta opção está preparada para futuras formas de pagamento via Pix ou cartão via Stripe.",
        resumeLimitTitle: "Limite do plano gratuito",
        resumeLimitText: "Usuários gratuitos podem criar um currículo. Faça upgrade para criar vários currículos.",
      },
      coverLetters: {
        intro: "Crie cartas de apresentação específicas para cada vaga usando seu perfil profissional.",
        new: "Criar nova carta",
        emptyTitle: "Nenhuma carta de apresentação ainda",
        emptyText: "Crie uma carta personalizada para acompanhar seu currículo e fortalecer sua candidatura.",
        fields: ["Cargo desejado", "Empresa", "Nome do recrutador, opcional", "Tom da carta", "Descrição da vaga", "Pontos fortes", "Experiência principal"],
        tones: ["Profissional", "Formal", "Direto", "Confiante", "Entusiasmado"],
        actions: ["Gerar carta", "Salvar carta", "Visualizar", "Baixar PDF"],
        previewTitle: "Prévia da carta",
        sampleGreeting: "Olá, equipe de recrutamento,",
        sampleBody: "Tenho interesse na vaga de Product Manager na NovaTech Solutions. Minha experiência com produtos digitais, pesquisa com usuários e times multifuncionais me preparou para melhorar resultados de produto e apoiar objetivos de negócio.",
        sampleClosing: "Agradeço pela consideração e ficarei feliz em conversar sobre como minha experiência pode contribuir com a equipe.",
      },
    },
    builder: {
      pageTitle: "Criador de currículo",
      back: "Voltar",
      backToTemplates: "Voltar aos modelos",
      improve: "Melhorar com IA",
      download: "Baixar PDF",
      generatingPdf: "Gerando PDF...",
      pdfSuccess: "PDF baixado com sucesso.",
      pdfError: "Não foi possível gerar o PDF. Tente novamente.",
      previewBeforeDownload: "Visualizar PDF",
      save: "Salvar",
      saved: "Salvo",
      saving: "Salvando...",
      unsaved: "Alterações não salvas",
      brandFree: "Exportar sem marca está disponível no Pro.",
      selectedTemplate: "Modelo selecionado",
      documentFormat: "Formato do documento",
      formatShort: "Formato",
      a4: "A4",
      usLetter: "Carta dos EUA",
      fullPreview: "Tela cheia",
      zoomIn: "Aumentar",
      zoomOut: "Diminuir",
      fit: "Ajustar",
      continueEditing: "Continuar editando",
      changeTemplate: "Trocar modelo",
      next: "Próximo",
      completion: "Seu currículo está 68% completo",
      missingTitle: "Seções pendentes",
      missing: ["Adicione um resumo profissional", "Inclua pelo menos uma experiência", "Adicione habilidades relevantes"],
      emptyState: "Comece preenchendo suas informações pessoais. Seu currículo será montado automaticamente na prévia.",
      suggestionsTitle: "Sugestões para melhorar",
      suggestions: ["Seu resumo pode ficar mais específico.", "Adicione resultados concretos nas experiências.", "Inclua palavras-chave da vaga.", "Evite descrições muito genéricas."],
      sectionNav: ["Dados pessoais", "Resumo profissional", "Experiência", "Formação", "Habilidades", "Idiomas", "Certificações", "Projetos", "Links", "Finalizar"],
      editTab: "Editar",
      previewTab: "Prévia",
      required: "Obrigatório",
      optional: "Opcional",
      livePreview: "Prévia ao vivo",
      generateSummary: "Gerar resumo",
      generateWithAi: "Gerar resumo com IA",
      improveDescription: "Melhorar descrição",
      suggestSkills: "Sugerir habilidades",
      createCoverLetter: "Criar carta",
      addExperience: "Adicionar experiência",
      addItem: "Adicionar",
      remove: "Remover",
      templateLabel: "Modelo:",
      templates: ["Modern", "Minimal", "Executive", "Creative", "Student", "International"],
      upgradeTemplates: "Desbloqueie modelos premium no Pro",
      sections: ["Dados pessoais", "Resumo profissional", "Experiência profissional", "Formação acadêmica", "Habilidades", "Idiomas", "Certificações", "Projetos", "Links profissionais", "Finalizar"],
      labels: { firstName: "Nome", lastName: "Sobrenome", fullName: "Nome completo", title: "Título profissional", address: "Endereço", city: "Cidade", state: "Estado", postalCode: "CEP", email: "E-mail", phone: "Telefone", location: "Localização", company: "Empresa", role: "Cargo", period: "Período", achievements: "Conquistas", summary: "Resumo", school: "Instituição", degree: "Curso", skills: "Habilidades", languages: "Idiomas", certifications: "Certificações", projects: "Projetos", links: "LinkedIn ou portfólio", coverLetter: "Carta de apresentação" },
      helpers: { summary: "Mantenha o texto focado na vaga desejada, nos seus pontos fortes e nos resultados.", experience: "Use verbos de ação e inclua números sempre que possível.", skills: "Priorize habilidades relacionadas à descrição da vaga.", links: "Inclua links profissionais que fortaleçam sua candidatura." },
      placeholders: { summary: "Escreva 3-4 linhas sobre seu foco profissional, pontos fortes e impacto.", achievements: "Descreva o que você fez, como fez e qual foi o resultado.", skills: "Estratégia de produto, análise de dados, gestão de stakeholders", links: "linkedin.com/in/amanda-silva" },
      values: { professionalTitle: "Product Manager", location: "São Paulo, Brasil", summary: "Product manager com experiência no lançamento de produtos SaaS orientados por dados em mercados globais.", school: "Universidade de São Paulo", skills: "Estratégia de produto, análise de dados, gestão de stakeholders, SQL, experimentação", languages: "Português, inglês, espanhol", certifications: "Certified Scrum Product Owner", projects: "Assistente de onboarding com IA, dashboard internacional de preços", achievement: "Liderou o planejamento de roadmap com áreas multifuncionais e aumentou a ativação em 18%." },
      document: { header: "São Paulo, Brasil | amanda@exemplo.com", summaryTitle: "Resumo profissional", summaryText: "Product manager com experiência no lançamento de produtos SaaS orientados por dados em mercados globais. Forte atuação em estratégia, experimentação e alinhamento com stakeholders.", experienceTitle: "Experiência profissional", role: "Product Manager, Northstar Technologies", experienceText: "Liderou o planejamento de roadmap com áreas multifuncionais e aumentou a ativação em 18% por meio de experimentos de onboarding e pesquisa com clientes.", educationTitle: "Formação", educationText: "Universidade de São Paulo, Administração", skillsTitle: "Habilidades" },
    },
    ai: {
      title: "Otimize seu currículo para uma vaga",
      text: "Cole a descrição da vaga e veja sugestões para melhorar seu currículo.",
      label: "Descrição da vaga",
      placeholder: "Cole a descrição da vaga aqui...",
      button: "Analisar vaga",
      score: "Nota ATS estimada",
      suggestionsTitle: "Sugestões de melhoria",
    },
    settings: {
      profileTitle: "Informações do perfil",
      preferencesTitle: "Preferências",
      themeTitle: "Tema",
      languageTitle: "Idioma",
      securityTitle: "Segurança",
      accountTitle: "Conta",
      accountText: "Gerencie senha, provedores de login e segurança da conta. A integração com backend pode ser adicionada depois.",
      updatePassword: "Alterar senha",
      languagePreference: "Idioma",
      themePreference: "Tema",
      saveChanges: "Salvar alterações",
      cancel: "Cancelar",
      unsaved: "Alterações não salvas",
      saved: "Perfil atualizado com sucesso.",
      saveError: "Não foi possível salvar o perfil. Verifique o armazenamento do navegador e tente novamente.",
      professionalTitle: "Título profissional",
      emailVerified: "E-mail verificado",
      activeAccount: "Conta ativa",
      changePasswordHelp: "A alteração de senha está preparada para integração com backend.",
      legalTitle: "Legal",
      backToDashboard: "Voltar ao painel",
      languageOptions: { pt: "Português (Brasil)", en: "Inglês" },
      themeOptions: { light: "Claro", dark: "Escuro", system: "Sistema" },
    },
  },
};

Object.assign(I18N.pt.ai, {
  navTitle: "Assistente IA",
  title: "Otimize seu currículo para uma vaga",
  text: "Cole a descrição da vaga e veja sugestões para melhorar seu currículo.",
  selectResume: "Selecionar currículo",
  noResume: "Crie um currículo antes de usar o Assistente IA.",
  createResume: "Criar currículo",
  jobTitle: "Cargo da vaga",
  company: "Empresa, opcional",
  label: "Descrição da vaga",
  placeholder: "Cole a descrição da vaga aqui...",
  button: "Analisar vaga",
  analyzing: "Analisando currículo...",
  start: "Cole uma descrição de vaga para começar.",
  noSuggestions: "Nenhuma sugestão encontrada ainda.",
  selectResumeError: "Selecione um currículo para analisar.",
  jobDescriptionError: "Cole uma descrição de vaga antes de analisar.",
  score: "Nota ATS estimada",
  scoreLabels: ["Precisa melhorar", "Bom começo", "Bom", "Muito bom"],
  suggestionsTitle: "Sugestões de melhoria",
  foundKeywords: "Palavras-chave encontradas",
  missingKeywords: "Palavras-chave faltando",
  skillsMatch: "Compatibilidade de habilidades",
  experienceMatch: "Compatibilidade de experiência",
  categories: { summary: "Resumo profissional", experience: "Experiência", skills: "Habilidades", keywords: "Palavras-chave", formatting: "Formatação", upgrade: "Otimização avançada" },
  actions: { apply: "Aplicar sugestão", copy: "Copiar sugestão", edit: "Editar no currículo", copied: "Sugestão copiada", pro: "Disponível no Pro" },
  suggestions: {
    summaryTarget: "Seu resumo profissional pode citar melhor o cargo desejado.",
    summaryWeak: "Fortaleça seu resumo com seus principais pontos fortes e foco profissional.",
    measurable: "Adicione resultados mensuráveis nas experiências.",
    skills: "Inclua habilidades relevantes da descrição da vaga na seção de habilidades.",
    keywords: "Use as palavras-chave faltantes naturalmente no resumo, experiência ou habilidades.",
    formatting: "Mantenha títulos de seção claros e bullets objetivos para leitura por ATS.",
    contact: "Inclua e-mail, telefone e localização para facilitar o contato dos recrutadores.",
    advanced: "Desbloqueie recomendações mais profundas de palavras-chave e adaptação por vaga.",
  },
});

Object.assign(I18N.en.auth, {
  signInSubtitle: "Access your resumes, cover letters and career tools.",
  signUpSubtitle: "Start creating professional resumes in minutes.",
  fullName: "Name",
  signInButton: "Sign in",
  signUpButton: "Create account",
  sendingCode: "Preparing instructions...",
  forgotPassword: "Forgot password",
  createAccount: "Create account",
  resetSubtitle: "Enter your email to receive reset instructions.",
  sendCode: "Send instructions",
  resetPrepared: "Password reset flow is prepared. Configure email sending to activate it in production.",
});
Object.assign(I18N.en.auth.errors, {
  duplicate: "This email is already registered.",
  login: "Email or password is incorrect.",
  password: "Use at least 8 characters.",
});
Object.assign(I18N.en.dashboard.nav, { profile: "Profile" });
Object.assign(I18N.en.dashboard, {
  currentPlan: "Current plan",
  cookies: "Cookies",
});
Object.assign(I18N.en.nav, {
  home: "Home",
  blog: "Blog",
  contact: "Contact",
  termsShort: "Terms",
  privacyShort: "Privacy",
});
Object.assign(I18N.en.pricing, {
  comingSoon: "Coming soon",
  paymentComingSoon: "Payment coming soon",
  currentPlanLabel: "Current plan",
  featureComparisonTitle: "Feature comparison",
  featureComparisonSubtitle: "Compare what is included in each Succeedora plan.",
  included: "Included",
  limited: "Limited",
  notIncluded: "Not included",
  comparisonRows: [
    ["Resume builder", "Included", "Included", "Included"],
    ["Resume versions", "1 resume", "Multiple resumes", "Multiple resumes"],
    ["Templates", "Basic templates", "Premium templates", "Premium templates"],
    ["PDF export", "With Succeedora branding", "Without branding", "Without branding"],
    ["Cover letters", "Limited", "Included", "Included"],
    ["AI tools", "Limited", "Included", "Advanced"],
    ["ATS analysis", "Not included", "Basic", "Advanced"],
  ],
});
Object.assign(I18N.en, {
  payments: {
    title: "Pix payment",
    intro: "Scan the QR Code or copy the Pix code below to complete the payment.",
    product: "Product",
    amount: "Amount",
    status: "Status",
    method: "Method",
    date: "Date",
    pixKey: "Pix key",
    pixCopyPaste: "Pix copy and paste",
    copyCode: "Copy Pix code",
    codeCopied: "Code copied",
    completed: "I have completed the payment",
    cancel: "Cancel",
    warning: "After payment, access may not be immediate because confirmation will be reviewed manually.",
    waitingPayment: "Waiting for payment",
    waitingConfirmation: "Waiting for confirmation",
    approved: "Approved",
    rejected: "Rejected",
    cancelled: "Cancelled",
    confirmedMessage: "We received your confirmation. The payment will be manually reviewed before the feature is unlocked.",
    historyTitle: "Payments",
    historyEmpty: "No Pix payment requests yet.",
    manualBadge: "Manual confirmation",
    pixOnly: "Pix is available only for one-time purchases.",
  },
});
Object.assign(I18N.en.dashboard.access, {
  unlockTitle: "Paid feature coming soon",
  unlockText: "This feature may be unlocked by subscription, one-time Pix payment or card payment via Stripe, depending on the feature type.",
  paymentDetail: "Pix will be used only for one-time payments. Card via Stripe may support one-time payments, subscriptions and installments.",
  gotIt: "Got it",
  placeholder: "This feature may be unlocked by subscription, one-time Pix payment or card payment via Stripe, depending on the feature type.",
});
Object.assign(I18N.en.settings, {
  profileTitle: "Profile",
  appearanceTitle: "Appearance",
  languageTitle: "Language",
  accountTitle: "Account",
  privacyTitle: "Privacy",
  phone: "Phone",
  name: "Name",
  preferredLanguage: "Preferred language",
  changePassword: "Change password",
  updatePassword: "Change password",
  accountText: "Manage your local Succeedora account and session.",
  privacyText: "Review the public legal pages without ending your session.",
  saveDuplicate: "This email is already registered.",
  mockPasswordMessage: "Password reset flow is prepared. Configure email sending to activate it in production.",
});
Object.assign(I18N.pt.auth, {
  signUpTitle: "Crie sua conta",
  signInSubtitle: "Acesse seus curr\u00edculos, cartas e ferramentas de carreira.",
  signUpSubtitle: "Comece a criar curr\u00edculos profissionais em poucos minutos.",
  fullName: "Nome",
  createAccount: "Criar conta",
  resetSubtitle: "Digite seu e-mail para receber as instru\u00e7\u00f5es de recupera\u00e7\u00e3o.",
  sendCode: "Enviar instru\u00e7\u00f5es",
  sendingCode: "Preparando instru\u00e7\u00f5es...",
  resetPrepared: "Recupera\u00e7\u00e3o de senha preparada. Configure o envio de e-mails para ativar em produ\u00e7\u00e3o.",
});
Object.assign(I18N.pt.auth.errors, {
  duplicate: "Este e-mail j\u00e1 est\u00e1 cadastrado.",
  login: "E-mail ou senha incorretos.",
  password: "Use pelo menos 8 caracteres.",
});
Object.assign(I18N.pt.dashboard.nav, { profile: "Perfil" });
Object.assign(I18N.pt.dashboard, {
  currentPlan: "Plano atual",
  cookies: "Cookies",
});
Object.assign(I18N.pt.nav, {
  home: "Início",
  blog: "Blog",
  contact: "Contato",
  termsShort: "Termos",
  privacyShort: "Privacidade",
});
Object.assign(I18N.pt.pricing, {
  comingSoon: "Em breve",
  paymentComingSoon: "Pagamento em breve",
  currentPlanLabel: "Plano atual",
  featureComparisonTitle: "Comparativo de recursos",
  featureComparisonSubtitle: "Compare o que est\u00e1 inclu\u00eddo em cada plano da Succeedora.",
  included: "Inclu\u00eddo",
  limited: "Limitado",
  notIncluded: "N\u00e3o inclu\u00eddo",
  comparisonRows: [
    ["Criador de curr\u00edculos", "Inclu\u00eddo", "Inclu\u00eddo", "Inclu\u00eddo"],
    ["Vers\u00f5es de curr\u00edculo", "1 curr\u00edculo", "V\u00e1rios curr\u00edculos", "V\u00e1rios curr\u00edculos"],
    ["Modelos", "Modelos b\u00e1sicos", "Modelos premium", "Modelos premium"],
    ["Exporta\u00e7\u00e3o em PDF", "Com marca da Succeedora", "Sem marca", "Sem marca"],
    ["Cartas de apresenta\u00e7\u00e3o", "Limitado", "Inclu\u00eddo", "Inclu\u00eddo"],
    ["Ferramentas de IA", "Limitado", "Inclu\u00eddo", "Avan\u00e7ado"],
    ["An\u00e1lise ATS", "N\u00e3o inclu\u00eddo", "B\u00e1sico", "Avan\u00e7ado"],
  ],
});
Object.assign(I18N.pt, {
  payments: {
    title: "Pagamento via Pix",
    intro: "Escaneie o QR Code ou copie o código Pix abaixo para realizar o pagamento.",
    product: "Produto",
    amount: "Valor",
    status: "Status",
    method: "Método",
    date: "Data",
    pixKey: "Chave Pix",
    pixCopyPaste: "Pix Copia e Cola",
    copyCode: "Copiar código Pix",
    codeCopied: "Código copiado",
    completed: "Já realizei o pagamento",
    cancel: "Cancelar",
    warning: "Após o pagamento, a liberação pode não ser imediata, pois a confirmação será feita manualmente.",
    waitingPayment: "Aguardando pagamento",
    waitingConfirmation: "Aguardando confirmação",
    approved: "Aprovado",
    rejected: "Recusado",
    cancelled: "Cancelado",
    confirmedMessage: "Recebemos sua confirmação. O pagamento será verificado manualmente antes da liberação do recurso.",
    historyTitle: "Pagamentos",
    historyEmpty: "Nenhum pedido Pix criado ainda.",
    manualBadge: "Confirmação manual",
    pixOnly: "Pix está disponível apenas para compras avulsas.",
  },
});

function upsertSection(sections, title, body, afterTitle = "") {
  const existingIndex = sections.findIndex(([heading]) => heading === title);
  if (existingIndex >= 0) {
    sections[existingIndex] = [title, body];
    return;
  }
  const afterIndex = sections.findIndex(([heading]) => heading === afterTitle);
  sections.splice(afterIndex >= 0 ? afterIndex + 1 : sections.length, 0, [title, body]);
}

function replaceSection(sections, currentTitle, nextTitle, body) {
  const existingIndex = sections.findIndex(([heading]) => heading === currentTitle);
  if (existingIndex >= 0) sections[existingIndex] = [nextTitle, body];
  else upsertSection(sections, nextTitle, body);
}

replaceSection(
  I18N.en.legal.terms,
  "Payments",
  "Payments",
  "Succeedora may offer payments via Pix and credit card processed by Stripe or an equivalent provider. Pix will be available only for one-time purchases. Card payments may be used for one-time purchases, subscriptions and installment payments when available. Installment payments, when available, will be offered only by card and may depend on payment provider rules, purchase amount, country and currency."
);
replaceSection(
  I18N.en.legal.terms,
  "One-time payments",
  "One-time payments",
  "One-time payments may unlock specific features, such as watermark removal, premium PDF, premium templates, AI credits, career packs or online resume links. One-time payments unlock specific features without automatically turning the user into a subscriber. Pix payments will be accepted only for one-time purchases. Pix will not be used for recurring subscriptions or installment payments. In the initial manual Pix phase, Succeedora may show a Pix QR Code using the company CNPJ as the Pix key, and access will only be released after manual review and approval."
);
upsertSection(
  I18N.en.legal.terms,
  "Installment payments",
  "Installment payments may be available only for card payments via Stripe, depending on purchase amount, country, currency, payment provider rules and platform configuration. Pix will not be offered as an installment payment method.",
  "One-time payments"
);
replaceSection(
  I18N.en.legal.terms,
  "Subscriptions",
  "Subscriptions",
  "Paid plans, such as Pro and Premium, may work as recurring subscriptions paid by card via Stripe when activated. Pix will not be used for automatic recurring billing. Pricing, billing period, renewal and cancellation details will be shown before purchase confirmation."
);
replaceSection(
  I18N.en.legal.privacy,
  "Payment data",
  "Payment data",
  "When paid features are activated, payment data may be processed by external providers such as Stripe, Pix or other available methods. Succeedora should not store full card details inside the app. We may store purchase-related information such as purchased plan, payment status, amount, date, transaction identifier and unlocked feature for access control, support and history."
);
replaceSection(
  I18N.en.legal.privacy,
  "Pix payments",
  "Pix payments",
  "For Pix payments, we may process information necessary to identify and confirm the payment, such as name, email, amount, date, Pix key, Pix payload, submitted receipt if requested, confirmation status and requested feature. Pix will be used only for one-time payments. In early stages, Pix confirmation may be manual before any feature is unlocked."
);
replaceSection(
  I18N.en.legal.privacy,
  "Stripe payments",
  "Stripe payments",
  "For card payments via Stripe, the payment provider may process data required for one-time purchases, subscriptions and installment payments. Succeedora should not store full card details inside the app. These providers may collect and process payment data according to their own privacy and security policies."
);

replaceSection(
  I18N.pt.legal.terms,
  "Pagamentos",
  "Pagamentos",
  "A Succeedora poder\u00e1 oferecer pagamentos via Pix e cart\u00e3o de cr\u00e9dito processado por Stripe ou provedor equivalente. Pix ser\u00e1 disponibilizado apenas para compras avulsas e pagamentos \u00fanicos. Pagamentos com cart\u00e3o poder\u00e3o ser usados para compras \u00fanicas, assinaturas e pagamentos parcelados, quando dispon\u00edveis. Pagamentos parcelados, quando dispon\u00edveis, ser\u00e3o oferecidos apenas por cart\u00e3o e poder\u00e3o depender das regras do provedor de pagamento, valor da compra, pa\u00eds e moeda."
);
replaceSection(
  I18N.pt.legal.terms,
  "Pagamentos \u00fanicos",
  "Pagamentos \u00fanicos",
  "Pagamentos \u00fanicos podem liberar recursos espec\u00edficos, como remo\u00e7\u00e3o de marca d'\u00e1gua, PDF premium, modelos premium, cr\u00e9ditos de IA, pacotes de carreira ou link de curr\u00edculo online. Pagamentos \u00fanicos liberam recursos espec\u00edficos sem transformar automaticamente o usu\u00e1rio em assinante. Pagamentos via Pix ser\u00e3o aceitos apenas para compras avulsas e pagamentos \u00fanicos. Pix n\u00e3o ser\u00e1 usado para assinaturas recorrentes ou pagamentos parcelados. Na fase inicial de Pix manual, a Succeedora poder\u00e1 exibir QR Code Pix usando o CNPJ da empresa como chave Pix, e o acesso s\u00f3 ser\u00e1 liberado ap\u00f3s an\u00e1lise e aprova\u00e7\u00e3o manual."
);
upsertSection(
  I18N.pt.legal.terms,
  "Pagamentos parcelados",
  "Pagamentos parcelados poder\u00e3o estar dispon\u00edveis apenas para cart\u00e3o via Stripe, dependendo do valor da compra, pa\u00eds, moeda, regras do provedor de pagamento e configura\u00e7\u00e3o da plataforma. Pix n\u00e3o ser\u00e1 oferecido como forma de parcelamento.",
  "Pagamentos \u00fanicos"
);
replaceSection(
  I18N.pt.legal.terms,
  "Assinaturas",
  "Assinaturas",
  "Planos pagos, como Pro e Premium, poder\u00e3o funcionar como assinaturas recorrentes pagas por cart\u00e3o via Stripe quando forem ativados. Pix n\u00e3o ser\u00e1 usado para cobran\u00e7a recorrente autom\u00e1tica. Os detalhes de pre\u00e7o, per\u00edodo de cobran\u00e7a, renova\u00e7\u00e3o e cancelamento ser\u00e3o exibidos antes da confirma\u00e7\u00e3o da compra."
);
replaceSection(
  I18N.pt.legal.privacy,
  "Dados de pagamento",
  "Dados de pagamento",
  "Quando recursos pagos forem ativados, dados de pagamento poder\u00e3o ser processados por provedores externos, como Stripe, Pix ou outros meios dispon\u00edveis. A Succeedora n\u00e3o deve armazenar dados completos de cart\u00e3o no pr\u00f3prio aplicativo. Podemos armazenar informa\u00e7\u00f5es relacionadas \u00e0 compra, como plano adquirido, status do pagamento, valor, data, identificador da transa\u00e7\u00e3o e recurso liberado, para controle de acesso, suporte e hist\u00f3rico."
);
replaceSection(
  I18N.pt.legal.privacy,
  "Pagamentos via Pix",
  "Pagamentos via Pix",
  "Para pagamentos via Pix, poderemos tratar informa\u00e7\u00f5es necess\u00e1rias para identifica\u00e7\u00e3o e confirma\u00e7\u00e3o do pagamento, como nome, e-mail, valor, data, chave Pix, payload Pix, comprovante enviado se solicitado, status de confirma\u00e7\u00e3o e recurso solicitado. Pix ser\u00e1 usado apenas para pagamentos \u00fanicos. Em fases iniciais, a confirma\u00e7\u00e3o de Pix poder\u00e1 ser manual antes da libera\u00e7\u00e3o de qualquer recurso."
);
replaceSection(
  I18N.pt.legal.privacy,
  "Pagamentos via Stripe",
  "Pagamentos via Stripe",
  "Para pagamentos com cart\u00e3o via Stripe, o provedor de pagamento poder\u00e1 processar dados necess\u00e1rios para compras \u00fanicas, assinaturas e pagamentos parcelados. A Succeedora n\u00e3o deve armazenar dados completos de cart\u00e3o no pr\u00f3prio aplicativo. Esses provedores podem coletar e processar dados de pagamento conforme suas pr\u00f3prias pol\u00edticas de privacidade e seguran\u00e7a."
);
Object.assign(I18N.pt.dashboard.access, {
  unlockTitle: "Recurso pago em breve",
  unlockText: "Este recurso poder\u00e1 ser liberado por assinatura, pagamento \u00fanico via Pix ou cart\u00e3o via Stripe, dependendo do tipo de recurso.",
  paymentDetail: "Pix ser\u00e1 usado apenas para pagamentos \u00fanicos. Cart\u00e3o via Stripe poder\u00e1 aceitar pagamentos \u00fanicos, assinaturas e parcelamento.",
  gotIt: "Entendi",
  placeholder: "Este recurso poder\u00e1 ser liberado por assinatura, pagamento \u00fanico via Pix ou cart\u00e3o via Stripe, dependendo do tipo de recurso.",
});

Object.assign(I18N.en.pricing, {
  plannedPaymentMethodsTitle: "Planned payment methods",
  plannedPaymentMethodsStatus: "Payments coming soon",
  plannedPaymentMethodsText: "Pix will be available only for one-time payments. Credit card via Stripe may be used for one-time payments, subscriptions and installment payments.",
  paymentMethods: [
    ["Pix", "One-time payments only"],
    ["Card via Stripe", "One-time payments, subscriptions and installments"],
  ],
  oneTimePaymentsTitle: "One-time payments",
  oneTimePaymentsText: "One-time payments unlock specific features without automatically turning the user into a subscriber.",
  oneTimePaymentExamples: ["Remove watermark", "Premium PDF", "Premium template", "Career pack", "AI credits", "Online resume link"],
  pixOnlyText: "Pix payments will be accepted only for one-time purchases. Pix will not be used for recurring subscriptions or installment payments.",
  stripeCardText: "Card payments may be processed via Stripe and may be used for one-time purchases, subscriptions and installment payments when available.",
  installmentPaymentsTitle: "Installment payments",
  installmentPaymentsText: "Installment payments may be available only for card payments via Stripe, depending on purchase amount, country, currency, payment provider rules and platform configuration.",
  subscriptionsTitle: "Subscriptions",
  subscriptionsText: "Plans such as Pro and Premium may work as recurring subscriptions paid by card via Stripe. Pix will not be used for automatic recurring billing.",
  planPaymentNote: "Planned payment: card via Stripe for subscriptions.",
  oneTimePaymentNote: "Planned payment: Pix or card via Stripe.",
  creditPaymentNote: "Planned payment: Pix or card via Stripe for one-time credit packs.",
  paymentFaq: [
    ["Can I use Succeedora for free?", "Yes. The Free plan lets users test the builder and create a basic resume."],
    ["Can I pay only once?", "Yes. One-time options may use Pix or card via Stripe for a premium download, Career Pack, template, AI credits or online resume link."],
    ["Can Pix be used for subscriptions?", "No. Pix will be accepted only for one-time purchases and will not be used for recurring subscriptions or installment payments."],
    ["How will card payments work?", "Card payments may be processed via Stripe for one-time purchases, Pro and Premium subscriptions, installments and international payments when available."],
    ["What are AI credits?", "AI Credits let you use AI tools such as rewriting, translation, cover letters and job tailoring without a subscription."],
    ["Can I cancel my subscription anytime?", "Real billing logic is not integrated yet, but the intended model supports cancellation details before purchase confirmation."],
  ],
});

Object.assign(I18N.pt.pricing, {
  plannedPaymentMethodsTitle: "Formas de pagamento planejadas",
  plannedPaymentMethodsStatus: "Pagamentos em breve",
  plannedPaymentMethodsText: "Pix estar\u00e1 dispon\u00edvel apenas para pagamentos \u00fanicos. Cart\u00e3o de cr\u00e9dito via Stripe poder\u00e1 ser usado para pagamentos \u00fanicos, assinaturas e pagamentos parcelados.",
  paymentMethods: [
    ["Pix", "Somente pagamentos \u00fanicos"],
    ["Cart\u00e3o via Stripe", "Pagamentos \u00fanicos, assinaturas e parcelamento"],
  ],
  oneTimePaymentsTitle: "Pagamentos \u00fanicos",
  oneTimePaymentsText: "Pagamentos \u00fanicos liberam recursos espec\u00edficos sem transformar automaticamente o usu\u00e1rio em assinante.",
  oneTimePaymentExamples: ["Remover marca d'\u00e1gua", "PDF premium", "Modelo premium", "Pacote carreira", "Cr\u00e9ditos de IA", "Link de curr\u00edculo online"],
  pixOnlyText: "Pagamentos via Pix ser\u00e3o aceitos apenas para compras avulsas e pagamentos \u00fanicos. Pix n\u00e3o ser\u00e1 usado para assinaturas recorrentes ou pagamentos parcelados.",
  stripeCardText: "Pagamentos com cart\u00e3o poder\u00e3o ser processados via Stripe e poder\u00e3o ser usados para compras \u00fanicas, assinaturas e pagamentos parcelados, quando essa op\u00e7\u00e3o estiver dispon\u00edvel.",
  installmentPaymentsTitle: "Pagamentos parcelados",
  installmentPaymentsText: "Pagamentos parcelados poder\u00e3o estar dispon\u00edveis apenas para cart\u00e3o via Stripe, dependendo do valor da compra, pa\u00eds, moeda, regras do provedor de pagamento e configura\u00e7\u00e3o da plataforma.",
  subscriptionsTitle: "Assinaturas",
  subscriptionsText: "Planos como Pro e Premium poder\u00e3o funcionar como assinaturas recorrentes pagas por cart\u00e3o via Stripe. Pix n\u00e3o ser\u00e1 usado para cobran\u00e7a recorrente autom\u00e1tica.",
  planPaymentNote: "Pagamento planejado: cart\u00e3o via Stripe para assinaturas.",
  oneTimePaymentNote: "Pagamento planejado: Pix ou cart\u00e3o via Stripe.",
  creditPaymentNote: "Pagamento planejado: Pix ou cart\u00e3o via Stripe para pacotes avulsos de cr\u00e9ditos.",
  paymentFaq: [
    ["Posso usar a Succeedora gr\u00e1tis?", "Sim. O plano Gr\u00e1tis permite testar o criador e fazer um curr\u00edculo b\u00e1sico."],
    ["Posso pagar apenas uma vez?", "Sim. Op\u00e7\u00f5es avulsas poder\u00e3o usar Pix ou cart\u00e3o via Stripe para download premium, pacote carreira, modelo, cr\u00e9ditos de IA ou link online."],
    ["Pix poder\u00e1 ser usado em assinaturas?", "N\u00e3o. Pix ser\u00e1 aceito apenas para compras avulsas e pagamentos \u00fanicos, sem assinatura recorrente ou parcelamento."],
    ["Como funcionar\u00e1 o cart\u00e3o?", "Pagamentos com cart\u00e3o poder\u00e3o ser processados via Stripe para compras \u00fanicas, assinaturas Pro e Premium, parcelamento e pagamentos internacionais quando dispon\u00edveis."],
    ["O que s\u00e3o cr\u00e9ditos de IA?", "Cr\u00e9ditos de IA permitem usar recursos como reescrita, tradu\u00e7\u00e3o, carta de apresenta\u00e7\u00e3o e adapta\u00e7\u00e3o para vaga sem assinatura."],
    ["Posso cancelar minha assinatura quando quiser?", "A cobran\u00e7a real ainda n\u00e3o foi integrada, mas o modelo previsto exibir\u00e1 detalhes de cancelamento antes da confirma\u00e7\u00e3o da compra."],
  ],
});
Object.assign(I18N.pt.settings, {
  profileTitle: "Perfil",
  appearanceTitle: "Apar\u00eancia",
  languageTitle: "Idioma",
  accountTitle: "Conta",
  privacyTitle: "Privacidade",
  phone: "Telefone",
  name: "Nome",
  preferredLanguage: "Idioma preferido",
  changePassword: "Alterar senha",
  updatePassword: "Alterar senha",
  accountText: "Gerencie sua conta local da Succeedora e sua sess\u00e3o.",
  privacyText: "Consulte as p\u00e1ginas legais p\u00fablicas sem encerrar sua sess\u00e3o.",
  saveDuplicate: "Este e-mail j\u00e1 est\u00e1 cadastrado.",
  mockPasswordMessage: "Recupera\u00e7\u00e3o de senha preparada. Configure o envio de e-mails para ativar em produ\u00e7\u00e3o.",
});

const routes = {
  "/": renderHome,
  "/pt": renderHome,
  "/en": renderHome,
  "/pricing": renderPricingPage,
  "/terms": renderTermsPage,
  "/privacy": renderPrivacyPage,
  "/contact": renderContactPage,
  "/cookies": renderCookiesPage,
  "/templates": renderPublicTemplatesPage,
  "/blog": renderBlogPage,
  "/login": renderSignIn,
  "/signin": renderSignIn,
  "/signup": renderSignUp,
  "/verify-email": renderVerifyEmail,
  "/forgot-password": renderForgotPassword,
  "/reset-password": renderForgotPassword,
  "/profile": renderProfile,
  "/settings": renderAccountSettings,
  "/admin": renderSignIn,
  "/dashboard": renderDashboard,
  "/dashboard/resumes": renderResumes,
  "/dashboard/builder": renderBuilder,
  "/dashboard/cover-letters": renderCoverLetters,
  "/dashboard/templates": renderTemplatesPage,
  "/dashboard/ai": renderAiAssistant,
  "/dashboard/profile": renderProfile,
  "/dashboard/settings": renderAccountSettings,
  "/dashboard/billing": renderBilling,
};

const PRIVATE_ROUTES = new Set([
  "/dashboard",
  "/dashboard/resumes",
  "/dashboard/builder",
  "/dashboard/cover-letters",
  "/dashboard/templates",
  "/dashboard/ai",
  "/dashboard/profile",
  "/dashboard/settings",
  "/dashboard/billing",
  "/profile",
  "/settings",
  "/admin",
]);

const PUBLIC_CLEAN_ROUTES = new Set(["/pricing", "/terms", "/privacy", "/contact", "/templates"]);

const NOINDEX_ROUTES = new Set([
  "/login",
  "/signin",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
  ...PRIVATE_ROUTES,
]);

const SEO_META = {
  home: {
    pt: {
      title: "Succeedora — Criador de Currículos Profissionais",
      description: "Crie currículos profissionais, cartas de apresentação e organize suas candidaturas com modelos modernos e ferramentas inteligentes.",
    },
    en: {
      title: "Succeedora — Professional Resume Builder",
      description: "Create professional resumes, cover letters and organize your job applications with modern templates and smart tools.",
    },
  },
  blog: {
    pt: {
      title: "Blog da Succeedora — Currículos, Carreira e Cartas de Apresentação",
      description: "Leia dicas práticas sobre currículo, carta de apresentação, ATS, entrevistas e carreira.",
    },
    en: {
      title: "Succeedora Blog — Resumes, Career and Cover Letters",
      description: "Read practical tips about resumes, cover letters, ATS, interviews and career.",
    },
  },
  terms: {
    pt: {
      title: "Succeedora — Termos de Uso",
      description: "Leia os Termos de Uso da Succeedora e entenda as condições para utilizar a plataforma.",
    },
    en: {
      title: "Succeedora — Terms of Service",
      description: "Read Succeedora’s Terms of Service and understand the conditions for using the platform.",
    },
  },
  privacy: {
    pt: {
      title: "Succeedora — Política de Privacidade",
      description: "Entenda como a Succeedora trata informações de conta, currículos, cartas e preferências do usuário.",
    },
    en: {
      title: "Succeedora — Privacy Policy",
      description: "Understand how Succeedora handles account information, resumes, cover letters and user preferences.",
    },
  },
  contact: {
    pt: {
      title: "Succeedora — Contato",
      description: "Entre em contato com a Succeedora para dúvidas, suporte e sugestões.",
    },
    en: {
      title: "Succeedora — Contact",
      description: "Contact Succeedora for questions, support and suggestions.",
    },
  },
  templates: {
    pt: {
      title: "Succeedora — Modelos de Currículo",
      description: "Conheça modelos de currículo profissionais para criar documentos modernos, claros e fáceis de revisar.",
    },
    en: {
      title: "Succeedora — Resume Templates",
      description: "Explore professional resume templates for modern, clear and easy-to-review career documents.",
    },
  },
  pricing: {
    pt: {
      title: "Succeedora — Preços",
      description: "Veja opções de planos e recursos da Succeedora para criar currículos, cartas e documentos de carreira.",
    },
    en: {
      title: "Succeedora — Pricing",
      description: "Review Succeedora plan options and features for resumes, cover letters and career documents.",
    },
  },
};

const BLOG_COPY = {
  en: {
    title: "Content to build better resumes",
    subtitle: "Practical guides about resumes, cover letters, ATS, interviews and career to help you apply with more confidence.",
    featured: "Featured article",
    categories: ["Resume", "Cover letter", "Interviews", "Career", "ATS", "First job", "English resume"],
    allCategories: "All",
    searchPlaceholder: "Search articles",
    readArticle: "Read article",
    relatedTitle: "Related articles",
    clusterTitle: "Most searched guides",
    clusterLinks: [
      ["How to make a resume", "how-to-create-professional-resume"],
      ["First job resume", "first-job-resume"],
      ["Professional summary", "professional-resume-summary"],
      ["Cover letter", "how-to-write-cover-letter"],
      ["ATS resume", "what-is-ats-resume"],
      ["English resume", "how-to-create-english-resume"],
    ],
    noResults: "No articles found. Try another search or category.",
    published: "Published",
    ctaTitle: "Create your professional resume with Succeedora",
    ctaText: "Choose a template, fill in your details and download your resume as a PDF.",
    ctaButton: "Create free resume",
    blogCtaTitle: "Ready to create your resume?",
    blogCtaText: "Choose a professional template and turn your information into a ready-to-send resume.",
    insightTitle: "Career insights",
    insightItems: ["ATS", "Professional summary", "Cover letter", "First job"],
  },
  pt: {
    title: "Conteúdo para criar currículos melhores",
    subtitle: "Guias práticos sobre currículo, carta de apresentação, ATS, entrevistas e carreira para ajudar você a se candidatar com mais confiança.",
    featured: "Artigo em destaque",
    categories: ["Currículo", "Carta de apresentação", "Entrevistas", "Carreira", "ATS", "Primeiro emprego", "Currículo em inglês"],
    allCategories: "Todos",
    searchPlaceholder: "Buscar artigos",
    readArticle: "Ler artigo",
    relatedTitle: "Artigos relacionados",
    clusterTitle: "Guias mais procurados",
    clusterLinks: [
      ["Como fazer currículo", "como-fazer-curriculo-profissional"],
      ["Currículo para primeiro emprego", "curriculo-primeiro-emprego"],
      ["Resumo profissional", "resumo-profissional-curriculo"],
      ["Carta de apresentação", "como-escrever-carta-de-apresentacao"],
      ["Currículo ATS", "o-que-e-curriculo-ats"],
      ["Currículo em inglês", "como-fazer-curriculo-em-ingles"],
    ],
    noResults: "Nenhum artigo encontrado. Tente outra busca ou categoria.",
    published: "Publicado",
    ctaTitle: "Crie seu currículo profissional com a Succeedora",
    ctaText: "Escolha um modelo, preencha seus dados e baixe seu currículo em PDF.",
    ctaButton: "Criar currículo grátis",
    blogCtaTitle: "Pronto para criar seu currículo?",
    blogCtaText: "Escolha um modelo profissional e transforme suas informações em um currículo pronto para enviar.",
    insightTitle: "Guias de carreira",
    insightItems: ["ATS", "Resumo profissional", "Carta de apresentação", "Primeiro emprego"],
  },
};

const BLOG_POSTS = [
  {
    language: "pt",
    slug: "como-fazer-curriculo-profissional",
    category: "Currículo",
    title: "Como fazer um currículo profissional em 2026",
    subtitle: "Um guia direto para organizar suas informações, destacar resultados e criar um currículo claro para recrutadores.",
    excerpt: "Veja como estruturar um currículo profissional, escolher informações relevantes e evitar excesso de detalhes.",
    metaTitle: "Como fazer um currículo profissional em 2026 | Succeedora",
    metaDescription: "Aprenda como fazer um currículo profissional em 2026 com estrutura clara, exemplos práticos, palavras-chave e cuidados para recrutadores e ATS.",
    publishedDate: "2026-05-13",
    readingTime: "6 min",
    content: [
      { heading: "Comece pela estrutura certa", body: ["Um currículo profissional precisa ser fácil de ler em poucos segundos. Use nome, contato, resumo profissional, experiência, formação, habilidades e idiomas em uma ordem lógica.", "Antes de escrever, escolha um dos <a href=\"#/templates\" data-route=\"/templates\">modelos de currículo</a> e mantenha espaçamento, títulos e datas consistentes."] },
      { heading: "Mostre resultados, não apenas tarefas", body: ["Troque frases genéricas por exemplos concretos. Em vez de escrever que era responsável por relatórios, explique que criou relatórios semanais para acompanhar vendas, custos ou atendimento.", "Quando possível, use números reais: volume de clientes, redução de tempo, aumento de conversão, tamanho da equipe ou frequência das entregas."] },
      { heading: "Revise para a vaga", body: ["Cada candidatura pode pedir ênfases diferentes. Ajuste o resumo, as habilidades e as experiências mais relevantes para a descrição da vaga.", "Depois de revisar, você pode <a href=\"#/signup\" data-route=\"/signup\">criar currículo</a> na Succeedora e baixar uma versão em PDF para enviar."] },
    ],
  },
  {
    language: "pt",
    slug: "resumo-profissional-curriculo",
    category: "Currículo",
    title: "O que colocar no resumo profissional do currículo",
    subtitle: "Aprenda a escrever um resumo curto, específico e alinhado ao tipo de vaga que você quer conquistar.",
    excerpt: "Entenda o papel do resumo profissional e veja exemplos para deixar o início do currículo mais forte.",
    metaTitle: "O que colocar no resumo profissional do currículo | Succeedora",
    metaDescription: "Veja o que escrever no resumo profissional do currículo, com exemplos práticos para diferentes perfis e dicas para evitar frases vagas.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "O resumo deve responder três perguntas", body: ["Em poucas linhas, diga quem você é profissionalmente, quais experiências ou habilidades são mais fortes e que tipo de contribuição pode entregar.", "Evite frases como “profissional proativo” sem contexto. Prefira uma descrição ligada à área, ao nível de experiência e aos resultados."] },
      { heading: "Exemplo prático", body: ["Para uma pessoa de atendimento: “Profissional de atendimento ao cliente com experiência em suporte por chat e telefone, organização de chamados e acompanhamento de indicadores de satisfação.”", "Esse formato é simples, mas ajuda recrutadores a entenderem rapidamente sua atuação."] },
      { heading: "Adapte o resumo para cada candidatura", body: ["Leia a vaga e identifique palavras importantes. Se a descrição menciona atendimento, CRM e indicadores, essas ideias podem aparecer naturalmente no resumo.", "Use o resumo junto com uma boa estrutura de <a href=\"#/templates\" data-route=\"/templates\">modelos de currículo</a> para melhorar a primeira impressão."] },
    ],
  },
  {
    language: "pt",
    slug: "curriculo-primeiro-emprego",
    category: "Primeiro emprego",
    title: "Como fazer um currículo para primeiro emprego",
    subtitle: "Veja como montar um currículo forte mesmo sem experiência formal.",
    excerpt: "Use formação, cursos, projetos, voluntariado e habilidades para criar um currículo de primeiro emprego mais completo.",
    metaTitle: "Como fazer um currículo para primeiro emprego | Succeedora",
    metaDescription: "Aprenda como fazer um currículo para primeiro emprego usando cursos, projetos, habilidades e experiências informais de forma profissional.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "Valorize formação e projetos", body: ["Se você ainda não teve um emprego formal, destaque escola, faculdade, cursos, projetos acadêmicos, trabalhos voluntários e atividades extracurriculares.", "Explique o que você fez e quais habilidades praticou, como organização, comunicação, pesquisa, atendimento, planilhas ou trabalho em equipe."] },
      { heading: "Inclua habilidades com contexto", body: ["Uma lista de habilidades ajuda, mas exemplos ajudam mais. Se você sabe Excel, diga se usou para organizar dados, controlar gastos ou fazer relatórios.", "Se tem inglês, informe o nível com honestidade e destaque situações em que já usou o idioma."] },
      { heading: "Use um visual simples", body: ["Para primeiro emprego, clareza vale mais que excesso de design. Prefira um modelo limpo e fácil de ler.", "Você pode começar por um modelo de estudante em <a href=\"#/templates\" data-route=\"/templates\">modelos de currículo</a> e depois ajustar para a vaga."] },
    ],
  },
  {
    language: "pt",
    slug: "como-escrever-carta-de-apresentacao",
    category: "Carta de apresentação",
    title: "Como escrever uma carta de apresentação",
    subtitle: "Entenda quando usar carta de apresentação e como escrever uma mensagem objetiva.",
    excerpt: "Aprenda uma estrutura simples para explicar seu interesse pela vaga e conectar sua experiência à empresa.",
    metaTitle: "Como escrever uma carta de apresentação | Succeedora",
    metaDescription: "Veja como escrever uma carta de apresentação objetiva, com estrutura, exemplos e links úteis para complementar seu currículo.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "Quando a carta ajuda", body: ["A carta de apresentação é útil quando você quer explicar uma transição de carreira, demonstrar interesse real pela empresa ou conectar experiências específicas à vaga.", "Ela não precisa repetir o currículo. O ideal é complementar o documento com contexto."] },
      { heading: "Estrutura simples", body: ["Comece dizendo a vaga de interesse. Em seguida, explique por que sua experiência combina com a oportunidade. Finalize com disponibilidade para conversar.", "Use parágrafos curtos e exemplos concretos. Uma boa <a href=\"#/dashboard/cover-letters\" data-route=\"/dashboard/cover-letters\">carta de apresentação</a> deve parecer escrita para aquela vaga, não para todas."] },
      { heading: "Cuidados importantes", body: ["Evite prometer resultados sem conhecer a empresa. Também não use elogios vazios ou textos longos demais.", "Revise ortografia, nome da empresa, cargo e tom antes de enviar."] },
    ],
  },
  {
    language: "pt",
    slug: "o-que-e-curriculo-ats",
    category: "ATS",
    title: "O que é currículo ATS e como melhorar sua nota",
    subtitle: "Entenda como sistemas de triagem leem currículos e como melhorar a clareza do seu documento.",
    excerpt: "Saiba o que é ATS, quais formatos ajudam a leitura e como usar palavras-chave sem exagero.",
    metaTitle: "O que é currículo ATS e como melhorar sua nota | Succeedora",
    metaDescription: "Entenda o que é currículo ATS, como melhorar sua nota ATS e quais práticas ajudam sistemas de recrutamento a ler seu currículo.",
    publishedDate: "2026-05-13",
    readingTime: "6 min",
    content: [
      { heading: "O que significa ATS", body: ["ATS é um sistema usado por empresas para organizar candidaturas e, em alguns casos, filtrar currículos por informações relevantes.", "Um bom currículo ATS não é cheio de truques. Ele é claro, bem estruturado e usa termos relacionados à vaga com naturalidade."] },
      { heading: "Como melhorar a leitura", body: ["Use títulos comuns, como Experiência, Formação e Habilidades. Evite colocar informações importantes apenas em imagens ou elementos muito decorativos.", "A <a href=\"#/dashboard/ai\" data-route=\"/dashboard/ai\">nota ATS</a> deve ser vista como apoio, não como garantia de entrevista."] },
      { heading: "Palavras-chave com equilíbrio", body: ["Compare a descrição da vaga com seu currículo. Se você realmente tem uma habilidade exigida, inclua essa habilidade no resumo, experiência ou lista de competências.", "Não repita palavras de forma artificial. Recrutadores também leem o documento."] },
    ],
  },
  {
    language: "pt",
    slug: "erros-comuns-no-curriculo",
    category: "Currículo",
    title: "Erros comuns no currículo que podem prejudicar sua candidatura",
    subtitle: "Veja problemas frequentes que deixam o currículo confuso ou pouco convincente.",
    excerpt: "Corrija erros de clareza, excesso de informação, falta de resultados e problemas de formatação.",
    metaTitle: "Erros comuns no currículo que prejudicam candidaturas | Succeedora",
    metaDescription: "Conheça erros comuns no currículo e veja como corrigir excesso de informação, falta de resultados, formatação confusa e dados desatualizados.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "Currículo longo sem foco", body: ["Um currículo não precisa contar toda a sua história. Ele deve destacar as informações mais relevantes para a vaga atual.", "Remova experiências muito antigas ou pouco relacionadas quando elas não ajudam a explicar seu objetivo."] },
      { heading: "Descrições vagas", body: ["Frases como “responsável por diversas atividades” não mostram valor. Explique quais atividades, para quem e com qual resultado.", "Use verbos claros: organizei, implementei, analisei, atendi, liderei, reduzi, acompanhei."] },
      { heading: "Formatação inconsistente", body: ["Datas desalinhadas, fontes diferentes e seções confusas dificultam a leitura.", "Escolha um padrão visual em <a href=\"#/templates\" data-route=\"/templates\">modelos de currículo</a> e mantenha o mesmo estilo em todo o documento."] },
    ],
  },
  {
    language: "pt",
    slug: "como-fazer-curriculo-em-ingles",
    category: "Currículo em inglês",
    title: "Como fazer um currículo em inglês",
    subtitle: "Veja cuidados de idioma, estrutura e adaptação para vagas internacionais.",
    excerpt: "Aprenda diferenças importantes entre currículo em português e resume em inglês.",
    metaTitle: "Como fazer um currículo em inglês | Succeedora",
    metaDescription: "Aprenda como fazer um currículo em inglês com estrutura adequada, vocabulário profissional e cuidados para candidaturas internacionais.",
    publishedDate: "2026-05-13",
    readingTime: "6 min",
    content: [
      { heading: "Currículo em inglês não é tradução literal", body: ["Um resume em inglês costuma ser mais direto e orientado a impacto. Traduzir palavra por palavra pode deixar o texto estranho.", "Revise cargos, habilidades e resultados usando vocabulário natural da sua área."] },
      { heading: "Adapte informações pessoais", body: ["Em muitos países, não se usa foto, idade, estado civil ou documentos pessoais no currículo. Pesquise o padrão do país antes de enviar.", "Mantenha contato, cidade ou região, LinkedIn e portfólio quando forem relevantes."] },
      { heading: "Use exemplos concretos", body: ["Prefira frases como “Improved onboarding documentation for new customers” em vez de descrições genéricas.", "Depois de criar a versão base, use <a href=\"#/templates\" data-route=\"/templates\">modelos de currículo</a> limpos para manter a leitura profissional."] },
    ],
  },
  {
    language: "en",
    slug: "how-to-create-professional-resume",
    category: "Resume",
    title: "How to create a professional resume in 2026",
    subtitle: "A practical guide to structure your resume, show impact and make it easier for recruiters to scan.",
    excerpt: "Learn how to organize a professional resume with clear sections, relevant examples and a polished layout.",
    metaTitle: "How to create a professional resume in 2026 | Succeedora",
    metaDescription: "Learn how to create a professional resume in 2026 with clear structure, practical examples, keywords and recruiter-friendly formatting.",
    publishedDate: "2026-05-13",
    readingTime: "6 min",
    content: [
      { heading: "Start with a clear structure", body: ["A professional resume should be easy to scan. Use contact details, summary, work experience, education, skills and languages in a logical order.", "Choose one of the <a href=\"#/templates\" data-route=\"/templates\">resume templates</a> first so spacing, headings and dates stay consistent."] },
      { heading: "Focus on impact", body: ["Recruiters need more than a list of tasks. Explain what you did, who benefited and what changed because of your work.", "Use numbers when they are accurate: customers served, reports created, time saved, revenue supported, team size or project volume."] },
      { heading: "Tailor before sending", body: ["Compare your resume with the job description and adjust the summary, skills and most relevant experience.", "When your content is ready, you can <a href=\"#/signup\" data-route=\"/signup\">create resume</a> in Succeedora and export a clean PDF."] },
    ],
  },
  {
    language: "en",
    slug: "professional-resume-summary",
    category: "Resume",
    title: "What to write in a professional resume summary",
    subtitle: "Write a concise resume summary that explains your role, strengths and target position.",
    excerpt: "Use a simple formula to make your resume summary specific, useful and easy to adapt.",
    metaTitle: "What to write in a professional resume summary | Succeedora",
    metaDescription: "Learn what to write in a professional resume summary, with examples and tips to avoid vague phrases.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "Answer three questions", body: ["Your summary should tell the reader who you are professionally, what strengths matter most and what kind of role you are targeting.", "Avoid empty phrases such as “hard-working professional” unless you support them with context."] },
      { heading: "Use a practical example", body: ["For customer support: “Customer support professional with experience handling chat and phone requests, organizing tickets and tracking satisfaction metrics.”", "This is simple, but it gives recruiters useful information quickly."] },
      { heading: "Connect it to the job", body: ["If the job mentions CRM, customer retention and reporting, include those ideas only when they honestly match your experience.", "A strong summary works best with clean <a href=\"#/templates\" data-route=\"/templates\">resume templates</a> and consistent formatting."] },
    ],
  },
  {
    language: "en",
    slug: "first-job-resume",
    category: "First job",
    title: "How to create a resume for your first job",
    subtitle: "Build a strong first-job resume even without formal work experience.",
    excerpt: "Use education, courses, projects, volunteering and transferable skills to create a credible first resume.",
    metaTitle: "How to create a resume for your first job | Succeedora",
    metaDescription: "Learn how to create a resume for your first job using education, projects, courses, volunteering and practical skills.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "Use what you already have", body: ["If you do not have formal experience, highlight education, courses, academic projects, volunteering and extracurricular activities.", "Explain what you did and which skills you practiced, such as communication, research, spreadsheets, organization or teamwork."] },
      { heading: "Add context to skills", body: ["A skill list helps, but examples make it stronger. If you know Excel, mention whether you used it for budgets, data organization or reports.", "Be honest about language levels and software familiarity. Recruiters value clarity."] },
      { heading: "Keep the design simple", body: ["For a first job resume, readability matters more than heavy decoration.", "Start with a student-friendly layout from <a href=\"#/templates\" data-route=\"/templates\">resume templates</a> and adapt it to the role."] },
    ],
  },
  {
    language: "en",
    slug: "how-to-write-cover-letter",
    category: "Cover letter",
    title: "How to write a cover letter",
    subtitle: "Use a simple structure to connect your experience with a specific role.",
    excerpt: "Learn when a cover letter helps and how to write one without repeating your resume.",
    metaTitle: "How to write a cover letter | Succeedora",
    metaDescription: "Learn how to write a cover letter with a clear structure, practical examples and useful links to support your application.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "Know the purpose", body: ["A cover letter helps when you want to explain a career change, show specific interest in a company or connect a project to the role.", "It should not repeat your resume. It should add context."] },
      { heading: "Use a simple structure", body: ["Open with the role you are applying for. Explain why your experience fits. Close by inviting a conversation.", "A good <a href=\"#/dashboard/cover-letters\" data-route=\"/dashboard/cover-letters\">cover letter</a> feels specific to the job, not copied for every application."] },
      { heading: "Keep it concise", body: ["Use short paragraphs and concrete examples. Avoid overpromising results or using generic compliments.", "Before sending, check the company name, role title, spelling and tone."] },
    ],
  },
  {
    language: "en",
    slug: "what-is-ats-resume",
    category: "ATS",
    title: "What is an ATS resume and how to improve your score",
    subtitle: "Understand how applicant tracking systems read resumes and what makes a resume easier to parse.",
    excerpt: "Learn what ATS means, how to improve readability and how to use keywords naturally.",
    metaTitle: "What is an ATS resume and how to improve your score | Succeedora",
    metaDescription: "Understand what an ATS resume is, how to improve your ATS score and which formatting choices help recruiting systems read your resume.",
    publishedDate: "2026-05-13",
    readingTime: "6 min",
    content: [
      { heading: "What ATS means", body: ["ATS stands for applicant tracking system. Companies use these tools to organize applications and sometimes filter resumes by relevant information.", "A good ATS resume is not about tricks. It is clear, structured and aligned with the job."] },
      { heading: "Improve readability", body: ["Use common headings such as Experience, Education and Skills. Avoid placing important details only inside images or overly decorative elements.", "Treat an <a href=\"#/dashboard/ai\" data-route=\"/dashboard/ai\">ATS score</a> as guidance, not a guarantee of interviews."] },
      { heading: "Use keywords naturally", body: ["Compare the job description with your resume. If you truly have a required skill, include it in your summary, experience or skills section.", "Do not repeat keywords unnaturally. Recruiters still read the resume."] },
    ],
  },
  {
    language: "en",
    slug: "common-resume-mistakes",
    category: "Resume",
    title: "Common resume mistakes that can hurt your application",
    subtitle: "Fix frequent issues that make resumes hard to read or less convincing.",
    excerpt: "Avoid vague descriptions, inconsistent formatting, outdated details and unfocused content.",
    metaTitle: "Common resume mistakes that can hurt your application | Succeedora",
    metaDescription: "Review common resume mistakes and learn how to fix vague descriptions, inconsistent formatting, outdated details and unfocused content.",
    publishedDate: "2026-05-13",
    readingTime: "5 min",
    content: [
      { heading: "Too much information", body: ["A resume does not need to tell your full career story. It should highlight the information most relevant to the role.", "Remove old or unrelated details when they do not support your current target."] },
      { heading: "Vague responsibility lists", body: ["Phrases like “responsible for various tasks” do not show value. Explain which tasks, for whom and with what outcome.", "Use clear verbs such as organized, improved, analyzed, supported, led, reduced or coordinated."] },
      { heading: "Inconsistent formatting", body: ["Different fonts, misaligned dates and unclear sections slow down the reader.", "Pick one standard from <a href=\"#/templates\" data-route=\"/templates\">resume templates</a> and keep it consistent."] },
    ],
  },
  {
    language: "en",
    slug: "how-to-create-english-resume",
    category: "English resume",
    title: "How to create an English resume",
    subtitle: "Prepare a resume in English with the right structure, wording and international context.",
    excerpt: "Understand how an English resume differs from a direct translation of your local CV.",
    metaTitle: "How to create an English resume | Succeedora",
    metaDescription: "Learn how to create an English resume with professional wording, clear structure and practical tips for international applications.",
    publishedDate: "2026-05-13",
    readingTime: "6 min",
    content: [
      { heading: "Do not translate word for word", body: ["An English resume is usually direct and impact-oriented. Literal translation can make your experience sound unnatural.", "Review job titles, skills and results using vocabulary that is common in your field."] },
      { heading: "Adjust personal information", body: ["In many countries, resumes do not include photo, age, marital status or personal document numbers. Research the standard for your target country.", "Keep contact details, location, LinkedIn and portfolio links when relevant."] },
      { heading: "Use concrete examples", body: ["Prefer phrases like “Improved onboarding documentation for new customers” instead of vague descriptions.", "Use clean <a href=\"#/templates\" data-route=\"/templates\">resume templates</a> so the English version stays easy to scan."] },
    ],
  },
];

const BLOG_SLUG_TRANSLATIONS = [
  ["como-fazer-curriculo-profissional", "how-to-create-professional-resume"],
  ["resumo-profissional-curriculo", "professional-resume-summary"],
  ["curriculo-primeiro-emprego", "first-job-resume"],
  ["como-escrever-carta-de-apresentacao", "how-to-write-cover-letter"],
  ["o-que-e-curriculo-ats", "what-is-ats-resume"],
  ["erros-comuns-no-curriculo", "common-resume-mistakes"],
  ["como-fazer-curriculo-em-ingles", "how-to-create-english-resume"],
];

const RESUME_TEMPLATES = [
  {
    key: "modern",
    name: "Modern",
    icon: "file",
    category: "Modern",
    access: "pro",
    descriptions: {
      en: "A polished modern resume style for general professional use.",
      pt: "Um modelo moderno e polido para uso profissional geral.",
    },
    bestFor: {
      en: "Marketing, tech, administration, sales and customer service",
      pt: "Marketing, tecnologia, administração, vendas e atendimento",
    },
  },
  {
    key: "minimal",
    name: "Minimal",
    icon: "shield",
    category: "Minimal",
    access: "free",
    descriptions: {
      en: "A very clean resume focused on readability and ATS systems.",
      pt: "Um currículo muito limpo, focado em leitura fácil e sistemas ATS.",
    },
    bestFor: {
      en: "Most job applications and ATS systems",
      pt: "A maioria das candidaturas e sistemas ATS",
    },
  },
  {
    key: "executive",
    name: "Executive",
    icon: "layout",
    category: "Executive",
    access: "pro",
    descriptions: {
      en: "A premium resume style for experienced professionals and leaders.",
      pt: "Um modelo premium para profissionais experientes e liderança.",
    },
    bestFor: {
      en: "Managers, coordinators, senior professionals and leadership roles",
      pt: "Gestores, coordenadores, profissionais seniores e liderança",
    },
  },
  {
    key: "creative",
    name: "Creative",
    icon: "sparkles",
    category: "Creative",
    access: "pro",
    descriptions: {
      en: "A tasteful visual resume with modern structure and professional restraint.",
      pt: "Um currículo visual, moderno e profissional, sem exageros.",
    },
    bestFor: {
      en: "Designers, social media, content, marketing and creative roles",
      pt: "Design, social media, conteúdo, marketing e áreas criativas",
    },
  },
  {
    key: "student",
    name: "Student",
    icon: "pen",
    category: "Student",
    access: "free",
    descriptions: {
      en: "A friendly professional style for early-career resumes.",
      pt: "Um modelo profissional e acessível para início de carreira.",
    },
    bestFor: {
      en: "Students, interns, junior candidates and first job seekers",
      pt: "Estudantes, estagiários, juniores e primeiro emprego",
    },
  },
  {
    key: "international",
    name: "International",
    icon: "globe",
    category: "International",
    access: "pro",
    descriptions: {
      en: "A clean global format for English resumes, remote roles and bilingual profiles.",
      pt: "Um formato global para currículos em inglês, vagas remotas e perfis bilíngues.",
    },
    bestFor: {
      en: "International applications, remote roles and bilingual candidates",
      pt: "Candidaturas internacionais, vagas remotas e candidatos bilíngues",
    },
  },
  {
    key: "classic",
    name: "Classic",
    icon: "file",
    category: "Classic",
    access: "pro",
    descriptions: {
      en: "A timeless resume with familiar hierarchy and careful spacing.",
      pt: "Um currículo tradicional, com hierarquia familiar e espaçamento cuidadoso.",
    },
    bestFor: {
      en: "Administrative, operations, education and public-sector applications",
      pt: "Administração, operações, educação e candidaturas tradicionais",
    },
  },
  {
    key: "corporate",
    name: "Corporate",
    icon: "shield",
    category: "Corporate",
    access: "pro",
    descriptions: {
      en: "A restrained corporate layout for business and consulting roles.",
      pt: "Um layout corporativo discreto para negócios, consultoria e gestão.",
    },
    bestFor: {
      en: "Business, consulting, finance, HR and management",
      pt: "Negócios, consultoria, finanças, RH e gestão",
    },
  },
  {
    key: "tech",
    name: "Tech",
    icon: "settings",
    category: "Tech",
    access: "pro",
    descriptions: {
      en: "A crisp technology resume with strong skills visibility.",
      pt: "Um currículo de tecnologia com habilidades bem destacadas.",
    },
    bestFor: {
      en: "Software, data, product, IT and technical roles",
      pt: "Software, dados, produto, TI e funções técnicas",
    },
  },
  {
    key: "simple-ats",
    name: "Simple ATS",
    icon: "target",
    category: "Simple ATS",
    access: "free",
    descriptions: {
      en: "A highly readable one-column format built for ATS compatibility.",
      pt: "Um formato de uma coluna, muito legível e pensado para ATS.",
    },
    bestFor: {
      en: "Online applications, ATS uploads and conservative hiring processes",
      pt: "Candidaturas online, uploads em ATS e processos seletivos conservadores",
    },
  },
  {
    key: "elegant",
    name: "Elegant",
    icon: "sparkles",
    category: "Elegant",
    access: "pro",
    descriptions: {
      en: "A polished premium template with refined accents and calm structure.",
      pt: "Um modelo premium polido, com detalhes refinados e estrutura calma.",
    },
    bestFor: {
      en: "Senior specialists, client-facing roles and premium applications",
      pt: "Especialistas seniores, cargos com clientes e candidaturas premium",
    },
  },
  {
    key: "first-job",
    name: "First Job",
    icon: "pen",
    category: "First Job",
    access: "free",
    descriptions: {
      en: "A supportive layout for candidates with limited work history.",
      pt: "Um layout acolhedor para quem tem pouca experiência profissional.",
    },
    bestFor: {
      en: "First job, internships, apprenticeships and career transitions",
      pt: "Primeiro emprego, estágio, jovem aprendiz e transição de carreira",
    },
  },
];

const LOGO_DIRECTIONS = [
  {
    name: "Elegant Minimal",
    idea: "A quiet monogram with a single ribbon-like S and restrained cyan highlight.",
    fit: "Best for a conservative, highly professional career brand.",
  },
  {
    name: "Modern SaaS",
    idea: "A sharper tech badge with layered gradients, structured lines, and AI-product energy.",
    fit: "Best for emphasizing platform intelligence and startup momentum.",
  },
  {
    name: "Brandable Iconic",
    idea: "A distinctive success loop that forms a smart S, suggests upward progress, and keeps enough structure to feel career-focused.",
    fit: "Best overall for memorability, favicon strength, and premium SaaS credibility.",
  },
];

let currentLanguage = detectInitialLanguage();
let brandMarkId = 0;
let selectedTemplateKey = "modern";
let selectedDocumentFormat = getInitialDocumentFormat();
let sidebarCollapsed = false;
let sidebarManuallySet = false;
let sidebarAutoCollapsedForBuilder = false;
let sidebarStateBeforeBuilder = false;
let coverLetterBuilderOpen = false;
let currentCoverLetterId = null;
let coverLetterDraft = null;
let coverLetterSaveMessage = "";
let html2PdfLoadPromise = null;
let selectedTheme = getInitialTheme();
let currentBuilderResumeId = null;
let builderDraft = null;
let builderReturnRoute = "/dashboard/templates";
let builderSaveState = "saved";
let activeBuilderSectionIndex = 0;
let pendingTemplateChangeDraft = null;
let autoSaveTimer = null;
let aiAssistantState = { resumeId: "", jobTitle: "", company: "", jobDescription: "", result: null, error: "" };

const CSS_PX_PER_INCH = 96;
const MM_PER_INCH = 25.4;
const DOCUMENT_PAGE_SPECS = {
  a4: {
    key: "a4",
    jsPdfFormat: [210, 297],
    widthMm: 210,
    heightMm: 297,
    widthCss: "210mm",
    heightCss: "297mm",
  },
  letter: {
    key: "letter",
    jsPdfFormat: [8.5 * MM_PER_INCH, 11 * MM_PER_INCH],
    widthMm: 8.5 * MM_PER_INCH,
    heightMm: 11 * MM_PER_INCH,
    widthCss: "8.5in",
    heightCss: "11in",
  },
};

Object.values(DOCUMENT_PAGE_SPECS).forEach((spec) => {
  spec.widthPx = Math.round((spec.widthMm / MM_PER_INCH) * CSS_PX_PER_INCH);
  spec.heightPx = Math.round((spec.heightMm / MM_PER_INCH) * CSS_PX_PER_INCH);
});

function isDesktopSidebarViewport() {
  return !window.matchMedia || window.matchMedia("(min-width: 861px)").matches;
}

function preferCollapsedSidebarForBuilder() {
  if (sidebarManuallySet || !isDesktopSidebarViewport()) return;
  if (!sidebarAutoCollapsedForBuilder) sidebarStateBeforeBuilder = sidebarCollapsed;
  sidebarCollapsed = true;
  sidebarAutoCollapsedForBuilder = true;
}

function restoreSidebarAfterBuilder(activeKey) {
  if (activeKey === "builder" || sidebarManuallySet || !sidebarAutoCollapsedForBuilder) return;
  sidebarCollapsed = sidebarStateBeforeBuilder;
  sidebarAutoCollapsedForBuilder = false;
}

function getStoredLanguage() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === "pt" || saved === "en" ? saved : "";
  } catch (error) {
    return "";
  }
}

function pathLanguage() {
  const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
  return firstSegment === "pt" || firstSegment === "en" ? firstSegment : "";
}

function detectInitialLanguage() {
  const routed = pathLanguage();
  if (routed) return routed;

  const saved = getStoredLanguage();
  if (saved) return saved;

  const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  if (String(languages[0] || "").toLowerCase().startsWith("pt")) return "pt";
  if (languages.some((language) => String(language).toLowerCase().endsWith("-br"))) return "pt";

  try {
    if (BRAZIL_TIMEZONES.has(Intl.DateTimeFormat().resolvedOptions().timeZone)) return "pt";
  } catch (error) {
    // Time zone detection is a helpful hint only.
  }

  return "en";
}

function preferredDetectedLanguage() {
  const saved = getStoredLanguage();
  if (saved) return saved;
  return detectInitialLanguage();
}

function t() {
  return I18N[currentLanguage];
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function defaultDocumentFormat() {
  return currentLanguage === "pt" ? "a4" : "letter";
}

function normalizeDocumentFormat(format) {
  return format === "letter" ? "letter" : "a4";
}

function documentPageSpec(format = selectedDocumentFormat) {
  return DOCUMENT_PAGE_SPECS[normalizeDocumentFormat(format)] || DOCUMENT_PAGE_SPECS.a4;
}

function getInitialDocumentFormat() {
  try {
    const saved = localStorage.getItem(DOCUMENT_FORMAT_STORAGE_KEY);
    if (saved === "a4" || saved === "letter") return saved;
  } catch (error) {
    // Local storage can be unavailable in strict privacy contexts.
  }
  return defaultDocumentFormat();
}

function hasSavedDocumentFormat() {
  try {
    const saved = localStorage.getItem(DOCUMENT_FORMAT_STORAGE_KEY);
    return saved === "a4" || saved === "letter";
  } catch (error) {
    return false;
  }
}

function setDocumentFormat(format) {
  selectedDocumentFormat = normalizeDocumentFormat(format);
  try {
    localStorage.setItem(DOCUMENT_FORMAT_STORAGE_KEY, selectedDocumentFormat);
  } catch (error) {
    // Persisting the format is a convenience, not a blocker.
  }
}

function documentFormatClass(format = selectedDocumentFormat) {
  return `resume-format-${normalizeDocumentFormat(format)}`;
}

function applyDocumentFormatClass(element, format = selectedDocumentFormat) {
  if (!element) return;
  const normalized = normalizeDocumentFormat(format);
  element.classList.remove("resume-format-a4", "resume-format-letter", "preview-format-a4", "preview-format-letter");
  if (element.classList.contains("template-paper")) {
    element.classList.add(`preview-format-${normalized}`);
    element.setAttribute("data-document-format-current", normalized);
    return;
  }
  element.classList.add(documentFormatClass(normalized));
  element.setAttribute("data-document-format-current", normalized);
}

function documentFormatSwitch(activeFormat = selectedDocumentFormat, scope = "builder") {
  const b = t().builder;
  const active = normalizeDocumentFormat(activeFormat);
  const label = scope === "builder" ? b.documentFormat : b.formatShort;
  return `
    <div class="document-format-switch" data-format-scope="${scope}">
      <strong>${label}</strong>
      <div>
        <button class="${active === "a4" ? "active" : ""}" type="button" data-document-format="a4">${b.a4}</button>
        <button class="${active === "letter" ? "active" : ""}" type="button" data-document-format="letter">${b.usLetter}</button>
      </div>
    </div>
  `;
}

function builderReturnRouteFor(route = getRoute(), context = "") {
  if (route === "/dashboard/resumes" || context === "resumes") return "/dashboard/resumes";
  if (route === "/dashboard/templates" || context === "templates") return "/dashboard/templates";
  if (context === "edit-resume") return "/dashboard/resumes";
  return "/dashboard/templates";
}

function rememberBuilderReturnRoute(route = getRoute(), context = "") {
  builderReturnRoute = builderReturnRouteFor(route, context);
}

function exitResumeBuilder() {
  setRoute(builderReturnRoute || "/dashboard/templates");
}

function resumeLabels() {
  return currentLanguage === "pt" ? {
    untitled: "Currículo sem título",
    copyPrefix: "Cópia de",
    savedSuccess: "Currículo salvo.",
    deleteTitle: "Tem certeza que deseja excluir este currículo?",
    deleteText: "Essa ação não pode ser desfeita.",
    cancel: "Cancelar",
    delete: "Excluir",
    duplicate: "Duplicar",
    downloadPdf: "Baixar PDF",
    createFirst: "Criar meu primeiro currículo",
    suggestedMissing: {
      personal: "Adicione seus dados pessoais",
      summary: "Adicione um resumo profissional",
      experience: "Inclua experiência profissional",
      skills: "Adicione habilidades relevantes",
      ready: "Continue revisando e baixe o PDF",
    },
  } : {
    untitled: "Untitled resume",
    copyPrefix: "Copy of",
    savedSuccess: "Resume saved.",
    deleteTitle: "Are you sure you want to delete this resume?",
    deleteText: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    duplicate: "Duplicate",
    downloadPdf: "Download PDF",
    createFirst: "Create my first resume",
    suggestedMissing: {
      personal: "Add your personal information",
      summary: "Add a professional summary",
      experience: "Include work experience",
      skills: "Add relevant skills",
      ready: "Keep polishing and download the PDF",
    },
  };
}

function newResumeId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `resume-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isoNow() {
  return new Date().toISOString();
}

function formatResumeDate(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(currentLanguage === "pt" ? "pt-BR" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch (error) {
    return value;
  }
}

function normalizeTextList(value) {
  if (Array.isArray(value)) return value.map((item) => String(item || "").trim()).filter(Boolean);
  return String(value || "").split(/,|\n/).map((item) => item.trim()).filter(Boolean);
}

function linesFromValue(value) {
  return String(value || "").split("\n").map((item) => item.trim().replace(/^[-•]\s*/, "")).filter(Boolean);
}

function resumeContactLocation(personal = {}) {
  const structuredLocation = [personal.city, personal.state, personal.postalCode].map((item) => String(item || "").trim()).filter(Boolean).join(", ");
  return String(personal.location || "").trim() || structuredLocation || String(personal.address || "").trim();
}

function createBlankResume(overrides = {}) {
  const now = isoNow();
  const labels = resumeLabels();
  return {
    id: overrides.id || newResumeId(),
    title: overrides.title || labels.untitled,
    selectedTemplate: overrides.selectedTemplate || selectedTemplateKey || "modern",
    documentFormat: normalizeDocumentFormat(overrides.documentFormat || defaultDocumentFormat()),
    createdAt: overrides.createdAt || now,
    updatedAt: overrides.updatedAt || now,
    completion: Number.isFinite(overrides.completion) ? overrides.completion : 0,
    personal: { firstName: "", lastName: "", fullName: "", title: "", email: "", phone: "", address: "", city: "", state: "", postalCode: "", location: "", links: "" },
    summary: "",
    workExperience: [{ company: "", role: "", period: "", location: "", achievements: [] }],
    education: [{ school: "", degree: "" }],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    professionalLinks: [],
    ...overrides,
  };
}

function normalizeResume(raw = {}) {
  const base = createBlankResume({ id: raw.id || newResumeId() });
  const resume = { ...base, ...raw };
  resume.selectedTemplate = raw.selectedTemplate || raw.templateKey || base.selectedTemplate;
  resume.documentFormat = normalizeDocumentFormat(raw.documentFormat || base.documentFormat);
  resume.completion = Number.isFinite(Number(raw.completion)) ? Number(raw.completion) : calculateCompletion(resume);
  if (Number.isFinite(Number(raw.atsScore))) resume.atsScore = Number(raw.atsScore);
  resume.personal = { ...base.personal, ...(raw.personal || {}) };
  resume.workExperience = Array.isArray(raw.workExperience) && raw.workExperience.length ? raw.workExperience : base.workExperience;
  resume.education = Array.isArray(raw.education) && raw.education.length ? raw.education : base.education;
  resume.skills = normalizeTextList(raw.skills);
  resume.languages = normalizeTextList(raw.languages);
  resume.certifications = normalizeTextList(raw.certifications);
  resume.projects = normalizeTextList(raw.projects);
  resume.professionalLinks = normalizeTextList(raw.professionalLinks || raw.links);
  return resume;
}

function loadResumes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(userScopedStorageKey(RESUMES_STORAGE_KEY)) || "[]");
    return Array.isArray(parsed) ? parsed.map(normalizeResume) : [];
  } catch (error) {
    return [];
  }
}

function storeResumes(resumes) {
  try {
    localStorage.setItem(userScopedStorageKey(RESUMES_STORAGE_KEY), JSON.stringify(resumes.map(normalizeResume)));
  } catch (error) {
    // The UI still works for the current session if storage is blocked.
  }
}

function findResume(id) {
  return loadResumes().find((resume) => resume.id === id) || null;
}

function upsertResume(resume) {
  const normalized = normalizeResume(resume);
  const resumes = loadResumes();
  const index = resumes.findIndex((item) => item.id === normalized.id);
  if (index >= 0) resumes[index] = normalized;
  else resumes.unshift(normalized);
  storeResumes(resumes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
  return normalized;
}

function coverLetterLabels() {
  return currentLanguage === "pt" ? {
    title: "Cartas de Apresentação",
    intro: "Crie cartas personalizadas para acompanhar seu currículo.",
    emptyTitle: "Nenhuma carta de apresentação ainda",
    emptyText: "Crie uma carta personalizada para acompanhar seu currículo e fortalecer sua candidatura.",
    new: "Criar nova carta",
    builderTitle: "Criar carta de apresentação",
    editBuilderTitle: "Editar carta de apresentação",
    dashboardNew: "Criar nova carta",
    selectResume: "Usar dados de um currículo",
    noResumeOption: "Selecionar currículo",
    fields: {
      title: "Título da carta",
      role: "Cargo desejado",
      company: "Empresa",
      recruiter: "Nome do recrutador, opcional",
      tone: "Tom da carta",
      jobDescription: "Descrição da vaga",
      strengths: "Pontos fortes",
      experience: "Experiência principal",
      candidateName: "Nome do candidato",
      email: "E-mail",
      phone: "Telefone",
      location: "Localização",
      body: "Texto da carta",
    },
    tones: ["Profissional", "Formal", "Direto", "Confiante", "Entusiasmado"],
    actions: {
      generate: "Gerar carta",
      save: "Salvar carta",
      preview: "Visualizar",
      download: "Baixar PDF",
      edit: "Editar",
      duplicate: "Duplicar",
      delete: "Excluir",
      close: "Fechar",
      cancel: "Cancelar",
      list: "Voltar para cartas",
    },
    tabs: { edit: "Editar", preview: "Prévia" },
    previewTitle: "Prévia da carta",
    saved: "Carta salva com sucesso.",
    unsaved: "Alterações não salvas",
    statusDraft: "Rascunho",
    statusSaved: "Salva",
    lastEdited: "Editada",
    untitled: "Carta sem título",
    copyPrefix: "Cópia de",
    deleteTitle: "Tem certeza que deseja excluir esta carta?",
    deleteText: "Essa ação não pode ser desfeita.",
    limitTitle: "Disponível no Pro",
    limitText: "O plano gratuito permite criar uma carta de apresentação. Faça upgrade para criar cartas ilimitadas.",
    viewPlans: "Ver planos",
    validationBody: "Preencha a descrição da vaga ou os dados principais antes de gerar.",
    validationSave: "Adicione pelo menos um título, cargo, empresa ou texto da carta antes de salvar.",
    generatedFallbackRole: "esta vaga",
    generatedFallbackCompany: "sua empresa",
    greetingTeam: "Prezada equipe de recrutamento,",
    closing: "Atenciosamente,",
    pdfSuccess: "PDF baixado com sucesso.",
    pdfError: "Não foi possível gerar o PDF. Tente novamente.",
    pdfGenerating: "Gerando PDF...",
    freeBranding: "Criado com Succeedora",
  } : {
    title: "Cover Letters",
    intro: "Create tailored cover letters using your resume profile.",
    emptyTitle: "No cover letters yet",
    emptyText: "Create a tailored letter to support your resume and strengthen your application.",
    new: "New cover letter",
    builderTitle: "New cover letter",
    editBuilderTitle: "Edit cover letter",
    dashboardNew: "New cover letter",
    selectResume: "Use data from a resume",
    noResumeOption: "Select resume",
    fields: {
      title: "Letter title",
      role: "Target role",
      company: "Company",
      recruiter: "Recruiter name, optional",
      tone: "Letter tone",
      jobDescription: "Job description",
      strengths: "Strengths",
      experience: "Main experience",
      candidateName: "Candidate name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      body: "Letter body",
    },
    tones: ["Professional", "Formal", "Direct", "Confident", "Enthusiastic"],
    actions: {
      generate: "Generate letter",
      save: "Save letter",
      preview: "Preview",
      download: "Download PDF",
      edit: "Edit",
      duplicate: "Duplicate",
      delete: "Delete",
      close: "Close",
      cancel: "Cancel",
      list: "Back to letters",
    },
    tabs: { edit: "Edit", preview: "Preview" },
    previewTitle: "Cover letter preview",
    saved: "Cover letter saved successfully.",
    unsaved: "Unsaved changes",
    statusDraft: "Draft",
    statusSaved: "Saved",
    lastEdited: "Edited",
    untitled: "Untitled cover letter",
    copyPrefix: "Copy of",
    deleteTitle: "Are you sure you want to delete this cover letter?",
    deleteText: "This action cannot be undone.",
    limitTitle: "Available with Pro",
    limitText: "The free plan includes one cover letter. Upgrade to create unlimited cover letters.",
    viewPlans: "View plans",
    validationBody: "Add the job description or key details before generating.",
    validationSave: "Add at least a title, role, company, or letter body before saving.",
    generatedFallbackRole: "this role",
    generatedFallbackCompany: "your company",
    greetingTeam: "Dear hiring team,",
    closing: "Sincerely,",
    pdfSuccess: "PDF downloaded successfully.",
    pdfError: "Could not generate the PDF. Please try again.",
    pdfGenerating: "Generating PDF...",
    freeBranding: "Created with Succeedora",
  };
}

function newCoverLetterId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `cover-letter-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function resumeProfileForCoverLetter(resume) {
  const personal = resume?.personal || {};
  const firstExperience = resume?.workExperience?.[0] || {};
  const professionalTitle = personal.title || firstExperience.role || "";
  const experienceSummary = resume?.summary
    || linesFromValue(firstExperience.achievements || "").slice(0, 2).join(" ")
    || [firstExperience.role, firstExperience.company].filter(Boolean).join(" at ");
  const title = professionalTitle
    ? (currentLanguage === "pt" ? `Carta para ${professionalTitle}` : `Letter for ${professionalTitle}`)
    : "";
  return {
    title,
    targetRole: professionalTitle,
    candidateName: personal.fullName || [personal.firstName, personal.lastName].filter(Boolean).join(" "),
    email: personal.email || "",
    phone: personal.phone || "",
    location: resumeContactLocation(personal),
    strengths: normalizeTextList(resume?.skills).slice(0, 6).join(", "),
    experience: experienceSummary || "",
  };
}

function createBlankCoverLetter(overrides = {}) {
  const now = isoNow();
  const profile = loadProfile();
  const labels = coverLetterLabels();
  return {
    id: overrides.id || newCoverLetterId(),
    title: overrides.title || labels.untitled,
    targetRole: "",
    company: "",
    recruiter: "",
    tone: labels.tones[0],
    jobDescription: "",
    strengths: "",
    experience: "",
    candidateName: profile.fullName || "",
    email: profile.email || "",
    phone: "",
    location: profile.location || "",
    body: "",
    resumeId: "",
    ownerEmail: getAuthEmail(),
    status: "draft",
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

function normalizeCoverLetter(raw = {}) {
  raw = raw && typeof raw === "object" ? raw : {};
  const base = createBlankCoverLetter({ id: raw.id || newCoverLetterId() });
  return {
    ...base,
    ...raw,
    title: String(raw.title || base.title),
    targetRole: String(raw.targetRole || raw.role || base.targetRole),
    company: String(raw.company || base.company),
    recruiter: String(raw.recruiter || base.recruiter),
    tone: String(raw.tone || base.tone),
    jobDescription: String(raw.jobDescription || raw.job || base.jobDescription),
    strengths: String(raw.strengths || base.strengths),
    experience: String(raw.experience || base.experience),
    candidateName: String(raw.candidateName || raw.name || base.candidateName),
    email: String(raw.email || base.email),
    phone: String(raw.phone || base.phone),
    location: String(raw.location || base.location),
    body: String(raw.body || base.body),
    resumeId: String(raw.resumeId || base.resumeId),
    ownerEmail: String(raw.ownerEmail || getAuthEmail() || ""),
    status: raw.status === "saved" ? "saved" : "draft",
    createdAt: raw.createdAt || base.createdAt,
    updatedAt: raw.updatedAt || base.updatedAt,
  };
}

function coverLetterHasUserContent(letter) {
  const labels = coverLetterLabels();
  const title = String(letter?.title || "").trim();
  return Boolean(
    (title && title !== labels.untitled)
    || String(letter?.targetRole || "").trim()
    || String(letter?.company || "").trim()
    || String(letter?.body || "").trim()
  );
}

function loadCoverLetters() {
  try {
    const ownerEmail = getAuthEmail();
    return loadStoredCoverLetters()
      .filter((letter) => !ownerEmail || !letter.ownerEmail || letter.ownerEmail === ownerEmail);
  } catch (error) {
    return [];
  }
}

function loadStoredCoverLetters() {
  try {
    const parsed = JSON.parse(localStorage.getItem(userScopedStorageKey(COVER_LETTERS_STORAGE_KEY)) || "[]");
    return Array.isArray(parsed) ? parsed.map(normalizeCoverLetter) : [];
  } catch (error) {
    return [];
  }
}

function storeCoverLetters(letters) {
  try {
    const ownerEmail = getAuthEmail();
    const incoming = letters.map((letter) => normalizeCoverLetter({ ...letter, ownerEmail: letter.ownerEmail || ownerEmail }));
    const incomingIds = new Set(incoming.map((letter) => letter.id));
    const preserved = loadStoredCoverLetters().filter((letter) => {
      if (incomingIds.has(letter.id)) return false;
      if (!ownerEmail) return false;
      return letter.ownerEmail && letter.ownerEmail !== ownerEmail;
    });
    const sorted = [...incoming, ...preserved].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    localStorage.setItem(userScopedStorageKey(COVER_LETTERS_STORAGE_KEY), JSON.stringify(sorted));
  } catch (error) {
    // Local storage is a convenience in the prototype.
  }
}

function findCoverLetter(id) {
  return loadCoverLetters().find((letter) => letter.id === id) || null;
}

function upsertCoverLetter(letter) {
  const normalized = normalizeCoverLetter({ ...letter, ownerEmail: getAuthEmail(), status: "saved", updatedAt: isoNow() });
  const letters = loadCoverLetters();
  const index = letters.findIndex((item) => item.id === normalized.id);
  if (index >= 0) letters[index] = normalized;
  else letters.unshift(normalized);
  storeCoverLetters(letters.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
  return normalized;
}

function startNewCoverLetter() {
  if (!isPaidPlan() && loadCoverLetters().length >= 1) {
    const labels = coverLetterLabels();
    openAccessModal({
      title: labels.limitTitle,
      text: labels.limitText,
      actions: [
        { label: labels.viewPlans, onClick: () => setRoute("/dashboard/billing") },
        { label: labels.actions.cancel, className: "secondary-button" },
      ],
    });
    return;
  }
  currentCoverLetterId = null;
  coverLetterDraft = createBlankCoverLetter();
  coverLetterSaveMessage = "";
  coverLetterBuilderOpen = true;
  routes["/dashboard/cover-letters"]();
}

function loadCoverLetterIntoBuilder(id) {
  const letter = findCoverLetter(id);
  if (!letter) return;
  currentCoverLetterId = letter.id;
  coverLetterDraft = normalizeCoverLetter(letter);
  coverLetterSaveMessage = "";
  coverLetterBuilderOpen = true;
  routes["/dashboard/cover-letters"]();
}

function updateCoverLetterDraftFromForm(options = {}) {
  const markDirty = options.markDirty !== false;
  if (!coverLetterDraft) coverLetterDraft = createBlankCoverLetter({ id: currentCoverLetterId || undefined });
  document.querySelectorAll("[data-letter-field]").forEach((field) => {
    const key = field.getAttribute("data-letter-field");
    if (key) coverLetterDraft[key] = field.value;
  });
  if (markDirty) {
    coverLetterDraft.updatedAt = isoNow();
    coverLetterDraft.status = "draft";
  }
  return coverLetterDraft;
}

function applyResumeToCoverLetterDraft(resumeId) {
  const resume = findResume(resumeId);
  if (!resume) return;
  const profile = resumeProfileForCoverLetter(resume);
  const current = coverLetterDraft || createBlankCoverLetter();
  const labels = coverLetterLabels();
  coverLetterDraft = normalizeCoverLetter({
    ...current,
    title: current.title && current.title !== labels.untitled ? current.title : profile.title,
    targetRole: current.targetRole || profile.targetRole,
    candidateName: profile.candidateName || current.candidateName,
    email: profile.email || current.email,
    phone: profile.phone || current.phone,
    location: profile.location || current.location,
    strengths: profile.strengths || current.strengths,
    experience: profile.experience || current.experience,
    resumeId,
    status: "draft",
    updatedAt: isoNow(),
  });
  routes["/dashboard/cover-letters"]();
}

function generateCoverLetterBody(letter) {
  const labels = coverLetterLabels();
  const role = letter.targetRole || labels.generatedFallbackRole;
  const company = letter.company || labels.generatedFallbackCompany;
  const toneIndex = Math.max(0, labels.tones.indexOf(letter.tone));
  const greeting = letter.recruiter
    ? (currentLanguage === "pt" ? `Prezada(o) ${letter.recruiter},` : `Dear ${letter.recruiter},`)
    : labels.greetingTeam;
  const strengths = letter.strengths || (currentLanguage === "pt" ? "boa comunicação, organização e foco em resultados" : "clear communication, organization, and a results-focused mindset");
  const experience = letter.experience || (currentLanguage === "pt" ? "experiências anteriores relevantes para a função" : "previous experience relevant to the role");
  const introVerb = currentLanguage === "pt"
    ? ["Tenho interesse", "Venho manifestar meu interesse", "Quero me candidatar", "Tenho forte interesse", "Estou entusiasmado(a)"][toneIndex] || "Tenho interesse"
    : ["I am interested", "I am writing to express my interest", "I am applying", "I am confident in my fit", "I am excited to apply"][toneIndex] || "I am interested";
  const impactPhrase = currentLanguage === "pt"
    ? ["soluções claras, colaborativas e orientadas a impacto", "entregas consistentes, criteriosas e alinhadas aos objetivos da organização", "execução objetiva, comunicação clara e foco no que gera resultado", "resultados consistentes, autonomia e contribuições relevantes", "energia, colaboração e compromisso com resultados de qualidade"][toneIndex] || "soluções claras, colaborativas e orientadas a impacto"
    : ["clear execution, collaboration, and measurable impact", "careful execution, professional judgment, and alignment with business goals", "direct execution, clear communication, and practical results", "consistent results, ownership, and meaningful contribution", "energy, collaboration, and a strong commitment to quality outcomes"][toneIndex] || "clear execution, collaboration, and measurable impact";
  const jobReference = letter.jobDescription
    ? (currentLanguage === "pt" ? "Ao analisar a descrição da vaga, identifiquei uma forte conexão entre os requisitos da posição e minha trajetória." : "After reviewing the job description, I see a strong connection between the role requirements and my background.")
    : (currentLanguage === "pt" ? "Acredito que meu perfil pode contribuir de forma consistente para os objetivos da equipe." : "I believe my background can contribute meaningfully to the team's goals.");

  if (currentLanguage === "pt") {
    return [
      greeting,
      "",
      `${introVerb} na oportunidade de ${role} na ${company}. ${jobReference}`,
      "",
      `Meus principais pontos fortes incluem ${strengths}. Na minha trajetória, desenvolvi ${experience}, sempre buscando entregar ${impactPhrase}.`,
      "",
      `Gostaria de conversar sobre como posso contribuir para a ${company} e apoiar os próximos desafios da equipe.`,
      "",
      labels.closing,
      letter.candidateName || "",
    ].join("\n");
  }

  return [
    greeting,
    "",
    `${introVerb} for the ${role} opportunity at ${company}. ${jobReference}`,
    "",
    `My key strengths include ${strengths}. Across my work, I have developed ${experience}, with a focus on ${impactPhrase}.`,
    "",
    `I would welcome the opportunity to discuss how I can contribute to ${company} and support the team's next goals.`,
    "",
    labels.closing,
    letter.candidateName || "",
  ].join("\n");
}

function coverLetterParagraphs(body) {
  return String(body || "").split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
}

function coverLetterDocument(letter, options = {}) {
  const normalized = normalizeCoverLetter(letter);
  const labels = coverLetterLabels();
  const contacts = [normalized.location, normalized.email, normalized.phone].map((item) => String(item || "").trim()).filter(Boolean);
  const date = new Intl.DateTimeFormat(currentLanguage === "pt" ? "pt-BR" : "en-US", { dateStyle: "long" }).format(new Date(normalized.updatedAt || Date.now()));
  const body = normalized.body || (currentLanguage === "pt"
    ? "Gere ou escreva sua carta para visualizar o documento final."
    : "Generate or write your letter to preview the final document.");
  return `
    <article class="cover-letter-document ${options.forExport ? "cover-letter-document-export" : ""}">
      <header class="cover-letter-doc-header">
        <h2>${escapeHtml(normalized.candidateName || labels.fields.candidateName)}</h2>
        ${contacts.length ? `<p>${contacts.map(escapeHtml).join(" | ")}</p>` : ""}
      </header>
      <div class="cover-letter-doc-meta">
        <p>${escapeHtml(date)}</p>
        ${normalized.company || normalized.recruiter || normalized.targetRole ? `<p>${[normalized.recruiter, normalized.company, normalized.targetRole].map((item) => String(item || "").trim()).filter(Boolean).map(escapeHtml).join("<br>")}</p>` : ""}
      </div>
      <div class="cover-letter-doc-body">
        ${coverLetterParagraphs(body).map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`).join("")}
      </div>
      ${options.branding ? `<footer class="cover-letter-brand-footer">${escapeHtml(labels.freeBranding)}</footer>` : ""}
    </article>
  `;
}

function coverLetterFilename(letter) {
  const title = String(letter?.title || letter?.targetRole || "cover-letter").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${currentLanguage === "pt" ? "carta" : "cover-letter"}-${title || "succeedora"}.pdf`;
}

function calculateCompletion(resume) {
  const checks = [
    resume.personal?.fullName,
    resume.personal?.title,
    resume.personal?.email,
    resume.summary,
    resume.workExperience?.[0]?.company || resume.workExperience?.[0]?.role,
    resume.workExperience?.[0]?.achievements?.length,
    resume.education?.[0]?.school || resume.education?.[0]?.degree,
    resume.skills?.length,
    resume.languages?.length,
    resume.professionalLinks?.length,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

function nextResumeAction(resume) {
  const missing = resumeLabels().suggestedMissing;
  if (!resume.personal?.fullName || !resume.personal?.email) return missing.personal;
  if (!resume.summary) return missing.summary;
  if (!resume.workExperience?.[0]?.company && !resume.workExperience?.[0]?.role) return missing.experience;
  if (!resume.skills?.length) return missing.skills;
  return missing.ready;
}

function startNewResume(template = selectedTemplateKey) {
  currentBuilderResumeId = null;
  pendingTemplateChangeDraft = null;
  const usableTemplate = availableTemplateKey(template || selectedTemplateKey);
  builderDraft = createBlankResume({ selectedTemplate: usableTemplate, documentFormat: defaultDocumentFormat() });
  selectedTemplateKey = builderDraft.selectedTemplate;
  selectedDocumentFormat = builderDraft.documentFormat;
  builderSaveState = "unsaved";
  activeBuilderSectionIndex = 0;
}

function useTemplateForBuilder(templateKey) {
  selectedTemplateKey = availableTemplateKey(templateKey || selectedTemplateKey);
  if (pendingTemplateChangeDraft) {
    builderDraft = normalizeResume({ ...pendingTemplateChangeDraft, selectedTemplate: selectedTemplateKey, updatedAt: isoNow() });
    currentBuilderResumeId = builderDraft.id;
    selectedDocumentFormat = builderDraft.documentFormat;
    builderSaveState = "unsaved";
    pendingTemplateChangeDraft = null;
    activeBuilderSectionIndex = 0;
    return;
  }
  startNewResume(selectedTemplateKey);
}

function loadResumeIntoBuilder(id) {
  const resume = findResume(id);
  if (!resume) {
    startNewResume();
    return;
  }
  currentBuilderResumeId = resume.id;
  pendingTemplateChangeDraft = null;
  builderDraft = normalizeResume(resume);
  selectedTemplateKey = builderDraft.selectedTemplate;
  selectedDocumentFormat = builderDraft.documentFormat;
  builderSaveState = "saved";
  activeBuilderSectionIndex = 0;
}

function ensureBuilderDraft() {
  if (!builderDraft) startNewResume(selectedTemplateKey);
  selectedTemplateKey = builderDraft.selectedTemplate;
  selectedDocumentFormat = builderDraft.documentFormat;
  return builderDraft;
}

function fieldValue(name, fallback = "") {
  const fields = Array.from(document.querySelectorAll(`[data-resume-field="${name}"]`));
  const filled = fields.map((field) => field.value.trim()).filter(Boolean);
  return filled.length ? filled[filled.length - 1] : fallback || "";
}

function collectBuilderResume() {
  const draft = ensureBuilderDraft();
  const draftPersonal = draft.personal || {};
  const firstName = fieldValue("firstName", draftPersonal.firstName || "");
  const lastName = fieldValue("lastName", draftPersonal.lastName || "");
  const fullName = fieldValue("fullName", draftPersonal.fullName || [firstName, lastName].filter(Boolean).join(" "));
  const city = fieldValue("city", draftPersonal.city || "");
  const state = fieldValue("state", draftPersonal.state || "");
  const postalCode = fieldValue("postalCode", draftPersonal.postalCode || "");
  const location = fieldValue("location", "") || [city, state, postalCode].filter(Boolean).join(", ") || draftPersonal.location || "";
  const title = fullName || fieldValue("title", draftPersonal.title || "") || draft.title || resumeLabels().untitled;
  const resume = normalizeResume({
    ...draft,
    id: draft.id || currentBuilderResumeId || newResumeId(),
    title,
    selectedTemplate: selectedTemplateKey,
    documentFormat: selectedDocumentFormat,
    updatedAt: isoNow(),
    personal: {
      firstName,
      lastName,
      fullName,
      title: fieldValue("title", draftPersonal.title || ""),
      email: fieldValue("email", draftPersonal.email || ""),
      phone: fieldValue("phone", draftPersonal.phone || ""),
      address: fieldValue("address", draftPersonal.address || ""),
      city,
      state,
      postalCode,
      location,
      links: draftPersonal.links || "",
    },
    summary: fieldValue("summary", draft.summary || ""),
    workExperience: [{
      company: fieldValue("experienceCompany", draft.workExperience?.[0]?.company || ""),
      role: fieldValue("experienceRole", draft.workExperience?.[0]?.role || ""),
      period: fieldValue("experiencePeriod", draft.workExperience?.[0]?.period || ""),
      location: fieldValue("experienceLocation", draft.workExperience?.[0]?.location || ""),
      achievements: linesFromValue(fieldValue("experience", (draft.workExperience?.[0]?.achievements || []).join("\n"))),
    }],
    education: [{ school: fieldValue("educationSchool", draft.education?.[0]?.school || ""), degree: fieldValue("educationDegree", draft.education?.[0]?.degree || "") }],
    skills: normalizeTextList(fieldValue("skills", (draft.skills || []).join(", "))),
    languages: normalizeTextList(fieldValue("languages", (draft.languages || []).join("\n"))),
    certifications: normalizeTextList(fieldValue("certifications", (draft.certifications || []).join("\n"))),
    projects: normalizeTextList(fieldValue("projects", (draft.projects || []).join("\n"))),
    professionalLinks: normalizeTextList(fieldValue("links", (draft.professionalLinks || []).join("\n"))),
  });
  resume.completion = calculateCompletion(resume);
  return resume;
}

function setSaveState(state, message = "") {
  builderSaveState = state;
  const stateEl = document.querySelector("[data-save-state]");
  if (!stateEl) return;
  stateEl.dataset.state = state;
  stateEl.querySelectorAll("[data-save-label]").forEach((item) => {
    item.hidden = item.getAttribute("data-save-label") !== state;
  });
  const messageEl = stateEl.querySelector("[data-save-message]");
  if (messageEl) messageEl.textContent = message;
}

function saveCurrentResume(showSuccess = false) {
  const resume = collectBuilderResume();
  const existing = findResume(resume.id);
  resume.createdAt = existing?.createdAt || resume.createdAt || isoNow();
  resume.updatedAt = isoNow();
  resume.completion = calculateCompletion(resume);
  const saved = upsertResume(resume);
  builderDraft = saved;
  currentBuilderResumeId = saved.id;
  selectedTemplateKey = saved.selectedTemplate;
  selectedDocumentFormat = saved.documentFormat;
  setDocumentFormat(saved.documentFormat);
  setSaveState("saved", showSuccess ? resumeLabels().savedSuccess : "");
  updateBuilderProgress(saved);
  updateBuilderSectionNav(saved);
  return saved;
}

function scheduleAutoSave() {
  setSaveState("unsaved");
  if (autoSaveTimer) window.clearTimeout(autoSaveTimer);
  autoSaveTimer = window.setTimeout(() => {
    setSaveState("saving");
    window.setTimeout(() => saveCurrentResume(false), 350);
  }, 900);
}

function updateBuilderProgress(resume = collectBuilderResume()) {
  const completion = calculateCompletion(resume);
  document.querySelectorAll("[data-completion-value]").forEach((item) => {
    item.textContent = `${completion}%`;
  });
  document.querySelectorAll("[data-completion-bar]").forEach((item) => {
    item.style.width = `${completion}%`;
  });
}

function applyResumeToFields(resume) {
  const values = {
    fullName: resume.personal?.fullName,
    title: resume.personal?.title,
    email: resume.personal?.email,
    phone: resume.personal?.phone,
    location: resume.personal?.location,
    links: resume.professionalLinks?.join("\n") || resume.personal?.links,
    summary: resume.summary,
    experienceCompany: resume.workExperience?.[0]?.company,
    experienceRole: resume.workExperience?.[0]?.role,
    experiencePeriod: resume.workExperience?.[0]?.period,
    experienceLocation: resume.workExperience?.[0]?.location,
    experience: resume.workExperience?.[0]?.achievements?.join("\n"),
    educationSchool: resume.education?.[0]?.school,
    educationDegree: resume.education?.[0]?.degree,
    skills: resume.skills?.join(", "),
    languages: resume.languages?.join("\n"),
    certifications: resume.certifications?.join("\n"),
    projects: resume.projects?.join("\n"),
  };
  Object.entries(values).forEach(([name, value]) => {
    const field = document.querySelector(`[data-resume-field="${name}"]`);
    if (field) field.value = value || "";
  });
}

function pageWidthForFormat(format) {
  return documentPageSpec(format).widthPx;
}

function pageHeightForFormat(format) {
  return documentPageSpec(format).heightPx;
}

function updateResumePreviewScales(root = document) {
  root.querySelectorAll(".resume-document-shell").forEach((shell) => {
    if (shell.closest(".resume-thumbnail")) {
      shell.removeAttribute("data-preview-scaled");
      shell.style.removeProperty("--preview-scale");
      shell.style.removeProperty("--resume-page-width");
      shell.style.removeProperty("--resume-page-height");
      shell.style.removeProperty("--scaled-page-width");
      shell.style.removeProperty("--scaled-page-height");
      return;
    }
    const format = shell.getAttribute("data-document-format-current") || selectedDocumentFormat;
    const pageWidth = pageWidthForFormat(format);
    const pageHeight = pageHeightForFormat(format);
    const container = shell.closest(".builder-preview-frame, .template-preview-content") || shell.parentElement;
    if (!container) return;
    const styles = window.getComputedStyle(container);
    const horizontalPadding = parseFloat(styles.paddingLeft || "0") + parseFloat(styles.paddingRight || "0");
    const isBuilderFrame = container.classList.contains("builder-preview-frame");
    const scrollbarAllowance = isBuilderFrame ? 18 : 0;
    const availableWidth = Math.max(1, container.clientWidth - horizontalPadding - scrollbarAllowance);
    const maxScale = shell.closest(".template-preview-content") ? 1.08 : 1;
    const scale = Math.max(0.05, Math.min(maxScale, availableWidth / pageWidth));
    shell.dataset.previewScaled = "true";
    shell.style.setProperty("--resume-page-width", `${pageWidth}px`);
    shell.style.setProperty("--resume-page-height", `${pageHeight}px`);
    shell.style.setProperty("--preview-scale", scale.toFixed(4));
    shell.style.setProperty("--scaled-page-width", `${(pageWidth * scale).toFixed(2)}px`);
    shell.style.setProperty("--scaled-page-height", `${(pageHeight * scale).toFixed(2)}px`);
  });
}

function updateBuilderLivePreview() {
  const frame = document.querySelector(".builder-preview-frame");
  if (!frame) return;
  const resume = collectBuilderResume();
  builderDraft = {
    ...resume,
    createdAt: builderDraft?.createdAt || resume.createdAt,
  };
  frame.innerHTML = resumeDocument(selectedTemplateKey, selectedDocumentFormat, resume);
  updateResumePreviewScales(frame);
}

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (["light", "dark", "system"].includes(saved)) return saved;
  } catch (error) {
    // Local storage can be unavailable in strict privacy contexts.
  }
  return "system";
}

function systemPrefersDark() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolvedTheme() {
  return selectedTheme === "system" ? (systemPrefersDark() ? "dark" : "light") : selectedTheme;
}

function applyTheme() {
  const resolved = resolvedTheme();
  document.documentElement.dataset.theme = resolved;
  document.documentElement.dataset.themePreference = selectedTheme;
}

function setThemePreference(theme) {
  selectedTheme = ["light", "dark", "system"].includes(theme) ? theme : "system";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
  } catch (error) {
    // Theme still applies for the current session.
  }
  applyTheme();
}

function setLanguagePreference(language, options = {}) {
  const nextLanguage = language === "pt" ? "pt" : "en";
  const keepFormat = hasSavedDocumentFormat();
  currentLanguage = nextLanguage;
  if (!keepFormat) selectedDocumentFormat = defaultDocumentFormat();
  try {
    localStorage.setItem(LANG_STORAGE_KEY, currentLanguage);
  } catch (error) {
    // Preference still applies for the current session.
  }
  const account = currentAccount();
  if (account) {
    const profile = loadProfile();
    saveProfileDetailed({ ...profile, preferredLanguage: currentLanguage });
  }
  const activeBlogRoute = pathBlogRoute() || window.location.hash.replace("#", "");
  if (activeBlogRoute.startsWith("/blog/")) {
    const slug = activeBlogRoute.replace("/blog/", "");
    const translatedSlug = equivalentBlogSlug(slug, currentLanguage);
    if (translatedSlug && translatedSlug !== slug && shouldUseLocalizedPath()) {
      window.history.replaceState(null, "", `/blog/${translatedSlug}`);
    } else if (translatedSlug && translatedSlug !== slug) {
      window.location.hash = `/blog/${translatedSlug}`;
    }
  }
  if (options.updatePath !== false) syncPathWithLanguage(currentLanguage);
  if (options.renderAfter !== false) render();
}

function themeToggle() {
  const copy = t();
  const isDark = resolvedTheme() === "dark";
  const label = copy.settings.themePreference || copy.dashboard.theme;
  return `<button class="icon-button theme-toggle" type="button" data-theme-toggle aria-label="${label}" title="${label}">${icon(isDark ? "sun" : "moon")}</button>`;
}

function resumeTemplates() {
  const localizedNames = {
    pt: {
      modern: "Moderno",
      minimal: "Minimalista",
      executive: "Executivo",
      creative: "Criativo",
      student: "Estudante",
      international: "Internacional",
      classic: "Clássico",
      corporate: "Corporativo",
      tech: "Tech",
      "simple-ats": "ATS simples",
      elegant: "Elegante",
      "first-job": "Primeiro emprego",
    },
  };
  return RESUME_TEMPLATES.map((template) => ({
    ...template,
    name: template.names?.[currentLanguage] || localizedNames[currentLanguage]?.[template.key] || template.name,
    description: template.descriptions[currentLanguage],
    bestForText: template.bestFor[currentLanguage],
  }));
}

function getTemplateByKey(key) {
  return resumeTemplates().find((template) => template.key === key) || resumeTemplates()[0];
}

function sampleResumeData() {
  if (currentLanguage === "pt") {
    return {
      name: "Amanda Silva",
      role: "Product Manager",
      location: "São Paulo, Brasil",
      email: "amanda.silva@email.com",
      phone: "+55 11 90000-0000",
      summary: "Product Manager com experiência em produtos digitais, pesquisa com usuários, times ágeis e decisões orientadas por dados. Forte atuação em jornadas de usuário, priorização de roadmap e alinhamento entre objetivos de negócio e estratégia de produto.",
      experiences: [
        ["Product Manager", "NovaTech Solutions", "2021 - Presente", ["Liderou iniciativas de descoberta para melhorar onboarding e ativação.", "Trabalhou com design, engenharia e marketing para lançar novas funcionalidades.", "Usou dados e feedback de clientes para priorizar decisões de roadmap."]],
        ["Analista de Marketing", "Bright Media", "2018 - 2021", ["Criou relatórios de performance para campanhas digitais.", "Melhorou fluxos de geração de leads com times de vendas e marketing.", "Apoiou estratégias de conteúdo e posicionamento para novas campanhas."]],
      ],
      education: ["Bacharelado em Administração", "Universidade de São Paulo", "2014 - 2018"],
      skills: ["Estratégia de Produto", "Pesquisa com Usuários", "Agile", "Roadmap", "Analytics", "Comunicação", "Liderança"],
      languages: ["Português nativo", "Inglês avançado", "Espanhol intermediário"],
      certifications: ["Fundamentos de Product Management", "Certificação Google Analytics"],
      projects: [["Melhoria de onboarding de clientes", "Aumentou a ativação com fluxos de onboarding mais claros e melhor comunicação de produto."]],
      links: ["linkedin.com/in/amanda-silva", "amandasilva.com"],
    };
  }
  return {
    name: "Amanda Silva",
    role: "Product Manager",
    location: currentLanguage === "pt" ? "São Paulo, Brasil" : "São Paulo, Brazil",
    email: "amanda.silva@email.com",
    phone: "+55 11 90000-0000",
    summary: "Product Manager with experience in digital products, user research, agile teams and data-driven decision making. Skilled at improving user journeys, prioritizing roadmaps and aligning business goals with product strategy.",
    experiences: [
      ["Product Manager", "NovaTech Solutions", "2021 - Present", ["Led product discovery initiatives to improve onboarding and user activation.", "Worked with design, engineering and marketing teams to launch new product features.", "Used analytics and customer feedback to prioritize roadmap decisions."]],
      ["Marketing Analyst", "Bright Media", "2018 - 2021", ["Created performance reports for digital campaigns.", "Improved lead generation workflows with sales and marketing teams.", "Supported content and positioning strategies for new campaigns."]],
    ],
    education: ["Bachelor's Degree in Business Administration", "University of São Paulo", "2014 - 2018"],
    skills: ["Product Strategy", "User Research", "Agile", "Roadmap Planning", "Analytics", "Communication", "Leadership"],
    languages: ["Portuguese Native", "English Advanced", "Spanish Intermediate"],
    certifications: ["Product Management Fundamentals", "Google Analytics Certification"],
    projects: [["Customer onboarding improvement project", "Increased activation through better onboarding flows and clearer product communication."]],
    links: ["linkedin.com/in/amanda-silva", "amandasilva.com"],
  };
}

function icon(name, cls = "") {
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPaths[name] || iconPaths.file}"></path></svg>`;
}

function brandMark() {
  const gradientId = `brandGradient-${brandMarkId += 1}`;
  const glowId = `brandGlow-${brandMarkId}`;
  return `
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48" role="img" focusable="false">
        <defs>
          <linearGradient id="${gradientId}" x1="10" y1="8" x2="39" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#8ee8f7"></stop>
            <stop offset="0.46" stop-color="#2d74df"></stop>
            <stop offset="1" stop-color="#a88bff"></stop>
          </linearGradient>
          <radialGradient id="${glowId}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(35 13) rotate(130) scale(31)">
            <stop stop-color="#69d8f2" stop-opacity="0.34"></stop>
            <stop offset="1" stop-color="#0b1736" stop-opacity="0"></stop>
          </radialGradient>
        </defs>
        <rect x="3.5" y="3.5" width="41" height="41" rx="14" fill="#081632"></rect>
        <rect x="3.5" y="3.5" width="41" height="41" rx="14" fill="url(#${glowId})"></rect>
        <rect x="4.25" y="4.25" width="39.5" height="39.5" rx="13.25" fill="none" stroke="rgba(255,255,255,.16)" stroke-width="1.5"></rect>
        <path d="M32.7 15.2c-2.2-2.4-6.4-3.4-10.1-2.5-4.1 1-6.5 3.4-6.4 6.2.1 3.5 3.9 4.8 8.1 5.5 4.6.8 7.5 1.9 7.2 5-.3 3.5-4.2 5.7-8.9 5.3-3.8-.3-7.1-1.9-9-4.3" fill="none" stroke="url(#${gradientId})" stroke-width="4.2" stroke-linecap="round"></path>
        <path d="M29.8 12.4h5.7v5.7" fill="none" stroke="#8ee8f7" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M28.9 19l6.2-6.2" fill="none" stroke="#8ee8f7" stroke-width="2.6" stroke-linecap="round"></path>
        <path d="M15 37.1h18.5" fill="none" stroke="rgba(255,255,255,.58)" stroke-width="2.1" stroke-linecap="round"></path>
        <path d="M19.2 30.8h8.4" fill="none" stroke="rgba(142,232,247,.45)" stroke-width="1.7" stroke-linecap="round"></path>
      </svg>
    </span>
  `;
}

function brandLogo(tag = "a", href = "#/", route = "/") {
  const attrs = tag === "a" ? `href="${href}" data-route="${route}" aria-label="Succeedora home"` : "";
  return `<${tag} class="brand" ${attrs}>${brandMark()}<span class="brand-word">Succeedora</span></${tag}>`;
}

function localizedRoot(language = currentLanguage) {
  return language === "pt" ? "/pt" : "/en";
}

function shouldUseLocalizedPath() {
  return window.location.protocol === "http:" || window.location.protocol === "https:";
}

function normalizeLanguagePath(replace = true) {
  if (!shouldUseLocalizedPath()) return;
  if (pathBlogRoute()) return;
  if (window.location.pathname !== "/" && pathStaticRoute()) return;
  const routed = pathLanguage();
  if (routed) {
    currentLanguage = routed;
    return;
  }
  const target = localizedRoot(preferredDetectedLanguage());
  const next = `${target}${window.location.search}${window.location.hash}`;
  if (replace) window.history.replaceState(null, "", next);
  else window.location.assign(next);
}

function syncPathWithLanguage(language = currentLanguage) {
  if (!shouldUseLocalizedPath()) return;
  const root = localizedRoot(language);
  if (window.location.pathname === root) return;
  if (pathLanguage()) {
    window.history.replaceState(null, "", `${root}${window.location.search}${window.location.hash}`);
  }
}

function setRoute(path) {
  if (path === "/dashboard/builder") rememberBuilderReturnRoute();
  if (path === "/blog" || path.startsWith("/blog/")) {
    if (shouldUseLocalizedPath()) {
      window.history.pushState(null, "", path);
      render();
      return;
    }
  }
  if (path === "/" || path === "/pt" || path === "/en") {
    const language = path === "/pt" ? "pt" : path === "/en" ? "en" : currentLanguage;
    if (path === "/pt" || path === "/en") setLanguagePreference(language, { renderAfter: false, updatePath: false });
    if (shouldUseLocalizedPath()) {
      window.history.pushState(null, "", localizedRoot(language));
      render();
      return;
    }
  }
  if (PUBLIC_CLEAN_ROUTES.has(path) && shouldUseLocalizedPath()) {
    window.history.pushState(null, "", path);
    render();
    return;
  }
  if (pathBlogRoute() && shouldUseLocalizedPath()) {
    window.history.pushState(null, "", localizedRoot(currentLanguage));
  }
  const target = `#${path}`;
  if (window.location.hash === target) {
    render();
    return;
  }
  window.location.hash = path;
}

function getRoute() {
  const hash = window.location.hash.replace("#", "");
  if (hash === "/blog" || hash.startsWith("/blog/")) return hash;
  if (routes[hash]) return hash;
  const cleanBlog = pathBlogRoute();
  if (cleanBlog) return cleanBlog;
  const cleanRoute = pathStaticRoute();
  if (cleanRoute) return cleanRoute;
  if (!hash && pathLanguage()) return pathLanguage() === "pt" ? "/pt" : "/en";
  return routes[hash] ? hash : "/";
}

function pathBlogRoute() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  if (segments[0] !== "blog") return "";
  return segments.length > 1 ? `/blog/${segments[1]}` : "/blog";
}

function pathStaticRoute() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return routes[path] ? path : "";
}

function setMetaLink(rel, href, hreflang = "") {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (hreflang) link.hreflang = hreflang;
    document.head.appendChild(link);
  }
  link.href = href;
}

function setMetaName(name, content) {
  let meta = document.head.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function setMetaProperty(property, content) {
  let meta = document.head.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

function removeMetaName(name) {
  document.head.querySelectorAll(`meta[name="${name}"]`).forEach((meta) => meta.remove());
}

function removeMetaProperty(property) {
  document.head.querySelectorAll(`meta[property="${property}"]`).forEach((meta) => meta.remove());
}

function seoUrl(path = "/") {
  return `${SITE_ORIGIN}${path === "/" ? "/" : path}`;
}

function localizedSeo(key) {
  return SEO_META[key]?.[currentLanguage] || SEO_META[key]?.en || {};
}

function routeShouldNoindex(route = getRoute()) {
  return NOINDEX_ROUTES.has(route) || route.startsWith("/dashboard/");
}

function setHreflangLinks(route, canonical, seo = {}) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
  const alternates = seo.alternates || [];
  if (alternates.length) {
    alternates.forEach(({ hreflang, href }) => setMetaLink("alternate", href, hreflang));
    return;
  }
  if (route === "/" || route === "/pt" || route === "/en") {
    setMetaLink("alternate", seoUrl("/pt"), "pt-BR");
    setMetaLink("alternate", seoUrl("/en"), "en");
    setMetaLink("alternate", seoUrl("/"), "x-default");
  }
}

function updateDocumentLanguage(seo = {}) {
  applyTheme();
  const copy = t();
  const route = getRoute();
  const title = seo.title || copy.metaTitle;
  const metaDescription = seo.description || copy.metaDescription;
  const canonical = seo.canonical || seoUrl(route === "/pt" || route === "/en" ? "/" : route);
  const noindex = typeof seo.noindex === "boolean" ? seo.noindex : routeShouldNoindex(route);
  document.documentElement.lang = currentLanguage === "pt" ? "pt-BR" : "en";
  document.title = title;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", metaDescription);
  else setMetaName("description", metaDescription);
  setMetaName("robots", noindex ? "noindex, nofollow" : "index, follow");
  setMetaLink("canonical", canonical);
  setHreflangLinks(route, canonical, seo);
  setMetaProperty("og:title", seo.ogTitle || title);
  setMetaProperty("og:description", seo.ogDescription || metaDescription);
  setMetaProperty("og:url", canonical);
  setMetaProperty("og:type", seo.type || "website");
  setMetaName("twitter:card", seo.image ? "summary_large_image" : "summary");
  setMetaName("twitter:title", seo.twitterTitle || seo.ogTitle || title);
  setMetaName("twitter:description", seo.twitterDescription || seo.ogDescription || metaDescription);
  if (seo.image) {
    setMetaProperty("og:image", seo.image);
    setMetaName("twitter:image", seo.image);
  } else {
    removeMetaProperty("og:image");
    removeMetaName("twitter:image");
  }
}

function mount(html, seo = {}) {
  updateDocumentLanguage(seo);
  document.getElementById("app").innerHTML = html;
  bindInteractions();
  window.scrollTo({ top: 0, behavior: "auto" });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function loadAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNTS_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map((account) => ({
      id: String(account.id || `user_${Date.now()}`),
      email: normalizeEmail(account.email),
      password: String(account.password || ""),
      plan: ["free", "pro", "premium"].includes(account.plan) ? account.plan : "free",
      createdAt: account.createdAt || isoNow(),
      profile: {
        fullName: String(account.profile?.fullName || account.fullName || "").trim(),
        email: normalizeEmail(account.profile?.email || account.email),
        phone: String(account.profile?.phone || "").trim(),
        location: String(account.profile?.location || "").trim(),
        title: String(account.profile?.title || "").trim(),
        preferredLanguage: account.profile?.preferredLanguage === "pt" ? "pt" : "en",
      },
    })).filter((account) => account.email) : [];
  } catch (error) {
    return [];
  }
}

function saveAccounts(accounts) {
  try {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    return true;
  } catch (error) {
    return false;
  }
}

function findAccountByEmail(email) {
  const normalized = normalizeEmail(email);
  return loadAccounts().find((account) => account.email === normalized) || null;
}

function findAccountById(id) {
  return loadAccounts().find((account) => account.id === id) || null;
}

function currentSession() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY) || "{}");
    if (!parsed || !parsed.userId) return null;
    const account = findAccountById(parsed.userId);
    return account ? { userId: account.id, email: account.email } : null;
  } catch (error) {
    return null;
  }
}

function currentAccount() {
  const session = currentSession();
  return session ? findAccountById(session.userId) : null;
}

function isLoggedIn() {
  return Boolean(currentSession());
}

function userScopedStorageKey(baseKey, account = currentAccount()) {
  if (!account?.id) return baseKey;
  return `succeedora.users.${account.id}.${baseKey.replace(/^succeedora\./, "")}`;
}

function readJsonStorage(key, fallback) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "");
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJsonStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function formatCurrencyBRL(cents = 0) {
  return new Intl.NumberFormat(currentLanguage === "pt" ? "pt-BR" : "en-US", { style: "currency", currency: "BRL" }).format((Number(cents) || 0) / 100);
}

function formatPaymentDate(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat(currentLanguage === "pt" ? "pt-BR" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch (error) {
    return value;
  }
}

function formattedPixKey() {
  const key = paymentConfig.pixKey;
  return `${key.slice(0, 2)}.${key.slice(2, 5)}.${key.slice(5, 8)}/${key.slice(8, 12)}-${key.slice(12)}`;
}

function pixProduct(productType) {
  return PIX_ONE_TIME_PRODUCTS[productType] || null;
}

function localizedPixProduct(productType) {
  const product = pixProduct(productType);
  if (!product) return null;
  return {
    productType,
    productName: product.names[currentLanguage] || product.names.en,
    description: product.descriptions[currentLanguage] || product.descriptions.en,
    amount: product.amount,
    currency: paymentConfig.currency,
  };
}

function paymentStorageKey(account = currentAccount()) {
  return userScopedStorageKey(PAYMENT_REQUESTS_STORAGE_KEY, account);
}

function normalizePaymentRequest(request) {
  const status = ["pending_payment", "pending_manual_confirmation", "approved", "rejected", "cancelled"].includes(request.status || request.paymentStatus) ? (request.status || request.paymentStatus) : "pending_payment";
  return {
    id: String(request.id || `pay_${Date.now().toString(36)}`),
    userId: String(request.userId || ""),
    userEmail: normalizeEmail(request.userEmail || ""),
    productType: String(request.productType || ""),
    productName: String(request.productName || ""),
    amount: Number(request.amount || 0),
    currency: request.currency || paymentConfig.currency,
    paymentMethod: request.paymentMethod === "pix" ? "pix" : "pix",
    pixKey: String(request.pixKey || paymentConfig.pixKey),
    pixPayload: String(request.pixPayload || ""),
    status,
    paymentStatus: status,
    createdAt: request.createdAt || isoNow(),
    confirmedByUserAt: request.confirmedByUserAt || "",
    approvedAt: request.approvedAt || "",
    rejectedAt: request.rejectedAt || "",
  };
}

function loadPaymentRequests() {
  const requests = readJsonStorage(paymentStorageKey(), []);
  return Array.isArray(requests) ? requests.map(normalizePaymentRequest).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
}

function storePaymentRequests(requests) {
  return writeJsonStorage(paymentStorageKey(), requests.map(normalizePaymentRequest));
}

function upsertPaymentRequest(request) {
  const normalized = normalizePaymentRequest(request);
  const requests = loadPaymentRequests();
  const index = requests.findIndex((item) => item.id === normalized.id);
  if (index >= 0) requests[index] = normalized;
  else requests.unshift(normalized);
  storePaymentRequests(requests);
  return normalized;
}

function paymentStatusLabel(status) {
  const labels = t().payments;
  const map = {
    pending_payment: labels.waitingPayment,
    pending_manual_confirmation: labels.waitingConfirmation,
    approved: labels.approved,
    rejected: labels.rejected,
    cancelled: labels.cancelled,
  };
  return map[status] || labels.waitingPayment;
}

function emvField(id, value) {
  const text = String(value || "");
  return `${id}${String(text.length).padStart(2, "0")}${text}`;
}

function pixSafeText(value, maxLength) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 $%*+\-./:]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function crc16Pix(payload) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) : (crc << 1);
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function generatePixPayload({ amount, description, orderId, merchantName = paymentConfig.merchantName, merchantCity = paymentConfig.merchantCity, pixKey = paymentConfig.pixKey }) {
  const txid = pixSafeText(orderId, 12).replace(/\s/g, "") || "***";
  const merchantAccount = emvField("00", "br.gov.bcb.pix") + emvField("01", pixKey);
  const payloadWithoutCrc = [
    emvField("00", "01"),
    emvField("26", merchantAccount),
    emvField("52", "0000"),
    emvField("53", "986"),
    emvField("54", (Number(amount || 0) / 100).toFixed(2)),
    emvField("58", "BR"),
    emvField("59", pixSafeText(merchantName, 25)),
    emvField("60", pixSafeText(merchantCity, 15)),
    emvField("62", emvField("05", txid)),
  ].join("");
  const crcInput = `${payloadWithoutCrc}6304`;
  return `${crcInput}${crc16Pix(crcInput)}`;
}

const QR_ECC_L = [
  null,
  { data: [19], ecc: 7 },
  { data: [34], ecc: 10 },
  { data: [55], ecc: 15 },
  { data: [80], ecc: 20 },
  { data: [108], ecc: 26 },
  { data: [68, 68], ecc: 18 },
];

function qrGfMul(x, y) {
  let z = 0;
  for (let i = 7; i >= 0; i -= 1) {
    z = (z << 1) ^ ((z >>> 7) * 0x11d);
    if (((y >>> i) & 1) !== 0) z ^= x;
  }
  return z & 255;
}

function qrGeneratorPoly(degree) {
  let result = [1];
  let root = 1;
  for (let i = 0; i < degree; i += 1) {
    const next = new Array(result.length + 1).fill(0);
    result.forEach((coef, index) => {
      next[index] ^= qrGfMul(coef, root);
      next[index + 1] ^= coef;
    });
    result = next;
    root = qrGfMul(root, 2);
  }
  return result.slice(0, degree);
}

function qrRemainder(data, degree) {
  const generator = qrGeneratorPoly(degree);
  const result = new Array(degree).fill(0);
  data.forEach((byte) => {
    const factor = byte ^ result.shift();
    result.push(0);
    generator.forEach((coef, index) => {
      result[index] ^= qrGfMul(coef, factor);
    });
  });
  return result;
}

function qrAppendBits(bits, value, length) {
  for (let i = length - 1; i >= 0; i -= 1) bits.push((value >>> i) & 1);
}

function qrDataCodewords(text, version) {
  const bytes = Array.from(new TextEncoder().encode(text));
  const blockInfo = QR_ECC_L[version];
  const dataCapacity = blockInfo.data.reduce((sum, item) => sum + item, 0);
  const bits = [];
  qrAppendBits(bits, 0x4, 4);
  qrAppendBits(bits, bytes.length, 8);
  bytes.forEach((byte) => qrAppendBits(bits, byte, 8));
  const capacityBits = dataCapacity * 8;
  qrAppendBits(bits, 0, Math.min(4, Math.max(0, capacityBits - bits.length)));
  while (bits.length % 8) bits.push(0);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(""), 2));
  for (let pad = 0xec; data.length < dataCapacity; pad ^= 0xec ^ 0x11) data.push(pad);
  return data;
}

function qrInterleave(data, version) {
  const { data: blockSizes, ecc } = QR_ECC_L[version];
  const blocks = [];
  let offset = 0;
  blockSizes.forEach((size) => {
    const block = data.slice(offset, offset + size);
    blocks.push({ data: block, ecc: qrRemainder(block, ecc) });
    offset += size;
  });
  const result = [];
  for (let i = 0; i < Math.max(...blockSizes); i += 1) blocks.forEach((block) => {
    if (i < block.data.length) result.push(block.data[i]);
  });
  for (let i = 0; i < ecc; i += 1) blocks.forEach((block) => result.push(block.ecc[i]));
  return result;
}

function qrCreateMatrix(size) {
  return {
    modules: Array.from({ length: size }, () => Array(size).fill(false)),
    reserved: Array.from({ length: size }, () => Array(size).fill(false)),
  };
}

function qrSet(matrix, x, y, dark, reserve = true) {
  if (x < 0 || y < 0 || y >= matrix.modules.length || x >= matrix.modules.length) return;
  matrix.modules[y][x] = Boolean(dark);
  if (reserve) matrix.reserved[y][x] = true;
}

function qrFinder(matrix, x, y) {
  for (let dy = -1; dy <= 7; dy += 1) {
    for (let dx = -1; dx <= 7; dx += 1) {
      const xx = x + dx;
      const yy = y + dy;
      const dark = dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6 && (dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4));
      qrSet(matrix, xx, yy, dark);
    }
  }
}

function qrAlignment(matrix, cx, cy) {
  for (let dy = -2; dy <= 2; dy += 1) {
    for (let dx = -2; dx <= 2; dx += 1) {
      qrSet(matrix, cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
  }
}

function qrFunctionPatterns(version) {
  const size = version * 4 + 17;
  const matrix = qrCreateMatrix(size);
  qrFinder(matrix, 0, 0);
  qrFinder(matrix, size - 7, 0);
  qrFinder(matrix, 0, size - 7);
  for (let i = 8; i < size - 8; i += 1) {
    qrSet(matrix, i, 6, i % 2 === 0);
    qrSet(matrix, 6, i, i % 2 === 0);
  }
  const centers = { 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30], 6: [6, 34] }[version] || [];
  centers.forEach((x) => centers.forEach((y) => {
    if (!matrix.reserved[y]?.[x]) qrAlignment(matrix, x, y);
  }));
  qrSet(matrix, 8, size - 8, true);
  for (let i = 0; i < 9; i += 1) {
    if (i !== 6) {
      qrSet(matrix, 8, i, false);
      qrSet(matrix, i, 8, false);
    }
  }
  for (let i = 0; i < 8; i += 1) {
    qrSet(matrix, size - 1 - i, 8, false);
    qrSet(matrix, 8, size - 1 - i, false);
  }
  return matrix;
}

function qrMask(mask, x, y) {
  return [
    (x + y) % 2 === 0,
    y % 2 === 0,
    x % 3 === 0,
    (x + y) % 3 === 0,
    (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0,
    ((x * y) % 2) + ((x * y) % 3) === 0,
    (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
    (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
  ][mask];
}

function qrDrawCodewords(base, codewords) {
  const matrix = {
    modules: base.modules.map((row) => row.slice()),
    reserved: base.reserved.map((row) => row.slice()),
  };
  const bits = [];
  codewords.forEach((byte) => qrAppendBits(bits, byte, 8));
  const size = matrix.modules.length;
  let bitIndex = 0;
  let upward = true;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let vert = 0; vert < size; vert += 1) {
      const y = upward ? size - 1 - vert : vert;
      for (let j = 0; j < 2; j += 1) {
        const x = right - j;
        if (!matrix.reserved[y][x]) {
          matrix.modules[y][x] = bitIndex < bits.length && bits[bitIndex] === 1;
          bitIndex += 1;
        }
      }
    }
    upward = !upward;
  }
  return matrix;
}

function qrFormatBits(mask) {
  let data = (1 << 3) | mask;
  let rem = data << 10;
  for (let i = 14; i >= 10; i -= 1) {
    if (((rem >>> i) & 1) !== 0) rem ^= 0x537 << (i - 10);
  }
  return ((data << 10) | rem) ^ 0x5412;
}

function qrDrawFormat(matrix, mask) {
  const size = matrix.modules.length;
  const bits = qrFormatBits(mask);
  for (let i = 0; i <= 5; i += 1) qrSet(matrix, 8, i, ((bits >>> i) & 1) !== 0);
  qrSet(matrix, 8, 7, ((bits >>> 6) & 1) !== 0);
  qrSet(matrix, 8, 8, ((bits >>> 7) & 1) !== 0);
  qrSet(matrix, 7, 8, ((bits >>> 8) & 1) !== 0);
  for (let i = 9; i < 15; i += 1) qrSet(matrix, 14 - i, 8, ((bits >>> i) & 1) !== 0);
  for (let i = 0; i < 8; i += 1) qrSet(matrix, size - 1 - i, 8, ((bits >>> i) & 1) !== 0);
  for (let i = 8; i < 15; i += 1) qrSet(matrix, 8, size - 15 + i, ((bits >>> i) & 1) !== 0);
}

function qrPenalty(matrix) {
  const modules = matrix.modules;
  const size = modules.length;
  let penalty = 0;
  for (let y = 0; y < size; y += 1) {
    let runColor = modules[y][0];
    let run = 1;
    for (let x = 1; x < size; x += 1) {
      if (modules[y][x] === runColor) run += 1;
      else {
        if (run >= 5) penalty += run - 2;
        runColor = modules[y][x];
        run = 1;
      }
    }
    if (run >= 5) penalty += run - 2;
  }
  for (let x = 0; x < size; x += 1) {
    let runColor = modules[0][x];
    let run = 1;
    for (let y = 1; y < size; y += 1) {
      if (modules[y][x] === runColor) run += 1;
      else {
        if (run >= 5) penalty += run - 2;
        runColor = modules[y][x];
        run = 1;
      }
    }
    if (run >= 5) penalty += run - 2;
  }
  for (let y = 0; y < size - 1; y += 1) for (let x = 0; x < size - 1; x += 1) {
    const color = modules[y][x];
    if (color === modules[y][x + 1] && color === modules[y + 1][x] && color === modules[y + 1][x + 1]) penalty += 3;
  }
  const dark = modules.flat().filter(Boolean).length;
  penalty += Math.floor(Math.abs((dark * 20) / (size * size) - 10)) * 10;
  return penalty;
}

function qrMatrix(text) {
  const bytesLength = new TextEncoder().encode(text).length;
  const version = QR_ECC_L.findIndex((info, index) => index > 0 && bytesLength + 2 <= info.data.reduce((sum, item) => sum + item, 0));
  if (version < 1) throw new Error("Pix payload is too long for the local QR generator.");
  const base = qrFunctionPatterns(version);
  const codewords = qrInterleave(qrDataCodewords(text, version), version);
  let best = null;
  for (let mask = 0; mask < 8; mask += 1) {
    const matrix = qrDrawCodewords(base, codewords);
    for (let y = 0; y < matrix.modules.length; y += 1) for (let x = 0; x < matrix.modules.length; x += 1) {
      if (!matrix.reserved[y][x] && qrMask(mask, x, y)) matrix.modules[y][x] = !matrix.modules[y][x];
    }
    qrDrawFormat(matrix, mask);
    const penalty = qrPenalty(matrix);
    if (!best || penalty < best.penalty) best = { matrix, penalty };
  }
  return best.matrix.modules;
}

function qrSvg(payload) {
  const modules = qrMatrix(payload);
  const size = modules.length;
  const quiet = 4;
  const viewSize = size + quiet * 2;
  const rects = [];
  modules.forEach((row, y) => row.forEach((dark, x) => {
    if (dark) rects.push(`<rect x="${x + quiet}" y="${y + quiet}" width="1" height="1"/>`);
  }));
  return `<svg class="pix-qr-svg" viewBox="0 0 ${viewSize} ${viewSize}" role="img" aria-label="Pix QR Code" shape-rendering="crispEdges"><rect width="${viewSize}" height="${viewSize}" fill="#fff"/>${rects.join("")}</svg>`;
}

function updateAccount(accountId, updater) {
  const accounts = loadAccounts();
  const index = accounts.findIndex((account) => account.id === accountId);
  if (index < 0) return null;
  accounts[index] = updater({ ...accounts[index], profile: { ...accounts[index].profile } });
  return saveAccounts(accounts) ? accounts[index] : null;
}

function setSession(account) {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId: account.id, email: account.email, signedInAt: isoNow() }));
    localStorage.setItem(AUTH_VERIFIED_STORAGE_KEY, "true");
    rememberAuthEmail(account.email);
    migrateLegacyDataToUser(account);
  } catch (error) {
    // Prototype auth state is local only.
  }
}

function signOut() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(PENDING_ROUTE_STORAGE_KEY);
    localStorage.setItem(AUTH_VERIFIED_STORAGE_KEY, "false");
  } catch (error) {
    // Local sign-out should never delete saved account data.
  }
}

function intendedRoute() {
  try {
    const route = localStorage.getItem(PENDING_ROUTE_STORAGE_KEY);
    return route && PRIVATE_ROUTES.has(route) ? route : "";
  } catch (error) {
    return "";
  }
}

function rememberIntendedRoute(route) {
  if (!PRIVATE_ROUTES.has(route)) return;
  try {
    localStorage.setItem(PENDING_ROUTE_STORAGE_KEY, route);
  } catch (error) {
    // Best effort only.
  }
}

function consumeIntendedRoute() {
  const route = intendedRoute();
  try {
    localStorage.removeItem(PENDING_ROUTE_STORAGE_KEY);
  } catch (error) {
    // Best effort only.
  }
  return route || "/dashboard";
}

function createAccount({ fullName, email, password }) {
  const normalizedEmail = normalizeEmail(email);
  if (findAccountByEmail(normalizedEmail)) return null;
  const account = {
    id: `user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    email: normalizedEmail,
    password: String(password || ""),
    plan: "free",
    createdAt: isoNow(),
    profile: {
      fullName: String(fullName || "").trim(),
      email: normalizedEmail,
      phone: "",
      location: t().builder.values.location,
      title: t().builder.values.professionalTitle,
      preferredLanguage: currentLanguage,
    },
  };
  const accounts = loadAccounts();
  accounts.push(account);
  return saveAccounts(accounts) ? account : null;
}

function migrateLegacyDataToUser(account) {
  try {
    const marker = `${LEGACY_MIGRATION_STORAGE_KEY}.${account.id}`;
    if (localStorage.getItem(marker) === "true") return;
    [
      [PROFILE_STORAGE_KEY, {}],
      [RESUMES_STORAGE_KEY, []],
      [COVER_LETTERS_STORAGE_KEY, []],
      [ACCESS_STORAGE_KEY, {}],
      [PAYMENT_REQUESTS_STORAGE_KEY, []],
    ].forEach(([legacyKey, fallback]) => {
      const scopedKey = userScopedStorageKey(legacyKey, account);
      if (localStorage.getItem(scopedKey)) return;
      const legacyValue = readJsonStorage(legacyKey, fallback);
      const hasLegacy = Array.isArray(legacyValue) ? legacyValue.length > 0 : Object.keys(legacyValue || {}).length > 0;
      if (hasLegacy) writeJsonStorage(scopedKey, legacyValue);
    });
    localStorage.setItem(marker, "true");
  } catch (error) {
    // Migration is a convenience for existing prototype users.
  }
}

function isVerifiedUser() {
  if (isLoggedIn()) return true;
  try {
    return localStorage.getItem(AUTH_VERIFIED_STORAGE_KEY) === "true";
  } catch (error) {
    return false;
  }
}

function setVerifiedUser(value) {
  if (!value) signOut();
  try {
    localStorage.setItem(AUTH_VERIFIED_STORAGE_KEY, value ? "true" : "false");
  } catch (error) {
    // Prototype auth state is local only.
  }
}

function rememberAuthEmail(email) {
  try {
    localStorage.setItem(AUTH_EMAIL_STORAGE_KEY, email);
  } catch (error) {
    // Prototype auth state is local only.
  }
}

function getAuthEmail() {
  try {
    return currentSession()?.email || localStorage.getItem(AUTH_EMAIL_STORAGE_KEY) || "you@example.com";
  } catch (error) {
    return "you@example.com";
  }
}

function defaultProfile() {
  const account = currentAccount();
  if (account) {
    return {
      fullName: account.profile.fullName || "Succeedora User",
      email: account.email,
      phone: account.profile.phone || "",
      title: account.profile.title || t().builder.values.professionalTitle,
      location: account.profile.location || t().builder.values.location,
      preferredLanguage: account.profile.preferredLanguage || currentLanguage,
    };
  }
  return {
    fullName: "Amanda Silva",
    email: getAuthEmail() === "you@example.com" ? (currentLanguage === "pt" ? "amanda@exemplo.com" : "amanda@example.com") : getAuthEmail(),
    phone: "",
    title: t().builder.values.professionalTitle,
    location: t().builder.values.location,
    preferredLanguage: currentLanguage,
  };
}

function loadProfile() {
  try {
    const parsed = JSON.parse(localStorage.getItem(userScopedStorageKey(PROFILE_STORAGE_KEY)) || "{}");
    return { ...defaultProfile(), ...(parsed && typeof parsed === "object" ? parsed : {}) };
  } catch (error) {
    return defaultProfile();
  }
}

function saveProfileDetailed(profile) {
  const account = currentAccount();
  const normalized = {
    fullName: String(profile.fullName || profile.name || "").trim(),
    email: normalizeEmail(profile.email),
    phone: String(profile.phone || "").trim(),
    title: String(profile.title || "").trim(),
    location: String(profile.location || "").trim(),
    preferredLanguage: profile.preferredLanguage === "pt" ? "pt" : "en",
  };
  if (!normalized.fullName || !validEmail(normalized.email)) return { ok: false, reason: "invalid" };
  const duplicate = findAccountByEmail(normalized.email);
  if (account && duplicate && duplicate.id !== account.id) return { ok: false, reason: "duplicate" };
  try {
    localStorage.setItem(userScopedStorageKey(PROFILE_STORAGE_KEY, account), JSON.stringify(normalized));
    rememberAuthEmail(normalized.email);
    if (account) {
      updateAccount(account.id, (current) => ({
        ...current,
        email: normalized.email,
        profile: normalized,
      }));
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ userId: account.id, email: normalized.email, signedInAt: isoNow() }));
    }
    return { ok: true, profile: normalized };
  } catch (error) {
    return { ok: false, reason: "storage" };
  }
}

function saveProfile(profile) {
  return saveProfileDetailed(profile).ok;
}

function profileInitials(profile = loadProfile()) {
  const words = String(profile.fullName || "Succeedora").trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase() || "S";
}

function profileFirstName(profile = loadProfile()) {
  return String(profile.fullName || t().dashboard.userMenu).trim().split(/\s+/)[0] || t().dashboard.userMenu;
}

function defaultAccessState() {
  return {
    plan: "free",
    aiCredits: 0,
    oneTime: {
      watermarkRemoval: [],
      premiumPdf: [],
      careerPack: [],
      premiumTemplates: [],
      onlineLinks: [],
    },
  };
}

function normalizeAccessState(raw = {}) {
  const base = defaultAccessState();
  const plan = ["free", "pro", "premium"].includes(raw.plan) ? raw.plan : "free";
  const oneTime = { ...base.oneTime, ...(raw.oneTime && typeof raw.oneTime === "object" ? raw.oneTime : {}) };
  Object.keys(oneTime).forEach((key) => {
    oneTime[key] = Array.isArray(oneTime[key]) ? oneTime[key].map(String) : [];
  });
  return {
    plan,
    aiCredits: Math.max(0, Number(raw.aiCredits) || 0),
    oneTime,
  };
}

function getUserAccess() {
  try {
    const account = currentAccount();
    const access = normalizeAccessState(JSON.parse(localStorage.getItem(userScopedStorageKey(ACCESS_STORAGE_KEY, account)) || "{}"));
    if (account?.plan && access.plan === "free") access.plan = account.plan;
    return access;
  } catch (error) {
    return defaultAccessState();
  }
}

function isPaidPlan(access = getUserAccess()) {
  return access.plan === "pro" || access.plan === "premium";
}

function hasOneTime(type, id, access = getUserAccess()) {
  if (!id) return false;
  return (access.oneTime?.[type] || []).map(String).includes(String(id));
}

function accessPlanLabel(access = getUserAccess()) {
  const copy = t().dashboard;
  if (access.plan === "premium") return copy.premium;
  if (access.plan === "pro") return copy.pro;
  return copy.free;
}

function currentResumeAccessId() {
  return builderDraft?.id || currentBuilderResumeId || "";
}

function canExportWithoutBranding(resumeId = currentResumeAccessId(), access = getUserAccess()) {
  return isPaidPlan(access) || hasOneTime("watermarkRemoval", resumeId, access) || hasOneTime("premiumPdf", resumeId, access) || hasOneTime("careerPack", resumeId, access);
}

function canUseTemplate(templateKey, access = getUserAccess()) {
  const template = RESUME_TEMPLATES.find((item) => item.key === templateKey);
  if (!template || template.access === "free") return true;
  return isPaidPlan(access) || hasOneTime("premiumTemplates", templateKey, access);
}

function availableTemplateKey(preferred = selectedTemplateKey) {
  if (canUseTemplate(preferred)) return preferred;
  return RESUME_TEMPLATES.find((template) => template.access === "free")?.key || "minimal";
}

function openProTemplateModal() {
  const copy = currentLanguage === "pt"
    ? {
        title: "Modelo Pro",
        text: "Este modelo está disponível no plano Pro.",
        viewPlans: "Ver planos",
        continueFree: "Continuar com modelo gratuito",
      }
    : {
        title: "Pro template",
        text: "This template is available with the Pro plan.",
        viewPlans: "View plans",
        continueFree: "Continue with free template",
      };
  openAccessModal({
    title: copy.title,
    text: copy.text,
    actions: [
      { label: copy.viewPlans, onClick: () => setRoute("/dashboard/billing") },
      { label: copy.continueFree, className: "secondary-button" },
    ],
  });
}

function canUseFeature(feature, resumeId = currentResumeAccessId(), access = getUserAccess()) {
  if (access.plan === "premium") return true;
  if (access.plan === "pro") return !["ats-analysis", "job-tailoring", "advanced-career"].includes(feature);
  if (feature === "brand-free-export") return canExportWithoutBranding(resumeId, access);
  if (feature === "cover-letter" || feature === "translation" || feature === "basic-ats" || feature === "job-suggestions") return hasOneTime("careerPack", resumeId, access);
  if (feature === "online-link") return hasOneTime("onlineLinks", resumeId, access);
  return ["free-template", "preview", "branded-export", "basic-edit"].includes(feature);
}

function requiresAiCredits(action = "ai") {
  const access = getUserAccess();
  return !isPaidPlan(access) && access.aiCredits <= 0 && ["improve-summary", "rewrite-experience", "cover-letter", "translation", "job-tailoring", "job-analysis", "ats-keywords"].includes(action);
}

function showFormError(form, message) {
  const error = form.querySelector("[data-auth-error]");
  if (error) {
    error.textContent = message;
    error.hidden = false;
  }
}

function validName(value) {
  return /^[\p{L}\s'-]{2,}$/u.test(String(value || "").trim()) && !/\d/.test(value);
}

function strongPassword(value) {
  return String(value || "").length >= 8;
}

function suspiciousEmail(email) {
  const normalized = String(email || "").toLowerCase();
  const local = normalized.split("@")[0] || "";
  return /^(test|fake|admin|no-reply|noreply|asdf|qwerty)([._+-]?\d*)?$/.test(local) || /(example|invalid)\./.test(normalized);
}

function validateAuthForm(form, mode) {
  const a = t().auth;
  if (mode === "verify") {
    const attempts = Number(localStorage.getItem("succeedora.verifyAttempts") || "0");
    if (attempts >= 5) return a.errors.attempts;
    if (!codeStillValid("verify")) return a.errors.expired;
    if (codeMatches("verify", form.code?.value || "")) return "";
    localStorage.setItem("succeedora.verifyAttempts", String(attempts + 1));
    return a.errors.code;
  }
  const email = String(form.email?.value || "").trim().toLowerCase();
  const domain = email.split("@")[1] || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return a.errors.email;
  if (suspiciousEmail(email)) return a.errors.suspicious;
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return a.errors.disposable;
  if (mode === "signin") {
    const account = findAccountByEmail(email);
    if (!account || account.password !== String(form.password?.value || "")) return a.errors.login;
    return "";
  }
  if (mode === "forgot") return "";
  if (mode === "signup") {
    if (findAccountByEmail(email)) return a.errors.duplicate;
    if (!validName(form.fullName?.value)) return a.errors.name;
    if (!strongPassword(form.password?.value)) return a.errors.password;
    if (form.password?.value !== form.confirmPassword?.value) return a.errors.confirm;
  }
  if (mode === "reset") {
    const attempts = Number(localStorage.getItem("succeedora.resetAttempts") || "0");
    if (attempts >= 5) return a.errors.attempts;
    if (!codeStillValid("reset")) return a.errors.expired;
    if (!codeMatches("reset", form.code?.value || "")) {
      localStorage.setItem("succeedora.resetAttempts", String(attempts + 1));
      return a.errors.code;
    }
    if (!strongPassword(form.password?.value)) return a.errors.password;
    if (form.password?.value !== form.confirmPassword?.value) return a.errors.confirm;
  }
  return "";
}

function placeholderSendEmailCode(email, purpose) {
  rememberAuthEmail(email);
  try {
    const code = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem(`succeedora.${purpose}Code`, code);
    localStorage.setItem(`succeedora.${purpose}CodeRequestedAt`, String(Date.now()));
    localStorage.setItem(`succeedora.${purpose}Attempts`, "0");
  } catch (error) {
    // A real email provider should own code generation and delivery in production.
  }
}

function codeMatches(purpose, input) {
  if (!/^\d{6}$/.test(input || "")) return false;
  try {
    return localStorage.getItem(`succeedora.${purpose}Code`) === input;
  } catch (error) {
    return false;
  }
}

function codeStillValid(purpose) {
  try {
    const requested = Number(localStorage.getItem(`succeedora.${purpose}CodeRequestedAt`) || "0");
    return requested > 0 && Date.now() - requested <= 10 * 60 * 1000;
  } catch (error) {
    return true;
  }
}

function render() {
  const hash = window.location.hash;
  if (hash && !hash.startsWith("#/")) {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  }
  const route = getRoute();
  if (PRIVATE_ROUTES.has(route) && !isLoggedIn()) {
    rememberIntendedRoute(route);
    setRoute("/signin");
    return;
  }
  if (route.startsWith("/blog/")) {
    renderBlogArticlePage(route.replace("/blog/", ""));
    return;
  }
  routes[route]();
}

function bindInteractions() {
  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.dataset.submitting === "true") return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const visibleError = form.querySelector("[data-auth-error]");
      if (visibleError) {
        visibleError.textContent = "";
        visibleError.hidden = true;
      }
      const mode = form.getAttribute("data-auth-form");
      const validationError = validateAuthForm(form, mode);
      if (validationError) {
        showFormError(form, validationError);
        return;
      }
      const button = form.querySelector("[data-auth-submit]");
      form.dataset.submitting = "true";
      if (button) {
        button.disabled = true;
        const loadingLabels = { signin: t().auth.signingIn, signup: t().auth.creatingAccount, forgot: t().auth.sendingCode, verify: t().auth.confirming, reset: t().auth.updatingPassword };
        button.textContent = loadingLabels[mode] || button.textContent;
      }
      window.setTimeout(() => {
        if (mode === "signin") {
          const account = findAccountByEmail(form.email.value);
          if (account) {
            setSession(account);
            setRoute(consumeIntendedRoute());
          }
        } else if (mode === "signup") {
          const account = createAccount({
            fullName: form.fullName.value,
            email: form.email.value,
            password: form.password.value,
          });
          if (account) {
            setSession(account);
            writeJsonStorage(userScopedStorageKey(PROFILE_STORAGE_KEY, account), account.profile);
            setRoute(consumeIntendedRoute());
          }
        } else if (mode === "forgot") {
          const message = form.querySelector("[data-auth-message]");
          if (message) {
            message.textContent = t().auth.resetPrepared;
            message.hidden = false;
          }
          form.dataset.submitting = "false";
          if (button) {
            button.disabled = false;
            button.textContent = t().auth.sendCode;
          }
          return;
        } else if (mode === "verify") {
          setVerifiedUser(true);
          setRoute("/dashboard");
        } else if (mode === "reset") {
          setRoute("/signin");
        }
      }, 450);
    });
  });

  document.querySelectorAll("[data-new-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!isPaidPlan() && loadResumes().length >= 1) {
        event.preventDefault();
        event.stopImmediatePropagation();
        openUpgradeModal("resume-limit");
        return;
      }
      currentBuilderResumeId = null;
      builderDraft = null;
      pendingTemplateChangeDraft = null;
      builderSaveState = "saved";
      activeBuilderSectionIndex = 0;
    });
  });

  document.querySelectorAll("[data-edit-resume]").forEach((button) => {
    button.addEventListener("click", () => {
      loadResumeIntoBuilder(button.getAttribute("data-edit-resume"));
      preferCollapsedSidebarForBuilder();
    });
  });

  document.querySelectorAll("[data-preview-resume]").forEach((button) => {
    button.addEventListener("click", () => openResumePreview(button.getAttribute("data-preview-resume")));
  });

  document.querySelectorAll("[data-duplicate-resume]").forEach((button) => {
    button.addEventListener("click", () => {
      const resume = findResume(button.getAttribute("data-duplicate-resume"));
      if (!resume) return;
      const now = isoNow();
      upsertResume({ ...resume, id: newResumeId(), title: `${resumeLabels().copyPrefix} ${resume.title}`, createdAt: now, updatedAt: now });
      render();
    });
  });

  document.querySelectorAll("[data-delete-resume]").forEach((button) => {
    button.addEventListener("click", () => openDeleteResumeModal(button.getAttribute("data-delete-resume")));
  });

  document.querySelectorAll("[data-pdf-export-resume]").forEach((button) => {
    button.addEventListener("click", () => exportResumeDataPdf(button.getAttribute("data-pdf-export-resume"), button));
  });

  document.querySelectorAll("[data-save-resume]").forEach((button) => {
    button.addEventListener("click", () => {
      if (autoSaveTimer) window.clearTimeout(autoSaveTimer);
      setSaveState("saving");
      window.setTimeout(() => saveCurrentResume(true), 250);
    });
  });

  document.querySelectorAll("[data-route]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      if (el.hasAttribute("data-ai-action") && requiresAiCredits(el.getAttribute("data-ai-action") || "ai")) {
        event.stopImmediatePropagation();
        openUpgradeModal("ai");
        return;
      }
      if (el.hasAttribute("data-sign-out")) {
        signOut();
        setRoute("/");
        return;
      }
      setRoute(el.getAttribute("data-route"));
    });
  });

  document.querySelectorAll("[data-lang]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      setLanguagePreference(el.getAttribute("data-lang") === "pt" ? "pt" : "en");
    });
  });

  const blogSearch = document.querySelector("[data-blog-search]");
  const blogCategorySelect = document.querySelector("[data-blog-category-select]");
  const blogCategoryButtons = Array.from(document.querySelectorAll("[data-blog-category]"));
  if (blogSearch || blogCategorySelect || blogCategoryButtons.length) {
    const filterBlogCards = () => {
      const query = String(blogSearch?.value || "").trim().toLowerCase();
      const activeCategory = blogCategorySelect?.value || document.querySelector("[data-blog-category].active")?.getAttribute("data-blog-category") || "all";
      let visibleCount = 0;
      document.querySelectorAll("[data-blog-card]").forEach((card) => {
        const categoryMatches = activeCategory === "all" || card.getAttribute("data-category") === activeCategory;
        const queryMatches = !query || String(card.getAttribute("data-search") || "").includes(query);
        const visible = categoryMatches && queryMatches;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      const empty = document.querySelector("[data-blog-empty]");
      if (empty) empty.hidden = visibleCount > 0;
    };
    if (blogSearch) blogSearch.addEventListener("input", filterBlogCards);
    if (blogCategorySelect) blogCategorySelect.addEventListener("change", filterBlogCards);
    blogCategoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        blogCategoryButtons.forEach((item) => item.classList.toggle("active", item === button));
        filterBlogCards();
      });
    });
  }

  document.querySelectorAll("[data-settings-language]").forEach((control) => {
    control.addEventListener("change", () => {
      setLanguagePreference(control.value === "pt" ? "pt" : "en");
    });
  });

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      setThemePreference(resolvedTheme() === "dark" ? "light" : "dark");
      render();
    });
  });

  document.querySelectorAll("[data-theme-choice]").forEach((control) => {
    control.addEventListener("change", () => {
      setThemePreference(control.value);
      render();
    });
  });

  document.querySelectorAll("[data-profile-form]").forEach((form) => {
    let initial = loadProfile();
    const fields = Array.from(form.querySelectorAll("[data-profile-field]"));
    const saveButton = form.querySelector("[data-profile-save]");
    const cancelButton = form.querySelector("[data-profile-cancel]");
    const status = form.querySelector("[data-profile-status]");
    const message = form.querySelector("[data-profile-message]");
    const collect = () => Object.fromEntries(fields.map((field) => [field.getAttribute("data-profile-field"), field.value]));
    const setDirty = (dirty) => {
      if (saveButton) saveButton.disabled = !dirty;
      if (cancelButton) cancelButton.disabled = !dirty;
      if (status) status.hidden = !dirty;
      if (message && dirty) message.hidden = true;
    };
    fields.forEach((field) => {
      field.addEventListener("input", () => setDirty(true));
      field.addEventListener("change", () => setDirty(true));
    });
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        fields.forEach((field) => {
          const key = field.getAttribute("data-profile-field");
          field.value = initial[key] || "";
        });
        setDirty(false);
      });
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const result = saveProfileDetailed(collect());
      const ok = result.ok;
      if (message) {
        message.textContent = ok ? t().settings.saved : (result.reason === "duplicate" ? t().settings.saveDuplicate : t().settings.saveError);
        message.classList.toggle("error", !ok);
        message.hidden = false;
      }
      if (ok) {
        initial = { ...initial, ...collect() };
        setDirty(false);
        if (initial.preferredLanguage && initial.preferredLanguage !== currentLanguage) setLanguagePreference(initial.preferredLanguage);
      }
    });
  });

  document.querySelectorAll("[data-password-prepared]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.getAttribute("data-password-prepared"));
      if (target) {
        target.textContent = t().settings.mockPasswordMessage || t().auth.resetPrepared;
        target.classList.remove("error");
        target.hidden = false;
      }
    });
  });

  const navToggle = document.querySelector(".nav-toggle");
  const publicNav = document.querySelector(".public-nav");
  if (navToggle && publicNav) navToggle.addEventListener("click", () => publicNav.classList.toggle("open"));

  document.querySelectorAll(".sidebar-toggle").forEach((toggle) => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) toggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  });

  document.querySelectorAll("[data-sidebar-collapse]").forEach((button) => {
    button.addEventListener("click", () => {
      sidebarManuallySet = true;
      sidebarAutoCollapsedForBuilder = false;
      sidebarCollapsed = !sidebarCollapsed;
      const shell = document.querySelector(".app-shell");
      if (shell) shell.classList.toggle("sidebar-collapsed", sidebarCollapsed);
      document.querySelectorAll("[data-sidebar-collapse]").forEach((control) => {
        control.setAttribute("aria-label", sidebarCollapsed ? t().dashboard.expandSidebar : t().dashboard.collapseSidebar);
        control.setAttribute("title", sidebarCollapsed ? t().dashboard.expandSidebar : t().dashboard.collapseSidebar);
        control.setAttribute("aria-expanded", String(!sidebarCollapsed));
      });
    });
  });

  document.querySelectorAll("[data-pricing-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-pricing-tab");
      const scope = tab.closest(".monetization");
      if (!scope) return;
      scope.querySelectorAll("[data-pricing-tab]").forEach((item) => item.classList.toggle("active", item === tab));
      scope.querySelectorAll("[data-pricing-panel]").forEach((panel) => {
        panel.classList.toggle("active", panel.getAttribute("data-pricing-panel") === target);
      });
    });
  });

  document.querySelectorAll("[data-pricing-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-pricing-jump");
      const tab = document.querySelector(`[data-pricing-tab="${target}"]`);
      if (tab) tab.click();
      document.querySelector(".monetization")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-builder-view]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-builder-view");
      const page = tab.closest(".builder-page");
      if (!page) return;
      page.querySelectorAll("[data-builder-view]").forEach((item) => item.classList.toggle("active", item === tab));
      page.classList.toggle("show-preview", target === "preview");
      updateResumePreviewScales(page);
    });
  });

  document.querySelectorAll("[data-builder-exit]").forEach((button) => {
    button.addEventListener("click", exitResumeBuilder);
  });

  document.querySelectorAll("[data-cover-letter-new]").forEach((button) => {
    button.addEventListener("click", startNewCoverLetter);
  });

  function refreshCoverLetterPreview(markUnsaved = true) {
    const preview = document.querySelector("[data-letter-preview]");
    if (!preview) return;
    const draft = updateCoverLetterDraftFromForm({ markDirty: markUnsaved });
    preview.innerHTML = coverLetterDocument(draft);
    const message = document.querySelector("[data-cover-letter-message]");
    if (markUnsaved && message) {
      coverLetterSaveMessage = "";
      message.textContent = coverLetterLabels().unsaved;
      message.hidden = false;
    }
  }

  document.querySelectorAll("[data-letter-field]").forEach((field) => {
    field.addEventListener("input", refreshCoverLetterPreview);
    field.addEventListener("change", refreshCoverLetterPreview);
  });
  if (document.querySelector("[data-letter-builder]")) refreshCoverLetterPreview(false);

  document.querySelectorAll("[data-cover-letter-resume]").forEach((select) => {
    select.addEventListener("change", () => {
      if (select.value) applyResumeToCoverLetterDraft(select.value);
    });
  });

  document.querySelectorAll("[data-cover-letter-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-cover-letter-tab");
      const page = tab.closest("[data-letter-builder]");
      if (!page) return;
      page.querySelectorAll("[data-cover-letter-tab]").forEach((item) => item.classList.toggle("active", item === tab));
      page.classList.toggle("show-preview", target === "preview");
    });
  });

  document.querySelectorAll("[data-cover-letter-list]").forEach((button) => {
    button.addEventListener("click", () => {
      coverLetterBuilderOpen = false;
      coverLetterDraft = null;
      currentCoverLetterId = null;
      coverLetterSaveMessage = "";
      routes["/dashboard/cover-letters"]();
    });
  });

  document.querySelectorAll("[data-cover-letter-generate]").forEach((button) => {
    button.addEventListener("click", () => {
      const labels = coverLetterLabels();
      const draft = updateCoverLetterDraftFromForm();
      if (!draft.jobDescription && !draft.targetRole && !draft.company && !draft.strengths && !draft.experience) {
        const message = document.querySelector("[data-cover-letter-message]");
        if (message) {
          message.textContent = labels.validationBody;
          message.hidden = false;
        }
        return;
      }
      draft.body = generateCoverLetterBody(draft);
      coverLetterDraft = draft;
      coverLetterSaveMessage = "";
      routes["/dashboard/cover-letters"]();
    });
  });

  document.querySelectorAll("[data-cover-letter-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const labels = coverLetterLabels();
      const draft = updateCoverLetterDraftFromForm();
      if (!coverLetterHasUserContent(draft)) {
        const message = document.querySelector("[data-cover-letter-message]");
        if (message) {
          message.textContent = labels.validationSave;
          message.hidden = false;
        }
        return;
      }
      const saved = upsertCoverLetter({ ...draft, id: currentCoverLetterId || draft.id });
      currentCoverLetterId = saved.id;
      coverLetterDraft = saved;
      coverLetterSaveMessage = labels.saved;
      routes["/dashboard/cover-letters"]();
    });
  });

  document.querySelectorAll("[data-cover-letter-edit]").forEach((button) => {
    button.addEventListener("click", () => loadCoverLetterIntoBuilder(button.getAttribute("data-cover-letter-edit")));
  });

  document.querySelectorAll("[data-cover-letter-preview]").forEach((button) => {
    button.addEventListener("click", () => openCoverLetterPreview(button.getAttribute("data-cover-letter-preview")));
  });

  document.querySelectorAll("[data-cover-letter-preview-current]").forEach((button) => {
    button.addEventListener("click", () => openCoverLetterPreview("", updateCoverLetterDraftFromForm()));
  });

  document.querySelectorAll("[data-cover-letter-duplicate]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = findCoverLetter(button.getAttribute("data-cover-letter-duplicate"));
      if (!source) return;
      if (!isPaidPlan() && loadCoverLetters().length >= 1) {
        const labels = coverLetterLabels();
        openAccessModal({
          title: labels.limitTitle,
          text: labels.limitText,
          actions: [
            { label: labels.viewPlans, onClick: () => setRoute("/dashboard/billing") },
            { label: labels.actions.cancel, className: "secondary-button" },
          ],
        });
        return;
      }
      const now = isoNow();
      upsertCoverLetter({ ...source, id: newCoverLetterId(), title: `${coverLetterLabels().copyPrefix} ${source.title}`, createdAt: now, updatedAt: now });
      render();
    });
  });

  document.querySelectorAll("[data-cover-letter-delete]").forEach((button) => {
    button.addEventListener("click", () => openCoverLetterDeleteModal(button.getAttribute("data-cover-letter-delete")));
  });

  document.querySelectorAll("[data-cover-letter-pdf]").forEach((button) => {
    button.addEventListener("click", () => exportCoverLetterPdf(findCoverLetter(button.getAttribute("data-cover-letter-pdf")), button));
  });

  document.querySelectorAll("[data-cover-letter-pdf-current]").forEach((button) => {
    button.addEventListener("click", () => exportCoverLetterPdf(updateCoverLetterDraftFromForm(), button));
  });

  document.querySelectorAll("[data-resend-code]").forEach((button) => {
    button.addEventListener("click", () => {
      placeholderSendEmailCode(getAuthEmail(), getRoute() === "/reset-password" ? "reset" : "verify");
      const originalText = button.textContent;
      button.disabled = true;
      let seconds = 60;
      button.textContent = `${originalText} (${seconds}s)`;
      const interval = window.setInterval(() => {
        seconds -= 1;
        button.textContent = `${originalText} (${seconds}s)`;
        if (seconds <= 0) {
          window.clearInterval(interval);
          button.disabled = false;
          button.textContent = originalText;
        }
      }, 1000);
    });
  });

  document.querySelectorAll("[data-user-menu]").forEach((button) => {
    button.addEventListener("click", () => {
      const menu = button.closest(".user-menu-wrap");
      if (menu) menu.classList.toggle("open");
    });
  });

  document.querySelectorAll("[data-template-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-template-filter");
      document.querySelectorAll("[data-template-filter]").forEach((item) => item.classList.toggle("active", item === button));
      document.querySelectorAll("[data-template-category]").forEach((card) => {
        const category = card.getAttribute("data-template-category");
        const access = card.getAttribute("data-template-access");
        const isVisible = filter === "all" || category === filter || access === filter;
        card.classList.toggle("is-hidden", !isVisible);
      });
    });
  });

  document.querySelectorAll("[data-resume-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const template = button.getAttribute("data-resume-template");
      if (!canUseTemplate(template)) {
        openUpgradeModal("template");
        return;
      }
      selectedTemplateKey = template;
      if (builderDraft) builderDraft.selectedTemplate = template;
      const preview = document.querySelector(".resume-document");
      const switcher = button.closest(".template-switch");
      if (switcher) switcher.querySelectorAll("[data-resume-template]").forEach((item) => item.classList.toggle("active", item === button));
      if (!preview) return;
      preview.className = `resume-document professional-preview resume-template-${template} ${documentFormatClass()}`;
      preview.setAttribute("data-document-format-current", selectedDocumentFormat);
      scheduleAutoSave();
      updateResumePreviewScales();
    });
  });

  document.querySelectorAll("[data-document-format]").forEach((button) => {
    button.addEventListener("click", () => {
      setDocumentFormat(button.getAttribute("data-document-format"));
      if (builderDraft) builderDraft.documentFormat = selectedDocumentFormat;
      document.querySelectorAll("[data-document-format]").forEach((item) => {
        item.classList.toggle("active", normalizeDocumentFormat(item.getAttribute("data-document-format")) === selectedDocumentFormat);
      });
      document.querySelectorAll(".resume-document, .resume-document-shell, .template-paper").forEach((item) => applyDocumentFormatClass(item));
      updateResumePreviewScales();
      if (document.querySelector(".builder-page")) scheduleAutoSave();
    });
  });

  document.querySelectorAll("[data-template-preview]").forEach((button) => {
    button.addEventListener("click", () => openTemplatePreview(button.getAttribute("data-template-preview"), button.getAttribute("data-preview-context") || "public"));
  });

  document.querySelectorAll("[data-use-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const templateKey = button.getAttribute("data-use-template") || "modern";
      const destination = button.getAttribute("data-template-destination");
      if (destination === "signup") {
        selectedTemplateKey = templateKey;
        setRoute("/signup");
        return;
      }
      if (!canUseTemplate(templateKey)) {
        openUpgradeModal("template");
        return;
      }
      if (!pendingTemplateChangeDraft && !isPaidPlan() && loadResumes().length >= 1) {
        openUpgradeModal("resume-limit");
        return;
      }
      useTemplateForBuilder(templateKey);
      preferCollapsedSidebarForBuilder();
      setRoute("/dashboard/builder");
    });
  });

  function showBuilderSection(index) {
    const total = document.querySelectorAll("[data-builder-panel]").length;
    if (!total) return;
    activeBuilderSectionIndex = Math.max(0, Math.min(index, total - 1));
    document.querySelectorAll("[data-builder-panel]").forEach((panel) => {
      panel.hidden = Number(panel.getAttribute("data-builder-panel")) !== activeBuilderSectionIndex;
    });
    document.querySelectorAll("[data-builder-section]").forEach((item) => {
      item.classList.toggle("active", Number(item.getAttribute("data-section-index")) === activeBuilderSectionIndex);
    });
    const currentTitle = document.querySelector("[data-builder-current-title]");
    if (currentTitle) currentTitle.textContent = t().builder.sections[activeBuilderSectionIndex] || "";
    const prev = document.querySelector("[data-builder-prev]");
    const next = document.querySelector("[data-builder-next]");
    if (prev) prev.disabled = activeBuilderSectionIndex === 0;
    if (next) next.disabled = activeBuilderSectionIndex >= total - 1;
    updateBuilderSectionNav();
  }

  document.querySelectorAll("[data-builder-section]").forEach((button) => {
    button.addEventListener("click", () => {
      showBuilderSection(Number(button.getAttribute("data-section-index")));
    });
  });

  document.querySelectorAll("[data-builder-next]").forEach((button) => {
    button.addEventListener("click", () => showBuilderSection(activeBuilderSectionIndex + 1));
  });

  document.querySelectorAll("[data-builder-prev]").forEach((button) => {
    button.addEventListener("click", () => showBuilderSection(activeBuilderSectionIndex - 1));
  });

  document.querySelectorAll("[data-change-builder-template]").forEach((button) => {
    button.addEventListener("click", () => {
      if (builderDraft) pendingTemplateChangeDraft = collectBuilderResume();
      currentBuilderResumeId = null;
      builderDraft = null;
      builderSaveState = "saved";
      activeBuilderSectionIndex = 0;
      renderBuilderTemplateSelection();
    });
  });

  document.querySelectorAll("[data-preview-zoom]").forEach((button) => {
    button.addEventListener("click", () => {
      const frame = document.querySelector(".builder-preview-frame");
      if (!frame) return;
      frame.classList.remove("zoom-in", "zoom-out", "zoom-fit");
      frame.classList.add(`zoom-${button.getAttribute("data-preview-zoom")}`);
      updateResumePreviewScales();
    });
  });

  document.querySelectorAll("[data-builder-full-preview]").forEach((button) => {
    button.addEventListener("click", () => openTemplatePreview(selectedTemplateKey, "builder"));
  });

  document.querySelectorAll("[data-pdf-export]").forEach((button) => {
    button.addEventListener("click", () => exportResumePdf(button));
  });

  document.querySelectorAll("[data-watermark-option]").forEach((button) => {
    button.addEventListener("click", () => openPixPaymentModal("remove_watermark"));
  });

  document.querySelectorAll("[data-one-time-purchase], [data-buy-credits]").forEach((button) => {
    button.addEventListener("click", () => openPixPaymentModal(button.getAttribute("data-pix-product") || "premium_pdf"));
  });

  document.querySelectorAll("[data-plan-placeholder]").forEach((button) => {
    button.addEventListener("click", () => openPaymentComingSoonModal());
  });

  document.querySelectorAll("[data-ai-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      if (requiresAiCredits(button.getAttribute("data-ai-action") || "ai")) {
        event.preventDefault();
        event.stopPropagation();
        openUpgradeModal("ai");
      }
    });
  });

  document.querySelectorAll("[data-ai-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const getValue = (name) => form.querySelector(`[data-ai-field="${name}"]`)?.value.trim() || "";
      const nextState = {
        resumeId: getValue("resumeId"),
        jobTitle: getValue("jobTitle"),
        company: getValue("company"),
        jobDescription: getValue("jobDescription"),
        result: null,
        error: "",
      };
      const resume = findResume(nextState.resumeId);
      if (!resume) {
        aiAssistantState = { ...aiAssistantState, ...nextState, error: t().ai.selectResumeError };
        render();
        return;
      }
      if (!nextState.jobDescription) {
        aiAssistantState = { ...aiAssistantState, ...nextState, error: t().ai.jobDescriptionError };
        render();
        return;
      }
      aiAssistantState = { ...nextState, result: { state: "loading" } };
      render();
      window.setTimeout(() => {
        aiAssistantState = { ...nextState, result: analyzeResumeForJob(resume, nextState), error: "" };
        render();
      }, 350);
    });
  });

  document.querySelectorAll("[data-ai-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const text = button.getAttribute("data-ai-copy") || "";
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
      } catch (error) {
        // Clipboard support is optional; the suggestion remains visible to copy manually.
      }
      button.textContent = t().ai.actions.copied;
    });
  });

  document.querySelectorAll("[data-ai-edit-resume]").forEach((button) => {
    button.addEventListener("click", () => {
      openResumeBuilderFromAi(button.getAttribute("data-ai-edit-resume"), button.getAttribute("data-ai-section"));
    });
  });

  function previewRoot() {
    return document.querySelector(".builder-preview .resume-document") || document.querySelector(".resume-document");
  }

  function syncPreviewField(field) {
    const targetName = field.getAttribute("data-preview-target");
    const root = previewRoot();
    const target = root ? root.querySelector(`[data-preview-field="${targetName}"]`) : null;
    if (!target) return;
    const value = field.value.trim();
    const displayValue = value || target.getAttribute("data-preview-empty") || "";
    if (targetName === "skills") {
      target.innerHTML = displayValue.split(",").map((skill) => skill.trim()).filter(Boolean).map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
    } else if (["languages", "certifications"].includes(targetName)) {
      target.innerHTML = displayValue.split(/,|\n/).map((item) => item.trim()).filter(Boolean).map(escapeHtml).join("<br>");
    } else if (targetName === "projects") {
      target.innerHTML = displayValue.split(/,|\n/).map((item) => item.trim()).filter(Boolean).map((item) => `<p>${escapeHtml(item)}</p>`).join("");
    } else if (targetName === "experience") {
      target.innerHTML = value.split("\n").map((line) => line.trim()).filter(Boolean).map((line) => `<li>${line.replace(/^[-•]\s*/, "")}</li>`).join("");
    } else if (targetName === "links") {
      target.innerHTML = displayValue.split(/,|\n/).map((item) => item.trim()).filter(Boolean).map((item) => `<p>${escapeHtml(item)}</p>`).join("");
    } else {
      target.textContent = displayValue;
    }
    updatePreviewContactLine();
  }

  function updatePreviewContactLine() {
    const root = previewRoot();
    const contact = root ? root.querySelector('[data-preview-field="contact"]') : null;
    if (!contact) return;
    const getSource = (name) => document.querySelector(`[data-preview-source="${name}"]`)?.value.trim() || "";
    const location = resumeContactLocation({
      address: getSource("address"),
      city: getSource("city"),
      state: getSource("state"),
      postalCode: getSource("postalCode"),
      location: getSource("location"),
    });
    const values = [location, getSource("email"), getSource("phone")].filter(Boolean);
    contact.textContent = values.length ? values.join(" | ") : contact.getAttribute("data-preview-empty") || "";
  }

  function updatePreviewName() {
    const root = previewRoot();
    const target = root ? root.querySelector('[data-preview-field="name"]') : null;
    if (!target) return;
    const first = document.querySelector('[data-preview-name-part="first"]')?.value.trim() || "";
    const last = document.querySelector('[data-preview-name-part="last"]')?.value.trim() || "";
    const full = [first, last].filter(Boolean).join(" ");
    target.textContent = full || target.getAttribute("data-preview-empty") || "";
  }

  document.querySelectorAll("[data-preview-name-part]").forEach((field) => {
    field.addEventListener("input", () => {
      updatePreviewName();
      scheduleAutoSave();
      updateBuilderProgress();
      updateBuilderSectionNav();
    });
  });
  updatePreviewName();

  document.querySelectorAll("[data-preview-target]").forEach((field) => {
    field.addEventListener("input", () => {
      syncPreviewField(field);
      scheduleAutoSave();
      updateBuilderProgress();
      updateBuilderSectionNav();
    });
    syncPreviewField(field);
  });

  document.querySelectorAll("[data-preview-source]").forEach((field) => {
    field.addEventListener("input", () => {
      updatePreviewContactLine();
      scheduleAutoSave();
      updateBuilderProgress();
      updateBuilderSectionNav();
    });
  });

  document.querySelectorAll("[data-resume-field]:not([data-preview-target]):not([data-preview-source])").forEach((field) => {
    field.addEventListener("input", () => {
      scheduleAutoSave();
      updateBuilderProgress();
      updateBuilderSectionNav();
    });
  });
  updatePreviewContactLine();

  updateResumePreviewScales();
  applyScrollReveals();
}

function applyScrollReveals() {
  const items = document.querySelectorAll(".hero-value-card, .section-heading, .feature-card, .trust-card, .testimonial-preview, .step-card, .template-card, .price-card, .faq-item, .features-cta, .templates-cta, .one-time-teaser, .site-footer");
  if (!items.length) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("reveal-visible"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("reveal-visible"));
    return;
  }
  items.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 55}ms`);
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  items.forEach((item) => observer.observe(item));
}

function closeAccessModal() {
  document.querySelector(".access-modal")?.remove();
}

function openAccessModal({ title, text, detail = "", actions = [] }) {
  const root = document.body || document.getElementById("app");
  const paymentDetail = detail || t().dashboard.access.paymentDetail || "";
  closeAccessModal();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal access-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-access-close></div>
    <section class="template-preview-dialog access-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <header class="template-preview-header">
        <div><span class="eyebrow">Succeedora</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p>${paymentDetail ? `<p class="access-payment-detail">${escapeHtml(paymentDetail)}</p>` : ""}</div>
        <button class="icon-button" type="button" data-access-close aria-label="${t().dashboard.close}">${icon("close")}</button>
      </header>
      <footer class="template-preview-footer access-actions">
        ${actions.map((action, index) => `<button class="${action.className || (index === 0 ? "primary-button" : "secondary-button")}" type="button" data-access-action="${index}">${action.label}</button>`).join("")}
      </footer>
    </section>
  `;
  root.appendChild(modal);
  modal.querySelectorAll("[data-access-close]").forEach((item) => item.addEventListener("click", closeAccessModal));
  actions.forEach((action, index) => {
    const button = modal.querySelector(`[data-access-action="${index}"]`);
    if (button) button.addEventListener("click", () => {
      if (action.onClick) action.onClick();
      if (action.close !== false) closeAccessModal();
    });
  });
}

function openUpgradeModal(kind = "default") {
  const access = t().dashboard.access;
  openAccessModal({
    title: access.unlockTitle,
    text: access.unlockText,
    detail: access.paymentDetail,
    actions: [
      { label: access.gotIt || access.continueFree },
    ],
  });
}

function openPaymentComingSoonModal() {
  const access = t().dashboard.access;
  openAccessModal({
    title: access.unlockTitle,
    text: access.placeholder,
    detail: access.paymentDetail,
    actions: [
      { label: access.gotIt || access.continueFree },
    ],
  });
}

function createPixPaymentRequest(productType) {
  const product = localizedPixProduct(productType);
  if (!product || !paymentConfig.pixEnabled) return null;
  const account = currentAccount();
  const id = `pix_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const pixPayload = generatePixPayload({
    amount: product.amount,
    description: product.description,
    orderId: id.replace(/^pix_/, "").slice(0, 12),
    merchantName: paymentConfig.merchantName,
    merchantCity: paymentConfig.merchantCity,
    pixKey: paymentConfig.pixKey,
  });
  return upsertPaymentRequest({
    id,
    userId: account?.id || "",
    userEmail: account?.email || getAuthEmail(),
    productType,
    productName: product.productName,
    amount: product.amount,
    currency: product.currency,
    paymentMethod: "pix",
    pixKey: paymentConfig.pixKey,
    pixPayload,
    status: "pending_payment",
    createdAt: isoNow(),
    confirmedByUserAt: "",
    approvedAt: "",
    rejectedAt: "",
  });
}

function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  return Promise.resolve();
}

function openPixPaymentModal(productType) {
  const labels = t().payments;
  const request = createPixPaymentRequest(productType);
  if (!request) {
    openPaymentComingSoonModal();
    return;
  }
  closeAccessModal();
  const root = document.body || document.getElementById("app");
  const modal = document.createElement("div");
  modal.className = "template-preview-modal access-modal pix-payment-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-access-close></div>
    <section class="template-preview-dialog pix-payment-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(labels.title)}">
      <header class="template-preview-header pix-payment-header">
        <div>
          <span class="eyebrow">${escapeHtml(labels.manualBadge)}</span>
          <h2>${escapeHtml(labels.title)}</h2>
          <p>${escapeHtml(labels.intro)}</p>
        </div>
        <button class="icon-button" type="button" data-access-close aria-label="${t().dashboard.close}">${icon("close")}</button>
      </header>
      <div class="pix-payment-body">
        <div class="pix-qr-card">${qrSvg(request.pixPayload)}</div>
        <div class="pix-payment-details">
          <dl>
            <div><dt>${escapeHtml(labels.product)}</dt><dd>${escapeHtml(request.productName)}</dd></div>
            <div><dt>${escapeHtml(labels.amount)}</dt><dd>${escapeHtml(formatCurrencyBRL(request.amount))}</dd></div>
            <div><dt>${escapeHtml(labels.status)}</dt><dd data-pix-status>${escapeHtml(paymentStatusLabel(request.status))}</dd></div>
            <div><dt>${escapeHtml(labels.pixKey)}</dt><dd>${escapeHtml(`${paymentConfig.pixKeyType} ${formattedPixKey()}`)}</dd></div>
          </dl>
          <label class="pix-copy-field">
            <span>${escapeHtml(labels.pixCopyPaste)}</span>
            <textarea readonly data-pix-code>${escapeHtml(request.pixPayload)}</textarea>
          </label>
          <p class="pix-payment-warning">${escapeHtml(labels.warning)}</p>
          <p class="settings-message pix-payment-message" data-pix-message hidden></p>
        </div>
      </div>
      <footer class="template-preview-footer access-actions pix-payment-actions">
        <button class="secondary-button" type="button" data-pix-copy>${escapeHtml(labels.copyCode)}</button>
        <button class="primary-button" type="button" data-pix-confirm>${escapeHtml(labels.completed)}</button>
        <button class="ghost-button" type="button" data-pix-cancel>${escapeHtml(labels.cancel)}</button>
      </footer>
    </section>
  `;
  root.appendChild(modal);
  const close = () => {
    closeAccessModal();
    if (getRoute() === "/dashboard/billing") render();
  };
  const cancel = () => {
    if (request.status === "pending_payment") {
      const updated = upsertPaymentRequest({ ...request, status: "cancelled" });
      request.status = updated.status;
    }
    closeAccessModal();
    if (getRoute() === "/dashboard/billing") render();
  };
  modal.querySelectorAll("[data-access-close]").forEach((item) => item.addEventListener("click", close));
  modal.querySelector("[data-pix-cancel]")?.addEventListener("click", cancel);
  modal.querySelector("[data-pix-copy]")?.addEventListener("click", async (event) => {
    await copyTextToClipboard(request.pixPayload);
    event.currentTarget.textContent = labels.codeCopied;
  });
  modal.querySelector("[data-pix-confirm]")?.addEventListener("click", () => {
    const updated = upsertPaymentRequest({ ...request, status: "pending_manual_confirmation", confirmedByUserAt: isoNow() });
    request.status = updated.status;
    request.confirmedByUserAt = updated.confirmedByUserAt;
    const status = modal.querySelector("[data-pix-status]");
    const message = modal.querySelector("[data-pix-message]");
    if (status) status.textContent = paymentStatusLabel(updated.status);
    if (message) {
      message.textContent = labels.confirmedMessage;
      message.hidden = false;
    }
    if (getRoute() === "/dashboard/billing") render();
  });
}

function openWatermarkRemovalModal({ resumeId = currentResumeAccessId(), button = null, exportMode = "builder" } = {}) {
  const access = t().dashboard.access;
  const root = document.body || document.getElementById("app");
  closeAccessModal();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal access-modal watermark-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-access-close></div>
    <section class="watermark-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(access.downloadWatermarkTitle)}">
      <button class="icon-button watermark-close" type="button" data-access-close aria-label="${t().dashboard.close}">${icon("close")}</button>
      <div class="watermark-hero">
        <span class="eyebrow">Succeedora</span>
        <h2>${escapeHtml(access.downloadWatermarkTitle)}</h2>
        <p>${escapeHtml(access.downloadWatermarkText)}</p>
      </div>
      <div class="watermark-benefits">
        ${(access.watermarkBenefits || []).map((item) => `<span>${icon("check")} ${escapeHtml(item)}</span>`).join("")}
      </div>
      <div class="watermark-offer">
        <div>
          <span class="watermark-badge">${escapeHtml(access.watermarkRecommended || "")}</span>
          <strong>${escapeHtml(access.watermarkOfferTitle || access.removeWatermarkPrice)}</strong>
          <small>${escapeHtml(access.watermarkOneTime || "")}</small>
        </div>
        <button class="primary-button watermark-paid-cta" type="button" data-watermark-paid>${icon("sparkles")} ${escapeHtml(access.removeWatermarkPrice)}</button>
      </div>
      <div class="watermark-actions">
        <button class="secondary-button" type="button" data-watermark-free>${icon("download")} ${escapeHtml(access.downloadFree)}</button>
        <button class="ghost-button" type="button" data-watermark-plans>${escapeHtml(access.viewPlans)}</button>
      </div>
    </section>
  `;
  root.appendChild(modal);
  modal.querySelectorAll("[data-access-close]").forEach((item) => item.addEventListener("click", closeAccessModal));
  modal.querySelector("[data-watermark-paid]")?.addEventListener("click", () => openPixPaymentModal("remove_watermark"));
  modal.querySelector("[data-watermark-free]")?.addEventListener("click", () => {
    closeAccessModal();
    if (exportMode === "data") exportResumeDataPdf(resumeId, button, { forceBranded: true, skipPrompt: true });
    else exportResumePdf(button, { forceBranded: true, skipPrompt: true });
  });
  modal.querySelector("[data-watermark-plans]")?.addEventListener("click", () => {
    closeAccessModal();
    setRoute("/dashboard/billing");
  });
}

function openTemplatePreview(templateKey, context = "public") {
  const copy = t();
  const template = getTemplateByKey(templateKey);
  const root = document.body || document.getElementById("app");
  const existing = document.querySelector(".template-preview-modal");
  if (existing) existing.remove();
  const currentResume = context === "builder" ? document.querySelector(".builder-preview .resume-document-shell") : null;
  const resumeMarkup = currentResume ? currentResume.outerHTML : sampleResumeDocument(template.key, selectedDocumentFormat);
  const modal = document.createElement("div");
  modal.className = "template-preview-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-modal-close></div>
    <section class="template-preview-dialog" role="dialog" aria-modal="true" aria-label="${template.name}">
      <header class="template-preview-header">
        <div>
          <div class="template-card-badges">
            <span>${template.category}</span>
            <span class="${template.access === "free" ? "free" : "pro"}">${template.access === "free" ? copy.dashboard.free : copy.dashboard.pro}</span>
          </div>
          <h2>${template.name}</h2>
          <p>${template.description}</p>
          ${documentFormatSwitch(selectedDocumentFormat, "modal")}
        </div>
        <button class="icon-button" type="button" data-modal-close aria-label="${copy.dashboard.close}">${icon("close")}</button>
      </header>
      <div class="template-preview-content">
        ${resumeMarkup}
      </div>
      <footer class="template-preview-footer">
        <button class="secondary-button" type="button" data-modal-close>${context === "builder" ? copy.builder.continueEditing : copy.dashboard.close}</button>
        ${context === "builder" ? `<span class="pdf-export-status modal-pdf-status" data-pdf-status role="status" aria-live="polite"></span><button class="secondary-button" type="button" data-pdf-export>${icon("download")} ${copy.builder.download}</button><button class="primary-button" type="button" data-modal-close>${copy.builder.changeTemplate}</button>` : `<button class="primary-button" type="button" data-modal-use-template="${template.key}" data-preview-context="${context}">${copy.dashboard.useThisTemplate}</button>`}
      </footer>
    </section>
  `;
  root.appendChild(modal);
  updateResumePreviewScales(modal);
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.querySelectorAll("[data-pdf-export]").forEach((button) => {
    button.addEventListener("click", () => exportResumePdf(button));
  });
  modal.querySelectorAll("[data-document-format]").forEach((button) => {
    button.addEventListener("click", () => {
      setDocumentFormat(button.getAttribute("data-document-format"));
      document.querySelectorAll("[data-document-format]").forEach((item) => {
        item.classList.toggle("active", normalizeDocumentFormat(item.getAttribute("data-document-format")) === selectedDocumentFormat);
      });
      document.querySelectorAll(".resume-document, .resume-document-shell, .template-paper").forEach((item) => applyDocumentFormatClass(item));
      updateResumePreviewScales();
    });
  });
  modal.querySelectorAll("[data-modal-use-template]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTemplateKey = button.getAttribute("data-modal-use-template") || "modern";
      if (context !== "dashboard") {
        modal.remove();
        setRoute("/signup");
        return;
      }
      if (!canUseTemplate(selectedTemplateKey)) {
        openUpgradeModal("template");
        return;
      }
      if (!pendingTemplateChangeDraft && !isPaidPlan() && loadResumes().length >= 1) {
        openUpgradeModal("resume-limit");
        return;
      }
      modal.remove();
      useTemplateForBuilder(selectedTemplateKey);
      preferCollapsedSidebarForBuilder();
      setRoute("/dashboard/builder");
    });
  });
}

function openResumePreview(resumeId) {
  const resume = findResume(resumeId);
  if (!resume) return;
  const template = getTemplateByKey(resume.selectedTemplate);
  selectedDocumentFormat = resume.documentFormat;
  const copy = t();
  const root = document.body || document.getElementById("app");
  const existing = document.querySelector(".template-preview-modal");
  if (existing) existing.remove();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-modal-close></div>
    <section class="template-preview-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(resume.title)}">
      <header class="template-preview-header">
        <div>
          <div class="template-card-badges">
            <span>${template.name}</span>
            <span>${resume.documentFormat === "letter" ? copy.builder.usLetter : copy.builder.a4}</span>
          </div>
          <h2>${escapeHtml(resume.title)}</h2>
          <p>${copy.dashboard.library.lastEdited}: ${formatResumeDate(resume.updatedAt)}</p>
        </div>
        <button class="icon-button" type="button" data-modal-close aria-label="${copy.dashboard.close}">${icon("close")}</button>
      </header>
      <div class="template-preview-content">${resumeDocument(resume.selectedTemplate, resume.documentFormat, resume)}</div>
      <footer class="template-preview-footer">
        <span class="pdf-export-status modal-pdf-status" data-pdf-status role="status" aria-live="polite"></span>
        <button class="secondary-button" type="button" data-edit-resume="${resume.id}" data-route="/dashboard/builder">${copy.dashboard.library.actions[0]}</button>
        <button class="secondary-button" type="button" data-pdf-export-resume="${resume.id}">${resumeLabels().downloadPdf}</button>
        <button class="primary-button" type="button" data-modal-close>${copy.builder.continueEditing}</button>
      </footer>
    </section>
  `;
  root.appendChild(modal);
  updateResumePreviewScales(modal);
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.querySelectorAll("[data-edit-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      loadResumeIntoBuilder(button.getAttribute("data-edit-resume"));
      preferCollapsedSidebarForBuilder();
      modal.remove();
      setRoute("/dashboard/builder");
    });
  });
  modal.querySelectorAll("[data-pdf-export-resume]").forEach((button) => {
    button.addEventListener("click", () => exportResumeDataPdf(button.getAttribute("data-pdf-export-resume"), button));
  });
}

function openDeleteResumeModal(resumeId) {
  const resume = findResume(resumeId);
  if (!resume) return;
  const labels = resumeLabels();
  const root = document.body || document.getElementById("app");
  const existing = document.querySelector(".delete-resume-modal");
  if (existing) existing.remove();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal delete-resume-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-modal-close></div>
    <section class="delete-resume-dialog" role="dialog" aria-modal="true" aria-label="${labels.deleteTitle}">
      <h2>${labels.deleteTitle}</h2>
      <p>${labels.deleteText}</p>
      <strong>${escapeHtml(resume.title)}</strong>
      <div class="resume-actions">
        <button class="secondary-button" type="button" data-modal-close>${labels.cancel}</button>
        <button class="primary-button danger-button" type="button" data-confirm-delete-resume="${resume.id}">${labels.delete}</button>
      </div>
    </section>
  `;
  root.appendChild(modal);
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.querySelector("[data-confirm-delete-resume]")?.addEventListener("click", () => {
    storeResumes(loadResumes().filter((item) => item.id !== resume.id));
    if (currentBuilderResumeId === resume.id) {
      currentBuilderResumeId = null;
      builderDraft = null;
    }
    modal.remove();
    render();
  });
}

function openCoverLetterPreview(letterId, draft = null) {
  const source = draft || findCoverLetter(letterId);
  if (!source) return;
  const letter = normalizeCoverLetter(source);
  const labels = coverLetterLabels();
  const root = document.body || document.getElementById("app");
  const existing = document.querySelector(".cover-letter-preview-modal");
  if (existing) existing.remove();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal cover-letter-preview-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-modal-close></div>
    <section class="template-preview-dialog cover-letter-preview-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(letter.title || labels.previewTitle)}">
      <header class="template-preview-header">
        <div>
          <div class="template-card-badges"><span>${labels.previewTitle}</span><span>${letter.status === "saved" ? labels.statusSaved : labels.statusDraft}</span></div>
          <h2>${escapeHtml(letter.title || labels.untitled)}</h2>
          <p>${labels.lastEdited}: ${escapeHtml(formatResumeDate(letter.updatedAt))}</p>
        </div>
        <button class="icon-button" type="button" data-modal-close aria-label="${labels.actions.close}">${icon("close")}</button>
      </header>
      <div class="template-preview-content cover-letter-preview-content">
        <div class="letter-document">${coverLetterDocument(letter)}</div>
      </div>
      <footer class="template-preview-footer">
        <span class="pdf-export-status modal-pdf-status" data-pdf-status role="status" aria-live="polite"></span>
        ${letterId ? `<button class="secondary-button" type="button" data-cover-letter-modal-edit="${escapeHtml(letter.id)}">${labels.actions.edit}</button>` : ""}
        <button class="secondary-button" type="button" data-cover-letter-modal-pdf>${icon("download")} ${labels.actions.download}</button>
        <button class="primary-button" type="button" data-modal-close>${labels.actions.close}</button>
      </footer>
    </section>
  `;
  root.appendChild(modal);
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.querySelector("[data-cover-letter-modal-edit]")?.addEventListener("click", () => {
    modal.remove();
    loadCoverLetterIntoBuilder(letter.id);
  });
  modal.querySelector("[data-cover-letter-modal-pdf]")?.addEventListener("click", (event) => exportCoverLetterPdf(letter, event.currentTarget));
}

function openCoverLetterDeleteModal(letterId) {
  const letter = findCoverLetter(letterId);
  if (!letter) return;
  const labels = coverLetterLabels();
  const root = document.body || document.getElementById("app");
  const existing = document.querySelector(".delete-cover-letter-modal");
  if (existing) existing.remove();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal delete-cover-letter-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-modal-close></div>
    <section class="delete-resume-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(labels.deleteTitle)}">
      <h2>${escapeHtml(labels.deleteTitle)}</h2>
      <p>${escapeHtml(labels.deleteText)}</p>
      <strong>${escapeHtml(letter.title || labels.untitled)}</strong>
      <div class="resume-actions">
        <button class="secondary-button" type="button" data-modal-close>${labels.actions.cancel}</button>
        <button class="primary-button danger-button" type="button" data-confirm-delete-cover-letter="${escapeHtml(letter.id)}">${labels.actions.delete}</button>
      </div>
    </section>
  `;
  root.appendChild(modal);
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.querySelector("[data-confirm-delete-cover-letter]")?.addEventListener("click", () => {
    storeCoverLetters(loadCoverLetters().filter((item) => item.id !== letter.id));
    if (currentCoverLetterId === letter.id) {
      currentCoverLetterId = null;
      coverLetterDraft = null;
      coverLetterBuilderOpen = false;
    }
    modal.remove();
    render();
  });
}

function buildCoverLetterPdfExport(letter, format = defaultDocumentFormat()) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const labels = coverLetterLabels();
  const stage = createPdfExportStage(normalizedFormat);
  stage.classList.add("cover-letter-pdf-stage");
  document.body.appendChild(stage);

  const page = document.createElement("div");
  page.className = `pdf-export-page cover-letter-pdf-page ${documentFormatClass(normalizedFormat)}`;
  applyPdfPageVariables(page, normalizedFormat);

  const content = document.createElement("div");
  content.className = "pdf-export-content cover-letter-pdf-content";
  content.innerHTML = coverLetterDocument(letter, { forExport: true, branding: !isPaidPlan() });
  page.appendChild(content);
  stage.appendChild(page);

  return {
    stage,
    filename: coverLetterFilename(letter),
    format: normalizedFormat,
    labels,
  };
}

async function exportCoverLetterPdf(letter, button) {
  if (!letter) return;
  const labels = coverLetterLabels();
  const originalText = button?.textContent.trim();
  let exportJob = null;
  try {
    if (button) {
      button.disabled = true;
      button.textContent = labels.pdfGenerating;
    }
    setPdfStatus(button, labels.pdfGenerating, "loading");
    exportJob = buildCoverLetterPdfExport(normalizeCoverLetter(letter), defaultDocumentFormat());
    await savePdfExport(exportJob.stage, exportJob.format, exportJob.filename);
    setPdfStatus(button, labels.pdfSuccess, "success");
  } catch (error) {
    console.error(error);
    setPdfStatus(button, labels.pdfError, "error");
  } finally {
    if (exportJob?.stage) exportJob.stage.remove();
    if (button) {
      button.disabled = false;
      button.textContent = originalText || labels.actions.download;
    }
  }
}

function sampleResumeDocument(template = "modern", format = selectedDocumentFormat) {
  const sample = sampleResumeData();
  const b = t().builder;
  return `
    <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
      <div class="resume-page-scale-wrapper">
        <div class="resume-document sample-resume-document resume-template-${template} ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
          <header>
            <div>
              <h2>${sample.name}</h2>
              <strong>${sample.role}</strong>
            </div>
            <p class="resume-contact-line">${sample.location} | ${sample.email} | ${sample.phone}</p>
          </header>
          <section><h3>${b.document.summaryTitle}</h3><p>${sample.summary}</p></section>
          <section>
            <h3>${b.document.experienceTitle}</h3>
            ${sample.experiences.map(([role, company, period, bullets]) => `<div class="resume-entry"><strong>${role}, ${company}</strong><span>${period}</span></div><ul>${bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`).join("")}
          </section>
          <section><h3>${b.document.educationTitle}</h3><p><strong>${sample.education[0]}</strong><br>${sample.education[1]} | ${sample.education[2]}</p></section>
          <section><h3>${b.document.skillsTitle}</h3><div class="resume-skill-list">${sample.skills.map((skill) => `<span>${skill}</span>`).join("")}</div></section>
          <section class="resume-two-column-section">
            <div><h3>${b.labels.languages}</h3><p>${sample.languages.join("<br>")}</p></div>
            <div><h3>${b.labels.certifications}</h3><p>${sample.certifications.join("<br>")}</p></div>
          </section>
          <section><h3>${b.labels.projects}</h3>${sample.projects.map(([name, text]) => `<p><strong>${name}</strong><br>${text}</p>`).join("")}</section>
          <section><h3>${b.labels.links}</h3><div class="resume-link-list">${sample.links.map((link) => `<p>${link}</p>`).join("")}</div></section>
        </div>
      </div>
    </div>
  `;
}

function loadHtml2Pdf() {
  if (window.html2pdf) return Promise.resolve(window.html2pdf);
  if (html2PdfLoadPromise) return html2PdfLoadPromise;
  html2PdfLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    script.onload = () => window.html2pdf ? resolve(window.html2pdf) : reject(new Error("PDF library unavailable"));
    script.onerror = () => reject(new Error("PDF library failed to load"));
    document.head.appendChild(script);
  });
  return html2PdfLoadPromise;
}

function resumeExportFilename(source) {
  const name = source.querySelector("[data-preview-field='name'], h2")?.textContent.trim() || "";
  const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const prefix = currentLanguage === "pt" ? "curriculo" : "resume";
  return `${prefix}-${slug || "succeedora"}.pdf`;
}

function templateKeyFromDocument(source) {
  const templateClass = Array.from(source?.classList || []).find((className) => className.startsWith("resume-template-"));
  return templateClass ? templateClass.replace("resume-template-", "") : selectedTemplateKey;
}

function applyPdfPageVariables(element, format = selectedDocumentFormat) {
  if (!element) return;
  const spec = documentPageSpec(format);
  element.style.setProperty("--resume-page-width", `${spec.widthPx}px`);
  element.style.setProperty("--resume-page-height", `${spec.heightPx}px`);
  element.style.setProperty("--resume-page-width-print", spec.widthCss);
  element.style.setProperty("--resume-page-height-print", spec.heightCss);
}

function loadScriptOnce(src, test, errorMessage) {
  if (test()) return Promise.resolve();
  const existing = Array.from(document.scripts).find((script) => script.src === src);
  if (existing) {
    if (existing.dataset.loaded === "true" && test()) return Promise.resolve();
    existing.remove();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      script.remove();
      reject(new Error(errorMessage));
    }, 12000);
    script.src = src;
    script.async = true;
    script.onload = () => {
      window.clearTimeout(timeout);
      script.dataset.loaded = "true";
      return test() ? resolve() : reject(new Error(errorMessage));
    };
    script.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error(errorMessage));
    };
    document.head.appendChild(script);
  });
}

async function loadPdfRenderer() {
  try {
    await Promise.race([
      loadHtml2Pdf(),
      new Promise((_, reject) => window.setTimeout(() => reject(new Error("PDF library unavailable")), 12000)),
    ]);
  } catch (error) {
    // Fallback below loads the same underlying renderer libraries directly.
  }
  if (!window.html2canvas) {
    await loadScriptOnce(
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
      () => Boolean(window.html2canvas),
      "Canvas renderer unavailable"
    );
  }
  if (!window.jspdf?.jsPDF && !window.jsPDF) {
    await loadScriptOnce(
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      () => Boolean(window.jspdf?.jsPDF || window.jsPDF),
      "PDF renderer unavailable"
    );
  }
  return {
    html2canvas: window.html2canvas,
    jsPDF: window.jspdf?.jsPDF || window.jsPDF,
  };
}

function sectionHasContent(section) {
  const clone = section.cloneNode(true);
  const heading = clone.querySelector("h3");
  if (heading) heading.remove();
  return clone.textContent.replace(/\s+/g, " ").trim().length > 0;
}

function prepareResumeForPdf(source, options = {}) {
  const clone = source.cloneNode(true);
  const format = normalizeDocumentFormat(options.format || selectedDocumentFormat);
  clone.classList.add("pdf-export-document");
  clone.classList.remove("sample-resume-document");
  clone.removeAttribute("style");
  clone.removeAttribute("data-preview-scaled");
  clone.style.transform = "none";
  clone.style.margin = "0";
  clone.style.boxShadow = "none";
  clone.style.background = "#ffffff";
  applyDocumentFormatClass(clone, format);
  applyPdfPageVariables(clone, format);
  clone.querySelectorAll("section").forEach((section) => {
    if (!sectionHasContent(section)) section.remove();
  });
  if (!options.brandFree) {
    const footer = document.createElement("footer");
    footer.className = "pdf-brand-footer";
    footer.textContent = "Created with Succeedora";
    clone.appendChild(footer);
  }
  return clone;
}

function createResumeExportNode({ template, format, resume, source, brandFree }) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const shell = document.createElement("div");
  shell.innerHTML = resume
    ? resumeDocument(template || resume.selectedTemplate || selectedTemplateKey, normalizedFormat, resume)
    : "";
  const documentNode = shell.querySelector(".resume-document") || source;
  return prepareResumeForPdf(documentNode, { brandFree, format: normalizedFormat });
}

function createPdfExportStage(format) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const stage = document.createElement("div");
  stage.className = `pdf-export-stage pdf-export-${normalizedFormat}`;
  stage.setAttribute("aria-hidden", "true");
  stage.setAttribute("data-pdf-format", normalizedFormat);
  applyPdfPageVariables(stage, normalizedFormat);
  return stage;
}

function createPdfExportPage(stage, sourceDocument, format) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const page = document.createElement("div");
  page.className = `pdf-export-page ${documentFormatClass(normalizedFormat)}`;
  page.setAttribute("data-pdf-page", normalizedFormat);
  applyPdfPageVariables(page, normalizedFormat);

  const content = document.createElement("div");
  content.className = "pdf-export-content";

  const documentNode = sourceDocument.cloneNode(false);
  documentNode.innerHTML = "";
  content.appendChild(documentNode);
  page.appendChild(content);
  stage.appendChild(page);

  return { page, content, documentNode };
}

function pdfPageHasContent(state) {
  return Boolean(state?.documentNode?.children?.length);
}

function pdfContentFits(state) {
  if (!state?.content || !state?.documentNode) return true;
  return state.documentNode.scrollHeight <= state.content.clientHeight + 1;
}

function createSectionChunk(section, children) {
  const chunk = section.cloneNode(false);
  children.forEach((child) => chunk.appendChild(child.cloneNode(true)));
  return chunk;
}

function sectionChildGroups(section) {
  const children = Array.from(section.children);
  const heading = children[0]?.tagName === "H3" ? children.shift() : null;
  const groups = [];
  while (children.length) {
    const child = children.shift();
    if (child.classList?.contains("resume-entry") && children[0]?.tagName === "UL") {
      groups.push([child, children.shift()]);
    } else {
      groups.push([child]);
    }
  }
  return { heading, groups };
}

function cloneElementWithChildren(element, children) {
  const clone = element.cloneNode(false);
  children.forEach((child) => clone.appendChild(child.cloneNode(true)));
  return clone;
}

function splitSectionGroup(group) {
  if (group.length === 2 && group[1]?.tagName === "UL") {
    return Array.from(group[1].children).map((item) => [group[0], cloneElementWithChildren(group[1], [item])]);
  }
  if (group.length !== 1) return [];
  const [node] = group;
  if (node?.tagName === "UL") {
    return Array.from(node.children).map((item) => [cloneElementWithChildren(node, [item])]);
  }
  if (node?.children?.length > 1) {
    return Array.from(node.children).map((child) => [cloneElementWithChildren(node, [child])]);
  }
  return [];
}

function appendSectionChunkToPdfPages(state, section, heading, group, sourceDocument, format, allowSplit = true) {
  const appendToCurrent = (node) => {
    state.documentNode.appendChild(node);
    if (pdfContentFits(state)) return true;
    node.remove();
    return false;
  };

  const chunkChildren = heading ? [heading, ...group] : group;
  const chunk = createSectionChunk(section, chunkChildren);
  if (appendToCurrent(chunk)) return state;

  if (pdfPageHasContent(state)) state = createPdfExportPage(state.page.parentElement, sourceDocument, format);
  state.documentNode.appendChild(chunk);
  if (pdfContentFits(state) || !allowSplit) return state;

  chunk.remove();
  const splitGroups = splitSectionGroup(group);
  if (!splitGroups.length) {
    state.documentNode.appendChild(chunk);
    return state;
  }

  splitGroups.forEach((splitGroup) => {
    state = appendSectionChunkToPdfPages(state, section, heading, splitGroup, sourceDocument, format, false);
  });
  return state;
}

function appendBlockToPdfPages(state, block, sourceDocument, format) {
  const appendToCurrent = (node) => {
    state.documentNode.appendChild(node);
    if (pdfContentFits(state)) return true;
    node.remove();
    return false;
  };

  const appendToFreshPage = (node) => {
    if (pdfPageHasContent(state)) state = createPdfExportPage(state.page.parentElement, sourceDocument, format);
    state.documentNode.appendChild(node);
  };

  const clone = block.cloneNode(true);
  if (appendToCurrent(clone)) return state;

  if (block.tagName === "SECTION") {
    const { heading, groups } = sectionChildGroups(block);
    if (!groups.length) {
      appendToFreshPage(clone);
      return state;
    }
    groups.forEach((group) => {
      state = appendSectionChunkToPdfPages(state, block, heading, group, sourceDocument, format);
    });
    return state;
  }

  appendToFreshPage(clone);
  return state;
}

function buildResumePdfExport({ template, format, resume, source, brandFree }) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const sourceDocument = createResumeExportNode({ template, format: normalizedFormat, resume, source, brandFree });
  const stage = createPdfExportStage(normalizedFormat);
  document.body.appendChild(stage);

  let state = createPdfExportPage(stage, sourceDocument, normalizedFormat);
  Array.from(sourceDocument.children).forEach((block) => {
    state = appendBlockToPdfPages(state, block, sourceDocument, normalizedFormat);
  });

  return {
    stage,
    pages: Array.from(stage.querySelectorAll(".pdf-export-page")),
    filename: resumeExportFilename(sourceDocument),
  };
}

async function savePdfExport(stage, format, filename) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const spec = documentPageSpec(normalizedFormat);
  const { html2canvas, jsPDF } = await loadPdfRenderer();
  const pdf = new jsPDF({ unit: "mm", format: spec.jsPdfFormat, orientation: "portrait", compress: true });
  const pages = Array.from(stage.querySelectorAll(".pdf-export-page"));

  for (let index = 0; index < pages.length; index += 1) {
    const page = pages[index];
    const rect = page.getBoundingClientRect();
    const canvas = await html2canvas(page, {
      scale: 2.5,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: Math.ceil(rect.width),
      windowHeight: Math.ceil(rect.height),
      width: Math.ceil(rect.width),
      height: Math.ceil(rect.height),
    });
    if (index > 0) pdf.addPage(spec.jsPdfFormat, "portrait");
    pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", 0, 0, spec.widthMm, spec.heightMm, undefined, "FAST");
  }

  pdf.save(filename);
}

function setPdfStatus(button, message, state = "") {
  const status = button?.closest(".template-preview-modal")?.querySelector("[data-pdf-status]") || document.querySelector("[data-pdf-status]");
  if (status) {
    status.textContent = message;
    status.dataset.state = state;
  }
  if (button) button.dataset.originalText ||= button.textContent.trim();
}

async function exportResumePdf(button, options = {}) {
  const b = t().builder;
  const modal = button?.closest(".template-preview-modal");
  const source = modal?.querySelector(".resume-document") || document.querySelector(".builder-preview .resume-document");
  if (!source) return;
  const resumeId = currentResumeAccessId();
  const brandFree = options.forceBranded ? false : canExportWithoutBranding(resumeId);
  if (!options.skipPrompt && !brandFree) {
    openWatermarkRemovalModal({ resumeId, button, exportMode: "builder" });
    return;
  }
  const originalText = button?.textContent.trim();
  let wrapper = null;
  try {
    if (button) {
      button.disabled = true;
      button.textContent = b.generatingPdf;
    }
    setPdfStatus(button, b.generatingPdf, "loading");
    const format = normalizeDocumentFormat(selectedDocumentFormat);
    const resume = document.querySelector(".builder-page") ? collectBuilderResume() : null;
    const exportJob = buildResumePdfExport({
      template: resume?.selectedTemplate || templateKeyFromDocument(source),
      format,
      resume,
      source,
      brandFree,
    });
    wrapper = exportJob.stage;
    await savePdfExport(exportJob.stage, format, exportJob.filename);
    setPdfStatus(button, b.pdfSuccess, "success");
  } catch (error) {
    setPdfStatus(button, b.pdfError, "error");
  } finally {
    if (wrapper) wrapper.remove();
    if (button) {
      button.disabled = false;
      button.textContent = originalText || b.download;
    }
  }
}

async function exportResumeDataPdf(resumeId, button, options = {}) {
  const resume = findResume(resumeId);
  if (!resume) return;
  const b = t().builder;
  const brandFree = options.forceBranded ? false : canExportWithoutBranding(resumeId);
  if (!options.skipPrompt && !brandFree) {
    openWatermarkRemovalModal({ resumeId, button, exportMode: "data" });
    return;
  }
  const previousFormat = selectedDocumentFormat;
  const originalText = button?.textContent.trim();
  let wrapper = null;
  try {
    selectedDocumentFormat = resume.documentFormat;
    if (button) {
      button.disabled = true;
      button.textContent = b.generatingPdf;
    }
    setPdfStatus(button, b.generatingPdf, "loading");
    const format = normalizeDocumentFormat(resume.documentFormat);
    const exportJob = buildResumePdfExport({
      template: resume.selectedTemplate,
      format,
      resume,
      brandFree,
    });
    wrapper = exportJob.stage;
    await savePdfExport(exportJob.stage, format, exportJob.filename);
    setPdfStatus(button, b.pdfSuccess, "success");
  } catch (error) {
    setPdfStatus(button, b.pdfError, "error");
  } finally {
    selectedDocumentFormat = previousFormat;
    if (wrapper) wrapper.remove();
    if (button) {
      button.disabled = false;
      button.textContent = originalText || resumeLabels().downloadPdf;
    }
  }
}

function languageSwitch(compact = false) {
  const copy = t();
  return `
    <div class="language-switch ${compact ? "compact" : ""}" aria-label="${copy.nav.languageSelector}">
      <button class="${currentLanguage === "pt" ? "active" : ""}" data-lang="pt">PT</button>
      <button class="${currentLanguage === "en" ? "active" : ""}" data-lang="en">EN</button>
    </div>
  `;
}

function publicHeader() {
  const copy = t();
  return `
    <header class="site-header">
      ${brandLogo()}
      <button class="icon-button nav-toggle" aria-label="${copy.nav.openNavigation}">${icon("menu")}</button>
      <nav class="public-nav" aria-label="${copy.nav.mainNavigation}">
        <div class="public-nav-center">
          <a href="#/" data-route="/">${copy.nav.home}</a>
          <a href="#features">${copy.nav.features}</a>
          <a href="#/templates" data-route="/templates">${copy.nav.templates}</a>
          <a href="#/pricing" data-route="/pricing">${copy.nav.pricing}</a>
          <a href="/blog" data-route="/blog">${copy.nav.blog}</a>
        </div>
        <div class="public-nav-actions">
          <div class="nav-preferences">
            ${languageSwitch()}
            ${themeToggle()}
          </div>
          <a class="ghost-button" href="#/signin" data-route="/signin">${copy.nav.signIn}</a>
          <a class="primary-button small" href="#/signup" data-route="/signup">${copy.nav.getStarted}</a>
        </div>
      </nav>
    </header>
  `;
}

function renderHome() {
  const copy = t();
  const p = copy.public;
  const seo = localizedSeo("home");
  mount(`
    <div class="public-shell home-shell">
      ${publicHeader()}
      <main>
        <section class="hero">
          <div class="hero-copy">
            <div class="eyebrow">${icon("sparkles")} ${p.eyebrow}</div>
            <h1>${p.heroTitle}</h1>
            <p>${p.heroSubtitle}</p>
            <div class="hero-actions">
              <a class="primary-button" href="#/signup" data-route="/signup">${p.primaryCta} ${icon("arrow")}</a>
              <a class="secondary-button" href="#templates">${p.secondaryCta}</a>
            </div>
            <div class="trust-row">${p.trust.map((item) => `<span>${item}</span>`).join("")}</div>
          </div>
          <div class="hero-visual" aria-label="${p.secondaryCta}">
            <div class="editor-panel">
              <div class="panel-top"><span></span><span></span><span></span></div>
              <div class="editor-grid">
                <div class="editor-form">
                  <div class="field-line wide"></div>
                  <div class="field-line"></div>
                  <div class="field-line short"></div>
                  <button class="ai-improve-button">${icon("sparkles")} ${p.editorButton}</button>
                  <div class="suggestion-card ai-suggestion-card">
                    <strong>${p.aiSuggestion}</strong>
                    <p>${p.aiSuggestionText}</p>
                    <div class="ai-message-rotator">${(p.aiMessages || []).map((message, index) => `<span class="${index === 0 ? "active" : ""}">${message}</span>`).join("")}</div>
                  </div>
                </div>
                <div class="resume-preview mini">
                  <div class="resume-template-hint">${p.templateApplied}</div>
                  <div class="resume-head"></div>
                  <div class="resume-title"></div>
                  <div class="resume-lines resume-line-live"></div>
                  <div class="resume-lines short"></div>
                  <div class="resume-section resume-section-improved"></div>
                  <div class="resume-lines resume-line-live"></div>
                  <div class="resume-lines resume-line-live short-shift"></div>
                  <div class="resume-section resume-section-improved delay"></div>
                  <div class="resume-pill-row"><span></span><span></span><span></span></div>
                </div>
              </div>
            </div>
            <div class="floating-score">
              <div class="score-card-heading">
                <span class="score-label">${p.resumeScore}</span>
                <span class="score-status">${p.resumeScoreStatus}</span>
              </div>
              <div class="score-result-row">
                <strong class="score-cycle"><span>72%</span><span>81%</span><span>86%</span></strong>
                <span class="score-delta">${p.resumeScoreDelta}</span>
              </div>
              <div class="score-progress" aria-hidden="true"><span></span></div>
              <div class="score-ai-note"><span></span>${p.resumeScoreNote}</div>
            </div>
          </div>
          <div class="hero-value-strip">
            ${p.heroValues.map(([name, title, description]) => `
              <article class="hero-value-card">
                <div class="hero-value-icon">${icon(name)}</div>
                <div><strong>${title}</strong><span>${description}</span></div>
              </article>
            `).join("")}
          </div>
        </section>

        <section id="features" class="section">
          <div class="section-heading"><span class="eyebrow">${p.featuresEyebrow}</span><h2>${p.featuresTitle}</h2><p>${p.featuresSubtitle}</p></div>
          <div class="feature-grid">${p.features.map(([name, title, description], index) => `<article class="feature-card"><div class="feature-card-top"><div class="feature-icon">${icon(name)}</div><span>${String(index + 1).padStart(2, "0")}</span></div><h3>${title}</h3><p>${description}</p></article>`).join("")}</div>
          <div class="features-cta">
            <h3>${p.featuresCtaTitle}</h3>
            <a class="primary-button" href="#/signup" data-route="/signup">${p.primaryCta} ${icon("arrow")}</a>
          </div>
        </section>

        <section class="section trust-section">
          <div class="section-heading"><span class="eyebrow">Succeedora</span><h2>${p.trustSectionTitle}</h2></div>
          <div class="trust-card-grid">
            ${p.trustCards.map(([name, title, description]) => `<article class="trust-card"><div class="feature-icon">${icon(name)}</div><h3>${title}</h3><p>${description}</p></article>`).join("")}
          </div>
          <div class="testimonial-preview">
            <div>
              <span class="eyebrow">${p.testimonialsTitle}</span>
              <h3>${p.testimonialsSubtitle}</h3>
            </div>
            <div class="testimonial-placeholders" aria-hidden="true">
              <span></span><span></span><span></span>
            </div>
          </div>
        </section>

        <section class="section split-band">
          <div class="section-heading left"><span class="eyebrow">${p.howEyebrow}</span><h2>${p.howTitle}</h2></div>
          <div class="steps">${p.steps.map(([step, description], index) => `<article class="step-card"><span>${String(index + 1).padStart(2, "0")}</span><h3>${step}</h3><p>${description}</p></article>`).join("")}</div>
        </section>

        <section id="templates" class="section">
          <div class="section-heading"><span class="eyebrow">${p.templatesEyebrow}</span><h2>${p.templatesTitle}</h2><p>${p.templatesSubtitle}</p></div>
          <div class="template-grid">${resumeTemplates().map((template, index) => templateCard(template, index, false)).join("")}</div>
          <div class="templates-cta">
            <h3>${p.templatesCtaTitle}</h3>
            <a class="primary-button" href="#/signup" data-route="/signup">${p.primaryCta} ${icon("arrow")}</a>
          </div>
        </section>

        <section id="pricing" class="section pricing-section">
          <div class="section-heading"><span class="eyebrow">${p.pricingEyebrow}</span><h2>${p.pricingTitle}</h2></div>
          <div class="pricing-grid">${copy.pricing.plans.map((plan, index) => pricingCard(plan[0], plan[1], plan[2], index === 1, index === 1 ? copy.pricing.bestForMost : "", index, "home")).join("")}</div>
          <div class="one-time-teaser">
            <div>
              <span class="eyebrow">${copy.pricing.oneTimeTitle}</span>
              <h3>${copy.pricing.landingOneTimeTitle}</h3>
              <p>${copy.pricing.landingOneTimeText}</p>
            </div>
            <a class="secondary-button" href="#/pricing" data-route="/pricing">${copy.pricing.viewAllOptions}</a>
          </div>
        </section>

        <section id="faq" class="section faq-section">
          <div class="section-heading"><span class="eyebrow">${p.faqEyebrow}</span><h2>${p.faqTitle}</h2></div>
          <div class="faq-grid">${p.faq.map(([q, a]) => `<article class="faq-item"><h3>${q}</h3><p>${a}</p></article>`).join("")}</div>
        </section>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${p.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    ...seo,
    canonical: seoUrl("/"),
    ogTitle: seo.title,
    ogDescription: seo.description,
  });
}

function templateCard(template, index, compact = true) {
  const copy = t();
  const p = copy.public;
  const accessLabel = template.access === "free" ? copy.dashboard.free : copy.dashboard.pro;
  return `
    <article class="template-card resume-template-card template-${template.key}">
      ${templateCardPreviewMarkup(template.key)}
      <div class="template-card-meta">
        <div class="template-card-badges">
          <span>${template.category}</span>
          <span class="${template.access === "free" ? "free" : "pro"}">${accessLabel}</span>
        </div>
        <h3>${template.name}</h3>
        <p>${template.description}</p>
        ${compact ? "" : `<p class="template-best"><strong>${copy.dashboard.bestFor}:</strong> ${template.bestForText}</p>`}
        ${compact ? "" : `<div class="template-actions"><button class="ghost-button small" type="button" data-template-preview="${template.key}" data-preview-context="public">${p.viewTemplate}</button><button class="secondary-button small" type="button" data-use-template="${template.key}" data-template-destination="signup">${copy.dashboard.useTemplate}</button></div>`}
      </div>
    </article>
  `;
}

function templateCardPreviewMarkup(templateKey, format = selectedDocumentFormat) {
  return `<div class="resume-thumbnail template-sample-thumb">${sampleResumeDocument(templateKey, format)}</div>`;
}

function templatePreviewMarkup(style = "modern", format = selectedDocumentFormat) {
  return `
    <div class="template-paper preview-${style} preview-format-${normalizeDocumentFormat(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
      <div class="template-doc-head">
        <span></span>
        <strong>Amanda Silva</strong>
        <em>Product Manager</em>
      </div>
      <div class="template-doc-body">
        <aside>
          <b></b><i></i><i></i>
          <div class="template-skill-row"><span></span><span></span><span></span></div>
        </aside>
        <main>
          <section><b></b><i></i><i></i><i></i></section>
          <section><b></b><i></i><i></i></section>
          <section><b></b><div class="template-skill-row"><span></span><span></span><span></span></div></section>
        </main>
      </div>
    </div>
  `;
}

function planKeyForIndex(index) {
  return ["free", "pro", "premium"][index] || "free";
}

function currentPlanText(access = getUserAccess()) {
  return `${t().pricing.currentPlanLabel}: ${accessPlanLabel(access)}`;
}

function pricingActionButton(planKey, featured, mode, isCurrent) {
  const copy = t();
  if (isCurrent) {
    return `<button class="secondary-button full" type="button" disabled>${copy.pricing.currentPlanLabel}</button>`;
  }
  if (mode === "home") {
    return `<button class="${featured ? "primary-button" : "secondary-button"} full" type="button" disabled>${copy.pricing.comingSoon}</button>`;
  }
  if (planKey === "free" && mode === "public") {
    return `<a class="secondary-button full" href="#/signup" data-route="/signup">${copy.pricing.choose}</a>`;
  }
  return `<button class="${featured ? "primary-button" : "secondary-button"} full" type="button" data-plan-placeholder>${copy.pricing.comingSoon}</button>`;
}

function pricingCard(name, price, items, featured, badge = "", index = 0, mode = "public") {
  const copy = t();
  const access = getUserAccess();
  const planKey = planKeyForIndex(index);
  const isCurrent = access.plan === planKey;
  const showCurrentState = mode !== "home" && isCurrent;
  const label = showCurrentState ? copy.pricing.currentPlanLabel : badge;
  const paymentLabel = mode === "home" ? `<span class="payment-soon-label">${copy.pricing.paymentComingSoon}</span>` : "";
  const paymentNote = planKey === "free" || mode === "home" ? "" : `<p class="planned-payment-note">${copy.pricing.planPaymentNote}</p>`;
  return `
    <article class="price-card ${mode === "home" ? "homepage-price-card" : ""} ${featured ? "featured" : ""} ${showCurrentState ? "current-plan-card" : ""}" data-plan="${planKey}">
      ${label ? `<div class="popular ${showCurrentState ? "current" : ""}">${label}</div>` : ""}
      <h3>${name}</h3><div class="price"><strong>${price}</strong><span>${copy.pricing.perMonth}</span></div>
      ${paymentLabel}
      ${paymentNote}
      <ul>${items.map((item) => `<li>${icon("check")} ${item}</li>`).join("")}</ul>
      ${pricingActionButton(planKey, featured, mode, showCurrentState)}
    </article>
  `;
}

function purchaseCard(name, price, label, items, featured = false, cta = "", productType = "premium_pdf") {
  const copy = t();
  return `
    <article class="price-card purchase-card ${featured ? "featured" : ""}">
      ${label ? `<div class="popular subtle">${label}</div>` : ""}
      <span class="plan-kicker">${copy.pricing.oneTime}</span>
      <h3>${name}</h3>
      <div class="price"><strong>${price}</strong></div>
      <p class="planned-payment-note">${copy.pricing.oneTimePaymentNote}</p>
      <ul>${items.map((item) => `<li>${icon("check")} ${item}</li>`).join("")}</ul>
      <button class="${featured ? "primary-button" : "secondary-button"} full" type="button" data-one-time-purchase data-pix-product="${productType}">${copy.pricing.comingSoon}</button>
    </article>
  `;
}

function creditCard(name, price, badge, items, featured = false) {
  const copy = t();
  return `
    <article class="price-card credit-card ${featured ? "featured" : ""}">
      ${badge ? `<div class="popular">${badge}</div>` : ""}
      <span class="plan-kicker">${copy.pricing.creditsTitle}</span>
      <h3>${name}</h3>
      <div class="price"><strong>${price}</strong></div>
      <p class="planned-payment-note">${copy.pricing.creditPaymentNote}</p>
      <ul>${items.map((item) => `<li>${icon("sparkles")} ${item}</li>`).join("")}</ul>
      <button class="${featured ? "primary-button" : "secondary-button"} full" type="button" data-buy-credits data-pix-product="ai_credits">${copy.pricing.comingSoon}</button>
    </article>
  `;
}

function pricingComparisonTable() {
  const pricing = t().pricing;
  const planNames = pricing.plans.map((plan) => plan[0]);
  return `
    <section class="plan-comparison-card">
      <div class="section-heading">
        <span class="eyebrow">${pricing.featureComparisonTitle}</span>
        <h2>${pricing.featureComparisonSubtitle}</h2>
      </div>
      <div class="comparison-table-wrap">
        <table class="plan-comparison-table">
          <thead><tr><th>${pricing.featureComparisonTitle}</th>${planNames.map((name) => `<th>${name}</th>`).join("")}</tr></thead>
          <tbody>
            ${pricing.comparisonRows.map((row) => `<tr><th>${row[0]}</th><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td></tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function plannedPaymentMethodsSection() {
  const pricing = t().pricing;
  return `
    <section class="monetization-block planned-payments-card">
      <div class="section-heading">
        <span class="eyebrow">${pricing.plannedPaymentMethodsStatus}</span>
        <h2>${pricing.plannedPaymentMethodsTitle}</h2>
        <p>${pricing.plannedPaymentMethodsText}</p>
      </div>
      <div class="payment-method-grid">
        ${pricing.paymentMethods.map(([name, description]) => `
          <article class="payment-method-card">
            <strong>${name}</strong>
            <span>${description}</span>
          </article>
        `).join("")}
      </div>
      <div class="payment-rules-grid">
        <article>
          <h3>${pricing.oneTimePaymentsTitle}</h3>
          <p>${pricing.oneTimePaymentsText}</p>
          <div class="payment-chip-row">${pricing.oneTimePaymentExamples.map((item) => `<span>${item}</span>`).join("")}</div>
          <p>${pricing.pixOnlyText}</p>
        </article>
        <article>
          <h3>${pricing.subscriptionsTitle}</h3>
          <p>${pricing.subscriptionsText}</p>
          <p>${pricing.stripeCardText}</p>
        </article>
        <article>
          <h3>${pricing.installmentPaymentsTitle}</h3>
          <p>${pricing.installmentPaymentsText}</p>
        </article>
      </div>
    </section>
  `;
}

function paymentHistorySection() {
  const labels = t().payments;
  const requests = loadPaymentRequests();
  return `
    <section class="settings-card payment-history-card">
      <div class="settings-card-head">
        <div><span class="eyebrow">Pix</span><h2>${labels.historyTitle}</h2></div>
      </div>
      ${requests.length ? `
        <div class="payment-history-list">
          ${requests.map((request) => `
            <article class="payment-history-item">
              <div>
                <strong>${escapeHtml(request.productName)}</strong>
                <span>${escapeHtml(formatPaymentDate(request.createdAt))}</span>
              </div>
              <div>
                <span>${escapeHtml(formatCurrencyBRL(request.amount))}</span>
                <small>${escapeHtml(labels.method)}: Pix</small>
              </div>
              <em class="payment-status status-${escapeHtml(request.status)}">${escapeHtml(paymentStatusLabel(request.status))}</em>
            </article>
          `).join("")}
        </div>
      ` : `<p>${labels.historyEmpty}</p>`}
    </section>
  `;
}

function monetizationSections(mode = "public") {
  const copy = t();
  const pricing = copy.pricing;
  const pageClass = mode === "dashboard" ? "dashboard-monetization" : "public-monetization";
  return `
    <div class="monetization ${pageClass}">
      <div class="pricing-tabs" role="tablist" aria-label="${pricing.viewAllOptions}">
        <button class="active" data-pricing-tab="monthly" type="button">${pricing.monthlyTitle}</button>
        <button data-pricing-tab="one-time" type="button">${pricing.oneTimeTitle}</button>
        <button data-pricing-tab="credits" type="button">${pricing.creditsTitle}</button>
      </div>

      <section class="monetization-block pricing-tab-panel active" data-pricing-panel="monthly">
        <div class="section-heading">
          <span class="eyebrow">${pricing.monthlyTitle}</span>
          <h2>${pricing.monthlySubtitle}</h2>
        </div>
        <div class="pricing-grid">${pricing.plans.map((plan, index) => pricingCard(plan[0], plan[1], plan[2], index === 1, index === 1 ? pricing.bestForMost : "", index, mode)).join("")}</div>
        ${pricingComparisonTable()}
      </section>

      ${plannedPaymentMethodsSection()}

      <section class="monetization-block pricing-tab-panel" data-pricing-panel="one-time">
        <div class="section-heading">
          <span class="eyebrow">${pricing.oneTimeTitle}</span>
          <h2>${pricing.oneTimeSubtitle}</h2>
        </div>
          <div class="option-grid">${pricing.oneTimeOptions.map((option, index) => purchaseCard(option[0], option[1], option[2], option[3], index === 2, index === 0 ? pricing.watermark.button : pricing.purchaseCtas[index - 1], ["remove_watermark", "premium_pdf", "career_pack", "premium_template", "online_resume_link"][index] || "premium_pdf")).join("")}</div>
      </section>

      <section class="monetization-block credits-band pricing-tab-panel" data-pricing-panel="credits">
        <div class="credits-copy">
          <span class="eyebrow">${pricing.creditsTitle}</span>
          <h2>${pricing.creditsSubtitle}</h2>
          <div class="credit-uses">
            <strong>${pricing.creditsUsageTitle}</strong>
            <div>${pricing.creditUses.map((use) => `<span>${use}</span>`).join("")}</div>
          </div>
        </div>
        <div class="credits-grid">${pricing.creditPackages.map((pack, index) => creditCard(pack[0], pack[1], index === 1 ? pricing.bestValue : index === 2 ? pricing.multipleApplications : pack[2], pack[3], index === 1)).join("")}</div>
      </section>

      <section class="monetization-block payment-faq">
        <div class="section-heading">
          <span class="eyebrow">FAQ</span>
          <h2>${pricing.paymentFaqTitle}</h2>
        </div>
        <div class="faq-grid">${pricing.paymentFaq.map(([q, a]) => `<article class="faq-item"><h3>${q}</h3><p>${a}</p></article>`).join("")}</div>
      </section>
    </div>
  `;
}

function renderPricingPage() {
  const copy = t();
  const seo = localizedSeo("pricing");
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="pricing-page">
        <section class="pricing-hero">
          <span class="eyebrow">${copy.nav.pricing}</span>
          <h1>${copy.pricing.pricingPageTitle}</h1>
          <p>${copy.pricing.monthlySubtitle} ${copy.pricing.oneTimeSubtitle}</p>
        </section>
        ${monetizationSections("public")}
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    ...seo,
    canonical: seoUrl("/pricing"),
    ogTitle: seo.title,
    ogDescription: seo.description,
  });
}

function legalFooterLinks() {
  const copy = t();
  return `<nav class="legal-footer-links"><a href="/blog" data-route="/blog">${copy.nav.blog}</a><a href="#/terms" data-route="/terms">${copy.nav.termsShort}</a><a href="#/privacy" data-route="/privacy">${copy.nav.privacyShort}</a><a href="#/contact" data-route="/contact">${copy.nav.contact}</a></nav>`;
}

function renderLegalPage(type) {
  const copy = t();
  const legal = copy.legal;
  const title = type === "terms" ? legal.termsTitle : legal.privacyTitle;
  const sections = type === "terms" ? legal.terms : legal.privacy;
  const seo = localizedSeo(type);
  const backLink = isLoggedIn() ? `<a class="secondary-button legal-back-dashboard" href="#/dashboard" data-route="/dashboard">${copy.settings.backToDashboard}</a>` : "";
  mount(`
    <div class="public-site">
      ${publicHeader()}
      <main class="legal-page">
        <section class="legal-hero">
          <span class="eyebrow">Succeedora</span>
          <h1>${title}</h1>
          <p>${legal.intro}</p>
          <span>${legal.updated}</span>
          ${backLink}
        </section>
        <section class="legal-card">
          ${sections.map(([heading, text]) => `<article><h2>${heading}</h2><p>${text}</p></article>`).join("")}
          <p class="legal-contact">${legal.contact}</p>
        </section>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    ...seo,
    canonical: seoUrl(`/${type}`),
    ogTitle: seo.title,
    ogDescription: seo.description,
  });
}

function renderTermsPage() {
  renderLegalPage("terms");
}

function renderPrivacyPage() {
  renderLegalPage("privacy");
}

function renderContactPage() {
  const copy = t();
  const seo = localizedSeo("contact");
  const title = currentLanguage === "pt" ? "Contato" : "Contact";
  const intro = currentLanguage === "pt"
    ? "Entre em contato com a Succeedora para dúvidas, suporte e sugestões sobre a plataforma."
    : "Contact Succeedora for questions, support and suggestions about the platform.";
  const supportNote = currentLanguage === "pt"
    ? "Para dúvidas sobre conta, currículos, cartas, pagamentos ou privacidade, entre em contato pelo e-mail informado."
    : "For questions about account, resumes, letters, payments or privacy, contact us using the email provided.";
  const sections = currentLanguage === "pt"
    ? [
        ["Suporte", supportNote],
        ["Privacidade", "Dúvidas sobre dados de conta, currículos, cartas ou pagamentos também podem ser enviadas para o mesmo endereço."],
      ]
    : [
        ["Support", supportNote],
        ["Privacy", "Questions about account data, resumes, letters or payments can also be sent to the same address."],
      ];
  mount(`
    <div class="public-site">
      ${publicHeader()}
      <main class="legal-page">
        <section class="legal-hero">
          <span class="eyebrow">Succeedora</span>
          <h1>${title}</h1>
          <p>${intro}</p>
          <a class="primary-button" href="mailto:contato@succeedora.com">contato@succeedora.com</a>
        </section>
        <section class="legal-card">${sections.map(([heading, text]) => `<article><h2>${heading}</h2><p>${text}</p></article>`).join("")}</section>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    ...seo,
    canonical: seoUrl("/contact"),
    ogTitle: seo.title,
    ogDescription: seo.description,
  });
}

function renderCookiesPage() {
  const copy = t();
  const title = copy.dashboard.cookies || "Cookies";
  const sections = currentLanguage === "pt"
    ? [
        ["Uso de cookies", "A Succeedora pode usar cookies essenciais para manter preferencias, sessao local e funcionamento do produto."],
        ["Analytics", "Ferramentas de analytics podem ser adicionadas no futuro para melhorar confiabilidade e experiencia."],
        ["Controle", "Quando cookies nao essenciais forem usados, a experiencia deve oferecer controles claros ao usuario."],
      ]
    : [
        ["Cookie use", "Succeedora may use essential cookies for preferences, local sessions and product functionality."],
        ["Analytics", "Analytics tools may be added later to improve reliability and experience."],
        ["Control", "When non-essential cookies are used, the experience should provide clear user controls."],
      ];
  mount(`
    <div class="public-site">
      ${publicHeader()}
      <main class="legal-page">
        <section class="legal-hero"><span class="eyebrow">${title}</span><h1>${title}</h1><p>${copy.legal.intro}</p></section>
        <section class="legal-card">${sections.map(([heading, text]) => `<article><h2>${heading}</h2><p>${text}</p></article>`).join("")}</section>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `);
}

function renderPublicTemplatesPage() {
  const copy = t();
  const p = copy.public;
  const seo = localizedSeo("templates");
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="section public-templates-page">
        <div class="section-heading"><span class="eyebrow">${p.templatesEyebrow}</span><h1>${p.templatesTitle}</h1><p>${p.templatesSubtitle}</p></div>
        <div class="template-grid">${resumeTemplates().map((template, index) => templateCard(template, index, false)).join("")}</div>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    ...seo,
    canonical: seoUrl("/templates"),
    ogTitle: seo.title,
    ogDescription: seo.description,
  });
}

function renderBlogPage() {
  const copy = t();
  const blog = BLOG_COPY[currentLanguage];
  const seo = localizedSeo("blog");
  const posts = blogPostsForLanguage();
  const [featured, ...rest] = posts;
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="blog-page">
        <section class="blog-hero">
          <div class="blog-hero-copy">
            <span class="eyebrow">${copy.nav.blog}</span>
            <h1>${blog.title}</h1>
            <p>${blog.subtitle}</p>
          </div>
          <div class="blog-hero-visual" aria-hidden="true">
            <div class="blog-insight-card">
              <span>${blog.insightTitle}</span>
              <strong>86%</strong>
              <small>${currentLanguage === "pt" ? "clareza do currículo" : "resume clarity"}</small>
              <div class="blog-score-line"><i></i></div>
            </div>
            <div class="blog-document-card">
              <b></b><i></i><i></i><i></i>
              <div>${blog.insightItems.map((item) => `<span>${item}</span>`).join("")}</div>
            </div>
          </div>
        </section>
        <section class="blog-layout">
          <div class="blog-controls">
            <label class="blog-search">
              <span>${blog.searchPlaceholder}</span>
              <input type="search" data-blog-search placeholder="${blog.searchPlaceholder}" />
            </label>
            <label class="blog-category-select">
              <span>${currentLanguage === "pt" ? "Categorias" : "Categories"}</span>
              <select data-blog-category-select aria-label="${currentLanguage === "pt" ? "Categorias" : "Categories"}">
                <option value="all">${blog.allCategories}</option>
                ${blog.categories.map((category) => `<option value="${category}">${category}</option>`).join("")}
              </select>
            </label>
          </div>
          ${featured ? `
            <article class="featured-blog-card" data-blog-card data-category="${featured.category}" data-search="${blogSearchText(featured)}">
              <div>
                <span class="eyebrow">${blog.featured}</span>
                <h2>${featured.title}</h2>
                <p>${featured.excerpt}</p>
                <div class="blog-meta"><span>${featured.category}</span><span>${featured.readingTime}</span><span>${formatBlogDate(featured.publishedDate)}</span></div>
              </div>
              <div class="featured-blog-visual" aria-hidden="true">
                <span>${featured.category}</span>
                <b></b><i></i><i></i><i></i>
                <small>${currentLanguage === "pt" ? "Checklist de candidatura" : "Application checklist"}</small>
              </div>
              <a class="primary-button" href="/blog/${featured.slug}" data-route="/blog/${featured.slug}">${blog.readArticle} ${icon("arrow")}</a>
            </article>
          ` : ""}
          <div class="blog-grid">
            ${rest.map((post) => blogCard(post)).join("")}
          </div>
          <p class="blog-empty" data-blog-empty hidden>${blog.noResults}</p>
          ${blogClusterSection(blog)}
          <section class="blog-bottom-cta">
            <div>
              <span class="eyebrow">${copy.nav.blog}</span>
              <h2>${blog.blogCtaTitle}</h2>
              <p>${blog.blogCtaText}</p>
            </div>
            <a class="primary-button" href="#/signup" data-route="/signup">${blog.ctaButton} ${icon("arrow")}</a>
          </section>
        </section>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    title: currentLanguage === "pt" ? "Blog da Succeedora | Currículos, carreira e candidaturas" : "Succeedora Blog | Resumes, career and applications",
    description: seo.description,
    title: seo.title,
    canonical: seoUrl("/blog"),
    ogTitle: seo.title,
    ogDescription: seo.description,
  });
}

function renderBlogArticlePage(slug) {
  const post = findBlogPostBySlug(slug);
  if (!post) {
    renderBlogPage();
    return;
  }
  if (post.language !== currentLanguage) currentLanguage = post.language;
  const copy = t();
  const blog = BLOG_COPY[currentLanguage];
  const related = relatedBlogPosts(post);
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="blog-article-page">
        <div class="blog-article-layout">
          <aside class="blog-toc">
            <span>${currentLanguage === "pt" ? "Neste guia" : "In this guide"}</span>
            ${post.content.map((section, index) => `<a href="#section-${index + 1}">${section.heading}</a>`).join("")}
          </aside>
          <article class="blog-article">
            <header class="blog-article-hero">
              <a class="blog-back-link" href="/blog" data-route="/blog">${copy.nav.blog}</a>
              <span class="eyebrow">${post.category}</span>
              <h1>${post.title}</h1>
              <p>${post.subtitle}</p>
              <div class="blog-meta"><span>${blog.published}: ${formatBlogDate(post.publishedDate)}</span><span>${post.readingTime}</span></div>
            </header>
            <div class="blog-article-body">
              ${post.content.map((section, index) => `
                <section id="section-${index + 1}">
                  <h2>${section.heading}</h2>
                  ${section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
                  ${index === post.content.length - 1 ? blogArticleChecklist() : ""}
                </section>
              `).join("")}
            </div>
            <aside class="blog-cta-card">
              <div>
                <h2>${blog.ctaTitle}</h2>
                <p>${blog.ctaText}</p>
              </div>
              <a class="primary-button" href="#/signup" data-route="/signup">${blog.ctaButton} ${icon("arrow")}</a>
            </aside>
          </article>
        </div>
        <section class="related-blog-section">
          <div class="section-heading"><span class="eyebrow">${copy.nav.blog}</span><h2>${blog.relatedTitle}</h2></div>
          <div class="blog-grid">${related.map((item) => blogCard(item)).join("")}</div>
        </section>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    title: post.metaTitle,
    description: post.metaDescription,
    canonical: seoUrl(`/blog/${post.slug}`),
    ogTitle: post.title,
    ogDescription: post.metaDescription,
    type: "article",
    alternates: blogArticleAlternates(post),
  });
}

function blogPostsForLanguage(language = currentLanguage) {
  return BLOG_POSTS.filter((post) => post.language === language);
}

function findBlogPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.slug === slug) || null;
}

function blogArticleAlternates(post) {
  const translatedSlug = equivalentBlogSlug(post.slug, post.language === "pt" ? "en" : "pt");
  const translatedPost = translatedSlug !== post.slug ? findBlogPostBySlug(translatedSlug) : null;
  const alternates = [{ hreflang: post.language === "pt" ? "pt-BR" : "en", href: seoUrl(`/blog/${post.slug}`) }];
  if (translatedPost) alternates.push({ hreflang: translatedPost.language === "pt" ? "pt-BR" : "en", href: seoUrl(`/blog/${translatedPost.slug}`) });
  alternates.push({ hreflang: "x-default", href: post.language === "en" ? seoUrl(`/blog/${post.slug}`) : seoUrl(`/blog/${translatedPost?.slug || post.slug}`) });
  return alternates;
}

function equivalentBlogSlug(slug, language) {
  const pair = BLOG_SLUG_TRANSLATIONS.find(([ptSlug, enSlug]) => ptSlug === slug || enSlug === slug);
  if (!pair) return slug;
  return language === "pt" ? pair[0] : pair[1];
}

function relatedBlogPosts(post) {
  const sameLanguage = blogPostsForLanguage(post.language).filter((item) => item.slug !== post.slug);
  return [...sameLanguage.filter((item) => item.category === post.category), ...sameLanguage.filter((item) => item.category !== post.category)].slice(0, 3);
}

function blogSearchText(post) {
  return `${post.title} ${post.subtitle} ${post.excerpt} ${post.category}`.toLowerCase();
}

function blogClusterSection(blog) {
  return `
    <section class="blog-cluster-section">
      <div class="section-heading">
        <span class="eyebrow">${currentLanguage === "pt" ? "Guias" : "Guides"}</span>
        <h2>${blog.clusterTitle}</h2>
      </div>
      <div class="blog-cluster-grid">
        ${blog.clusterLinks.map(([label, slug]) => `
          <a class="blog-cluster-link" href="/blog/${slug}" data-route="/blog/${slug}">
            <span>${categoryMiniIcon(label)}</span>
            <strong>${label}</strong>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

function formatBlogDate(date) {
  try {
    return new Intl.DateTimeFormat(currentLanguage === "pt" ? "pt-BR" : "en", { year: "numeric", month: "short", day: "numeric" }).format(new Date(`${date}T00:00:00`));
  } catch (error) {
    return date;
  }
}

function blogArticleChecklist() {
  return currentLanguage === "pt"
    ? `<h3>Antes de enviar</h3><p>Revise clareza, dados de contato, palavras-chave da vaga e consistência visual. Pequenos ajustes podem deixar o documento mais fácil de ler.</p>`
    : `<h3>Before you send</h3><p>Review clarity, contact details, job keywords and visual consistency. Small edits can make the document easier to read.</p>`;
}

function blogCard(post) {
  const blog = BLOG_COPY[post.language];
  return `
    <article class="blog-card" data-blog-card data-category="${post.category}" data-accent="${blogCategoryAccent(post.category)}" data-search="${blogSearchText(post)}">
      <div class="blog-card-accent">${categoryMiniIcon(post.category)}</div>
      <div class="blog-card-top"><span>${post.category}</span><span>${post.readingTime}</span></div>
      <h2>${post.title}</h2>
      <p>${post.excerpt}</p>
      <div class="blog-card-footer">
        <span>${formatBlogDate(post.publishedDate)}</span>
        <a class="secondary-button small" href="/blog/${post.slug}" data-route="/blog/${post.slug}">${blog.readArticle}</a>
      </div>
    </article>
  `;
}

function blogCategoryAccent(category) {
  const normalized = String(category || "").toLowerCase();
  if (normalized.includes("ats")) return "ats";
  if (normalized.includes("carta") || normalized.includes("cover")) return "letter";
  if (normalized.includes("primeiro") || normalized.includes("first")) return "first";
  if (normalized.includes("ingl") || normalized.includes("english")) return "global";
  if (normalized.includes("entrevista") || normalized.includes("interview")) return "interview";
  if (normalized.includes("carreira") || normalized.includes("career")) return "career";
  return "resume";
}

function categoryMiniIcon(category) {
  const accent = blogCategoryAccent(category);
  const label = { ats: "ATS", letter: "CL", first: "01", global: "EN", interview: "IN", career: "CA", resume: "CV" }[accent] || "CV";
  return label;
}

function authShell(innerHtml) {
  const a = t().auth;
  mount(`
    <main class="auth-shell">
      <section class="auth-visual">
        ${brandLogo()}
        <h1>${a.slogan}</h1><p>${a.support}</p>
        <div class="auth-preview"><div class="resume-preview mini light"><div class="resume-head"></div><div class="resume-title"></div><div class="resume-lines"></div><div class="resume-lines short"></div><div class="resume-section"></div><div class="resume-lines"></div></div></div>
      </section>
      ${innerHtml}
    </main>
  `);
}

function renderVerifyEmail() {
  const a = t().auth;
  authShell(`
    <section class="auth-card">
      <div class="auth-card-top"><span class="eyebrow">${a.verifyTitle}</span>${languageSwitch(true)}</div>
      <h2>${a.verifyTitle}</h2>
      <p class="auth-subtitle">${a.verifySubtitle}</p>
      <p class="auth-email-target">${getAuthEmail()}</p>
      <form class="auth-form" data-auth-form="verify">
        <label>${a.verificationCode}<input class="code-input" type="text" name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" placeholder="000000" required /></label>
        <p class="auth-help">${a.codeHelp}</p>
        <p class="auth-error" data-auth-error hidden></p>
        <button class="primary-button full" type="submit" data-auth-submit>${a.verifyButton}</button>
        <button class="secondary-button full" type="button" data-resend-code>${a.resendCode}</button>
      </form>
    </section>
  `);
}

function renderForgotPassword() {
  const a = t().auth;
  authShell(`
    <section class="auth-card">
      <div class="auth-card-top"><span class="eyebrow">${a.forgotPassword}</span>${languageSwitch(true)}</div>
      <h2>${a.resetTitle}</h2>
      <p class="auth-subtitle">${a.resetSubtitle}</p>
      <form class="auth-form" data-auth-form="forgot">
        <label>${a.email}<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="${a.emailPlaceholder}" required /></label>
        <p class="auth-error" data-auth-error hidden></p>
        <p class="settings-message auth-success" data-auth-message hidden></p>
        <button class="primary-button full" type="submit" data-auth-submit>${a.sendCode}</button>
      </form>
      <p class="switch-auth"><a href="#/signin" data-route="/signin">${a.signInLink}</a></p>
    </section>
  `);
}

function renderResetPassword() {
  const a = t().auth;
  authShell(`
    <section class="auth-card">
      <div class="auth-card-top"><span class="eyebrow">${a.resetTitle}</span>${languageSwitch(true)}</div>
      <h2>${a.newPasswordTitle}</h2>
      <p class="auth-subtitle"><strong>${a.resetVerifyTitle}</strong><br>${a.codeHelp}</p>
      <form class="auth-form" data-auth-form="reset">
        <label>${a.email}<input type="email" name="email" autocomplete="email" value="${getAuthEmail()}" required /></label>
        <label>${a.verificationCode}<input class="code-input" type="text" name="code" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" placeholder="000000" required /></label>
        <label>${a.newPassword}<input type="password" name="password" autocomplete="new-password" placeholder="${a.passwordPlaceholder}" required /></label>
        <label>${a.confirmPassword}<input type="password" name="confirmPassword" autocomplete="new-password" placeholder="${a.confirmPassword}" required /></label>
        <p class="auth-error" data-auth-error hidden></p>
        <button class="primary-button full" type="submit" data-auth-submit>${a.updatePassword}</button>
        <button class="secondary-button full" type="button" data-resend-code>${a.resendCode}</button>
      </form>
    </section>
  `);
}

function authLayout(type) {
  const a = t().auth;
  const isSignIn = type === "signin";
  mount(`
    <main class="auth-shell">
      <section class="auth-visual">
        ${brandLogo()}
        <h1>${a.slogan}</h1><p>${a.support}</p>
        <div class="auth-preview"><div class="resume-preview mini light"><div class="resume-head"></div><div class="resume-title"></div><div class="resume-lines"></div><div class="resume-lines short"></div><div class="resume-section"></div><div class="resume-lines"></div><div class="resume-section"></div><div class="resume-pill-row"><span></span><span></span><span></span></div></div></div>
      </section>
      <section class="auth-card">
        <div class="auth-card-top"><div class="auth-card-brand">${brandLogo("div")}</div>${languageSwitch(true)}</div>
        <span class="eyebrow auth-eyebrow">${isSignIn ? a.signInEyebrow : a.signUpEyebrow}</span>
        <h2>${isSignIn ? a.signInTitle : a.signUpTitle}</h2>
        <p class="auth-subtitle">${isSignIn ? a.signInSubtitle : a.signUpSubtitle}</p>
        <form class="auth-form" data-auth-form="${type}">
          ${isSignIn ? "" : `<label>${a.fullName}<input type="text" name="fullName" autocomplete="name" placeholder="${a.fullNamePlaceholder}" required /></label>`}
          <label>${a.email}<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="${a.emailPlaceholder}" required /></label>
          <label><span class="password-label-row"><span>${a.password}</span>${isSignIn ? `<a class="forgot-inline" href="#/forgot-password" data-route="/forgot-password">${a.forgotPassword}</a>` : ""}</span><input type="password" name="password" autocomplete="${isSignIn ? "current-password" : "new-password"}" placeholder="${a.passwordPlaceholder}" required /></label>
          ${isSignIn ? "" : `<label>${a.confirmPassword}<input type="password" name="confirmPassword" autocomplete="new-password" placeholder="${a.confirmPassword}" required /></label>`}
          <p class="auth-error" data-auth-error hidden></p>
          <button class="primary-button full" type="submit" data-auth-submit>${isSignIn ? a.signInButton : a.signUpButton}</button>
        </form>
        <p class="switch-auth">${isSignIn ? a.newUser : a.existingUser} <a href="#/${isSignIn ? "signup" : "signin"}" data-route="/${isSignIn ? "signup" : "signin"}">${isSignIn ? a.createAccount : a.signInLink}</a></p>
      </section>
    </main>
  `);
}

function renderSignIn() {
  authLayout("signin");
}

function renderSignUp() {
  authLayout("signup");
}

function dashboardShell(activeKey, content) {
  restoreSidebarAfterBuilder(activeKey);
  const d = t().dashboard;
  const profile = loadProfile();
  const access = getUserAccess();
  const planLabel = accessPlanLabel(access);
  const nav = [["/dashboard", "layout", "dashboard"], ["/dashboard/resumes", "file", "resumes"], ["/dashboard/builder", "pen", "builder"], ["/dashboard/cover-letters", "mail", "coverLetters"], ["/dashboard/templates", "shield", "templates"], ["/dashboard/ai", "sparkles", "ai"], ["/dashboard/profile", "file", "profile"], ["/dashboard/billing", "card", "billing"], ["/dashboard/settings", "settings", "settings"]];
  const mobileNav = nav.slice(0, 5);
  mount(`
    <div class="app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}">
      <aside class="sidebar">
        <div class="sidebar-head">${brandLogo("a", "#/dashboard", "/dashboard")}<div class="sidebar-head-actions"><button class="icon-button sidebar-collapse-button" type="button" data-sidebar-collapse aria-label="${sidebarCollapsed ? d.expandSidebar : d.collapseSidebar}" title="${sidebarCollapsed ? d.expandSidebar : d.collapseSidebar}" aria-expanded="${!sidebarCollapsed}">${icon("menu")}</button><button class="icon-button sidebar-toggle" aria-label="${d.closeSidebar}">${icon("close")}</button></div></div>
        <nav class="side-nav">${nav.map(([path, iconName, key]) => `<a class="${activeKey === key ? "active" : ""}" href="#${path}" data-route="${path}" title="${d.nav[key]}">${icon(iconName)} <span>${d.nav[key]}</span></a>`).join("")}</nav>
        <div class="sidebar-footer">
          <div class="sidebar-upgrade"><span>${d.proPlan}</span><strong>${d.unlock}</strong><button class="primary-button small" data-route="/dashboard/billing">${d.upgrade}</button></div>
          <button class="sidebar-link-button" data-route="/" title="${d.backToWebsite}">${icon("arrow")} <span>${d.backToWebsite}</span></button>
          <button class="sidebar-link-button danger" data-route="/" data-sign-out title="${d.signOut}">${icon("close")} <span>${d.signOut}</span></button>
        </div>
      </aside>
      <div class="dashboard-main">
        <header class="dashboard-topbar">
          <button class="icon-button sidebar-toggle" aria-label="${d.openSidebar}">${icon("menu")}</button>
          <div><span class="eyebrow">${d.workspace}</span><h1>${d.nav[activeKey]}</h1></div>
          <label class="dashboard-search">${icon("file")}<input type="search" placeholder="${d.searchPlaceholder}" /></label>
          <div class="topbar-actions">
            ${languageSwitch(true)}
            ${themeToggle()}
            <button class="icon-button ai-quick-toggle" type="button" data-route="/dashboard/ai" aria-label="${d.openAiQuick}" title="${d.openAiQuick}">${icon("sparkles")}</button>
            <div class="user-menu-wrap">
              <button class="user-menu" type="button" data-user-menu><span>${escapeHtml(profileInitials(profile))}</span>${escapeHtml(profileFirstName(profile))}</button>
              <div class="user-dropdown">
                <div class="user-dropdown-head"><strong>${escapeHtml(profile.fullName)}</strong><small>${escapeHtml(profile.email)}</small><span>${d.currentPlan}: ${escapeHtml(planLabel)}</span></div>
                <button type="button" data-route="/dashboard/profile">${icon("file")} ${d.nav.profile}</button>
                <button type="button" data-route="/dashboard/settings">${icon("settings")} ${d.nav.settings}</button>
                <button type="button" data-route="/dashboard/billing">${icon("card")} ${d.billing}</button>
                <button type="button" data-route="/">${icon("arrow")} ${d.backToWebsite}</button>
                <button type="button" data-route="/" data-sign-out>${icon("close")} ${d.signOut}</button>
              </div>
            </div>
          </div>
        </header>
        ${content}
        <nav class="mobile-bottom-nav" aria-label="${d.workspace}">
          ${mobileNav.map(([path, iconName, key]) => `<a class="${activeKey === key ? "active" : ""}" href="#${path}" data-route="${path}">${icon(iconName)}<span>${d.nav[key]}</span></a>`).join("")}
        </nav>
      </div>
    </div>
  `);
}

function renderDashboard() {
  const h = t().dashboard.home;
  const accessCopy = t().dashboard.access;
  const access = getUserAccess();
  const resumes = loadResumes();
  const primaryResume = resumes[0];
  const completion = primaryResume ? primaryResume.completion : 0;
  const nextAction = primaryResume ? nextResumeAction(primaryResume) : h.completionText;
  dashboardShell("dashboard", `
    <main class="dashboard-content workspace-home">
      <section class="workspace-hero">
        <div>
          <span class="eyebrow">Succeedora</span>
          <h2>${h.title}</h2>
          <p>${h.text}</p>
          <div class="plan-strip">
            <span>${accessCopy.currentPlan.replace(t().dashboard.free, accessPlanLabel(access))}</span>
            <button class="secondary-button small" data-route="/dashboard/billing">${t().dashboard.upgrade}</button>
            <button class="secondary-button small" data-route="/dashboard/billing">${accessCopy.buyCredits}</button>
            <button class="secondary-button small" type="button" data-watermark-option>${accessCopy.removeWatermark}</button>
          </div>
          <div class="quick-actions">
            <button class="primary-button" data-new-resume data-route="/dashboard/builder">${icon("pen")} ${h.createResume}</button>
            <button class="secondary-button" data-route="/dashboard/ai" data-ai-action="ai">${icon("sparkles")} ${h.improveAi}</button>
            <button class="secondary-button" data-route="/dashboard/cover-letters">${icon("mail")} ${h.createLetter}</button>
          </div>
        </div>
        <article class="main-resume-card">
          <span>${primaryResume ? primaryResume.title : h.mainResume}</span>
          <strong>${completion}%</strong>
          <div class="progress"><span style="width:${completion}%"></span></div>
          <p>${nextAction}</p>
        </article>
      </section>

      <section class="workspace-grid">
        <article class="dash-card resume-status-card">
          <div class="card-head"><h3>${primaryResume ? primaryResume.title : h.mainResume}</h3><span>${completion}%</span></div>
          <p>${nextAction}</p>
          <ul class="task-list">${(primaryResume ? [nextResumeAction(primaryResume)] : h.missing).map((item, index) => `<li>${icon(index === 3 ? "download" : "check")} ${item}</li>`).join("")}</ul>
          <button class="primary-button full" ${primaryResume ? `data-edit-resume="${primaryResume.id}"` : "data-new-resume"} data-route="/dashboard/builder">${primaryResume ? h.resumeActions[0] : h.createResume}</button>
        </article>

        <article class="dash-card ai-tools-card">
          <div class="feature-icon">${icon("sparkles")}</div>
          <h3>${h.aiTitle}</h3>
          <p>${h.aiText}</p>
          <div class="card-actions">
            <button class="primary-button small" data-route="/dashboard/ai" data-ai-action="ai">${h.openAi}</button>
            <button class="secondary-button small" data-route="/dashboard/billing">${h.buyCredits}</button>
          </div>
        </article>

        <article class="dash-card upgrade-card workspace-upgrade">
          <span class="eyebrow">${t().dashboard.upgrade}</span>
          <h3>${h.upgradeTitle}</h3>
          <p>${h.upgradeText}</p>
          <button class="primary-button full" data-route="/dashboard/billing">${h.viewPlans}</button>
        </article>
      </section>

      <section class="dashboard-section">
        <div class="section-row-heading"><h2>${h.recent}</h2><button class="secondary-button small" data-route="/dashboard/resumes">${t().dashboard.nav.resumes}</button></div>
        ${resumes.length ? `<div class="recent-resume-grid">${resumes.slice(0, 3).map((resume) => resumeCard(resume, h.resumeActions)).join("")}</div>` : ""}
      </section>

      <section class="dashboard-section">
        <div class="section-row-heading"><h2>${h.nextSteps}</h2></div>
        <div class="next-step-grid">${h.tasks.map((task, index) => `<article class="next-step-card"><div class="feature-icon">${icon(index === 0 ? "sparkles" : index === 1 ? "target" : index === 2 ? "mail" : index === 3 ? "globe" : "download")}</div><h3>${task}</h3></article>`).join("")}</div>
      </section>

      ${resumes.length ? "" : `<section class="empty-resume-state">
        <div class="feature-icon">${icon("file")}</div>
        <div><h3>${h.emptyTitle}</h3><p>${h.emptyText}</p></div>
        <button class="secondary-button" data-new-resume data-route="/dashboard/builder">${h.emptyButton}</button>
      </section>`}
    </main>
  `);
}

function resumeCard(resume, actions) {
  const template = getTemplateByKey(resume.selectedTemplate);
  return `
    <article class="recent-resume-card">
      <div class="resume-card-top">${icon("file")}<span>${resume.completion}%</span></div>
      <h3>${escapeHtml(resume.title)}</h3>
      <p>${formatResumeDate(resume.updatedAt)}</p>
      <div class="resume-meta"><span>${template.name} · ${resume.documentFormat === "letter" ? "US Letter" : "A4"}</span><div class="progress"><span style="width:${resume.completion}%"></span></div></div>
      <div class="resume-actions">
        <button class="secondary-button small" data-edit-resume="${resume.id}" data-route="/dashboard/builder">${actions[0]}</button>
        <button class="ghost-button small" data-preview-resume="${resume.id}">${actions[1]}</button>
        <button class="ghost-button small" data-pdf-export-resume="${resume.id}">${actions[2]}</button>
      </div>
    </article>
  `;
}

function renderResumes() {
  const copy = t();
  const r = copy.dashboard.resumes;
  const lib = copy.dashboard.library;
  const labels = resumeLabels();
  const resumes = loadResumes();
  const actions = lib.actions;
  dashboardShell("resumes", `
    <main class="dashboard-content">
      <div class="page-actions"><p>${r.intro}</p><button class="primary-button" data-new-resume data-route="/dashboard/builder">${icon("pen")} ${lib.createNew}</button></div>
      ${resumes.length ? `<div class="resume-library">${resumes.map((resume) => {
        const template = getTemplateByKey(resume.selectedTemplate);
        return `<article class="library-card resume-library-card">
          <div class="resume-thumbnail">${resumeDocument(resume.selectedTemplate, resume.documentFormat, resume)}</div>
          <div class="library-meta">
            <h3>${escapeHtml(resume.title)}</h3>
            <p>${lib.lastEdited}: ${formatResumeDate(resume.updatedAt)}</p>
            <div class="resume-meta">
              <span>${lib.template}: ${template.name}</span>
              <span>${copy.builder.documentFormat}: ${resume.documentFormat === "letter" ? copy.builder.usLetter : copy.builder.a4}</span>
              ${Number.isFinite(Number(resume.atsScore)) ? `<span>ATS: ${Number(resume.atsScore)}%</span>` : ""}
              <div class="progress"><span style="width:${resume.completion}%"></span></div>
              <span>${resume.completion}% ${lib.completion}</span>
            </div>
            <div class="resume-actions">
              <button class="secondary-button small" data-edit-resume="${resume.id}" data-route="/dashboard/builder">${actions[0]}</button>
              <button class="ghost-button small" data-preview-resume="${resume.id}">${actions[1]}</button>
              <button class="ghost-button small" data-duplicate-resume="${resume.id}">${labels.duplicate}</button>
              <button class="ghost-button small" data-delete-resume="${resume.id}">${labels.delete}</button>
              <button class="ghost-button small" data-pdf-export-resume="${resume.id}">${labels.downloadPdf}</button>
            </div>
          </div>
        </article>`;
      }).join("")}</div>` : `<section class="empty-resume-state premium-empty">
        <div class="feature-icon">${icon("file")}</div>
        <div><h3>${copy.dashboard.home.emptyTitle}</h3><p>${copy.dashboard.home.emptyText}</p></div>
        <button class="primary-button" data-new-resume data-route="/dashboard/builder">${labels.createFirst}</button>
      </section>`}
    </main>
  `);
}

function builderSectionStatus(resume, index) {
  if (index === 9) return calculateCompletion(resume) >= 80 ? "complete" : "missing";
  const checks = [
    Boolean(resume.personal?.fullName && resume.personal?.email),
    Boolean(resume.summary),
    Boolean(resume.workExperience?.[0]?.company || resume.workExperience?.[0]?.role || resume.workExperience?.[0]?.achievements?.length),
    Boolean(resume.education?.[0]?.school || resume.education?.[0]?.degree),
    Boolean(resume.skills?.length),
    Boolean(resume.languages?.length),
    Boolean(resume.certifications?.length),
    Boolean(resume.projects?.length),
    Boolean(resume.professionalLinks?.length),
  ];
  return checks[index] ? "complete" : "missing";
}

function builderSectionNavButton(label, index, resume) {
  const status = builderSectionStatus(resume, index);
  return `<button class="${index === activeBuilderSectionIndex ? "active " : ""}is-${status}" type="button" data-builder-section="builder-section-${index}" data-section-index="${index}" data-section-status="${status}"><span>${label}</span><em>${status === "complete" ? "✓" : ""}</em></button>`;
}

function missingSectionLabels(resume) {
  return t().builder.sectionNav.filter((_, index) => builderSectionStatus(resume, index) === "missing").slice(0, 4);
}

function updateBuilderSectionNav(resume = collectBuilderResume()) {
  document.querySelectorAll("[data-section-index]").forEach((button) => {
    const index = Number(button.getAttribute("data-section-index"));
    const status = builderSectionStatus(resume, index);
    button.dataset.sectionStatus = status;
    button.classList.toggle("active", index === activeBuilderSectionIndex);
    button.classList.toggle("is-complete", status === "complete");
    button.classList.toggle("is-missing", status !== "complete");
    const marker = button.querySelector("em");
    if (marker) marker.textContent = status === "complete" ? "✓" : "";
  });
  const missingList = document.querySelector("[data-missing-sections]");
  if (missingList) {
    const missing = missingSectionLabels(resume);
    missingList.innerHTML = `<strong>${t().builder.missingTitle}</strong>${missing.length ? missing.map((item) => `<span>${item}</span>`).join("") : `<span>${currentLanguage === "pt" ? "Pronto para revisar" : "Ready to review"}</span>`}`;
  }
}

function renderBuilderTemplateSelection() {
  const copy = t();
  const labels = currentLanguage === "pt"
    ? {
        eyebrow: "Escolha o modelo",
        title: "Comece pelo visual certo para o seu currículo.",
        text: "Selecione um modelo antes de abrir o criador. A prévia, o rascunho salvo e o PDF usarão esta escolha.",
        freeLabel: "Liberado no plano gratuito",
        proLabel: "Disponível para Pro e Premium",
      }
    : {
        eyebrow: "Choose a template",
        title: "Start with the right resume structure.",
        text: "Select a template before opening the builder. Your preview, saved resume and PDF export will use this choice.",
        freeLabel: "Included on the free plan",
        proLabel: "Available for Pro and Premium",
      };
  const templates = resumeTemplates();
  dashboardShell("builder", `
    <main class="dashboard-content builder-template-selection">
      <section class="builder-template-hero">
        <div>
          <span class="eyebrow">${labels.eyebrow}</span>
          <h1>${labels.title}</h1>
          <p>${labels.text}</p>
        </div>
        <button class="secondary-button small" type="button" data-route="/dashboard/templates">${copy.dashboard.nav.templates}</button>
      </section>
      <section class="builder-template-grid">
        ${templates.map((template) => {
          const locked = !canUseTemplate(template.key);
          return `
            <article class="template-card dashboard-template-card builder-template-card template-${template.key} ${locked ? "locked-feature" : ""}" data-template-category="${template.key}" data-template-access="${template.access}">
              <div class="template-card-topline">
                <span class="template-badge">${template.category}</span>
                <span class="template-badge ${template.access === "free" ? "free" : "pro"}">${template.access === "free" ? copy.dashboard.free : copy.dashboard.pro}</span>
              </div>
              ${templateCardPreviewMarkup(template.key)}
              <div class="builder-template-meta">
                <h3>${template.name}</h3>
                <p>${template.access === "free" ? labels.freeLabel : labels.proLabel}</p>
              </div>
              <div class="template-actions">
                <button class="ghost-button small" type="button" data-template-preview="${template.key}" data-preview-context="dashboard">${copy.dashboard.previewTemplate}</button>
                <button class="primary-button small" type="button" data-use-template="${template.key}" data-template-destination="builder">${copy.dashboard.useTemplate}</button>
              </div>
            </article>
          `;
        }).join("")}
      </section>
    </main>
  `);
}

function templateSelectorButton(template) {
  const isPro = template.access === "pro";
  const locked = isPro && !canUseTemplate(template.key);
  return `
    <button class="template-choice ${template.key === selectedTemplateKey ? "active" : ""} ${locked ? "locked" : ""}" type="button" data-resume-template="${template.key}">
      ${templatePreviewMarkup(template.key, selectedDocumentFormat)}
      <span>${template.name}${locked ? ` · ${t().dashboard.pro}` : ""}</span>
    </button>
  `;
}

function templateSelectorButton(template) {
  const isPro = template.access === "pro";
  const locked = isPro && !canUseTemplate(template.key);
  return `
    <button class="template-choice ${template.key === selectedTemplateKey ? "active" : ""} ${locked ? "locked" : ""}" type="button" data-resume-template="${template.key}" aria-pressed="${template.key === selectedTemplateKey}">
      <span>${template.name}</span>
      ${isPro ? `<em>${t().dashboard.pro}</em>` : ""}
    </button>
  `;
}

function renderBuilder() {
  const b = t().builder;
  if (!builderDraft && !currentBuilderResumeId) {
    renderBuilderTemplateSelection();
    return;
  }
  preferCollapsedSidebarForBuilder();
  const draft = ensureBuilderDraft();
  const completion = calculateCompletion(draft);
  const selectedTemplate = getTemplateByKey(selectedTemplateKey);
  dashboardShell("builder", `
    <main class="builder-page">
      <div class="builder-mobile-tabs">
        <button class="active" data-builder-view="edit" type="button">${b.editTab}</button>
        <button data-builder-view="preview" type="button">${b.previewTab}</button>
      </div>

      <div class="builder-exit-row">
        <button class="secondary-button small builder-exit-button" type="button" data-builder-exit>${icon("arrowLeft")} ${b.backToTemplates}</button>
      </div>

      <aside class="builder-flow-sidebar">
        <article class="completion-card">
          <div>
            <span class="eyebrow">${b.pageTitle}</span>
            <h2><span data-completion-value>${completion}%</span> ${currentLanguage === "pt" ? "completo" : "complete"}</h2>
            <div class="progress"><span data-completion-bar style="width:${completion}%"></span></div>
          </div>
          <div class="builder-template-pill">
            <span>${b.selectedTemplate}</span>
            <strong>${selectedTemplate.name}</strong>
          </div>
          <div class="builder-format-compact">
            ${documentFormatSwitch(selectedDocumentFormat, "compact")}
          </div>
        </article>
        <nav class="builder-section-nav" aria-label="${b.pageTitle}">
          ${b.sectionNav.map((item, index) => builderSectionNavButton(item, index, draft)).join("")}
        </nav>
      </aside>

      <section class="builder-form">
        <article class="empty-builder-state">
          ${icon("file")}
          <div>
            <strong data-builder-current-title>${b.sections[activeBuilderSectionIndex]}</strong>
            <p>${b.emptyState}</p>
          </div>
        </article>
        ${b.sections.map((section, index) => builderSectionPanel(section, index)).join("")}
        <div class="builder-step-actions">
          <button class="secondary-button" type="button" data-builder-prev ${activeBuilderSectionIndex === 0 ? "disabled" : ""}>${b.back}</button>
          <button class="primary-button" type="button" data-builder-next ${activeBuilderSectionIndex >= b.sections.length - 1 ? "disabled" : ""}>${b.next}</button>
        </div>
      </section>

      <aside class="builder-preview">
        <div class="builder-preview-frame zoom-fit">${resumeDocument(selectedTemplateKey, selectedDocumentFormat, draft)}</div>
      </aside>
    </main>
  `);
}

function builderSection(title, index) {
  const b = t().builder;
  const aiButton = index === 1 ? b.generateWithAi : index === 2 ? b.improveDescription : index === 4 ? b.suggestSkills : "";
  if (index === 2) {
    return `
      <details class="form-section builder-card" id="builder-section-${index}" open>
        <summary class="form-section-head"><div><span class="section-status">${b.required}</span><h2>${title}</h2><p>${b.helpers.experience}</p></div><button class="secondary-button small" type="button">${icon("sparkles")} ${aiButton}</button></summary>
        <div class="two-col">
          <label>${b.labels.company}<input data-preview-target="experienceCompany" value="NovaTech Solutions" placeholder="Company name" /></label>
          <label>${b.labels.role}<input data-preview-target="experienceRole" value="${b.values.professionalTitle}" placeholder="Role title" /></label>
          <label>${b.labels.period}<input data-preview-target="experiencePeriod" value="2021 - Present" placeholder="2021 - Present" /></label>
          <label>${b.labels.location}<input value="${b.values.location}" placeholder="${b.labels.location}" /></label>
        </div>
        <label>${b.labels.achievements}<textarea data-preview-target="experience" placeholder="${b.placeholders.achievements}">Led product discovery initiatives to improve onboarding and user activation.
Worked with design, engineering and marketing teams to launch new product features.
Used analytics and customer feedback to prioritize roadmap decisions.</textarea></label>
        <div class="section-actions"><button class="secondary-button small">${icon("pen")} ${b.addExperience}</button><button class="ghost-button small">${b.remove}</button></div>
      </details>
    `;
  }
  const fields = [["", ""], [b.labels.summary, b.values.summary], ["", ""], [b.labels.school, b.values.school], [b.labels.skills, b.values.skills], [b.labels.languages, b.values.languages], [b.labels.certifications, b.values.certifications], [b.labels.projects, b.values.projects], [b.labels.links, b.placeholders.links]];
  const [label, value] = fields[index] || [title, ""];
  const helper = index === 1 ? b.helpers.summary : index === 4 ? b.helpers.skills : index === 8 ? b.helpers.links : "";
  return `
    <details class="form-section builder-card" id="builder-section-${index}" open>
      <summary class="form-section-head"><div><span class="section-status">${index < 5 ? b.required : b.optional}</span><h2>${title}</h2>${helper ? `<p>${helper}</p>` : ""}</div>${aiButton ? `<button class="secondary-button small" type="button">${icon("sparkles")} ${aiButton}</button>` : ""}</summary>
      ${index === 0 ? `<div class="two-col"><label>${b.labels.fullName}<input data-preview-target="name" value="Amanda Silva" placeholder="Amanda Silva" /></label><label>${b.labels.title}<input data-preview-target="title" value="${b.values.professionalTitle}" placeholder="${b.labels.title}" /></label><label>${b.labels.email}<input value="${currentLanguage === "pt" ? "amanda@exemplo.com" : "amanda@example.com"}" placeholder="email@example.com" /></label><label>${b.labels.phone}<input placeholder="+55 11 99999-9999" /></label><label>${b.labels.location}<input value="${b.values.location}" placeholder="${b.labels.location}" /></label><label>${b.labels.links}<input placeholder="${b.placeholders.links}" /></label></div>` : index === 3 ? `<div class="two-col"><label>${b.labels.school}<input value="${b.values.school}" /></label><label>${b.labels.degree}<input value="${currentLanguage === "pt" ? "Administração" : "Business Administration"}" /></label></div>` : `<label>${label}<textarea ${index === 1 ? `data-preview-target="summary"` : index === 4 ? `data-preview-target="skills"` : ""} placeholder="${index === 1 ? b.placeholders.summary : index === 4 ? b.placeholders.skills : ""}">${value}</textarea></label>`}
      ${index > 2 ? `<div class="section-actions"><button class="secondary-button small">${b.addItem} ${title}</button></div>` : ""}
    </details>
  `;
}

function builderSectionPanel(title, index) {
  const b = t().builder;
  const resume = ensureBuilderDraft();
  const personal = resume.personal || {};
  const experience = resume.workExperience?.[0] || {};
  const education = resume.education?.[0] || {};
  const value = (item) => escapeHtml(item || "");
  const listValue = (items) => escapeHtml((items || []).join("\n"));
  const aiButton = index === 1 ? b.generateWithAi : index === 2 ? b.improveDescription : index === 4 ? b.suggestSkills : "";
  const status = index < 5 ? b.required : b.optional;
  const helper = index === 1 ? b.helpers.summary : index === 2 ? b.helpers.experience : index === 4 ? b.helpers.skills : index === 8 ? b.helpers.links : "";
  let content = "";
  let actions = index > 2 ? `<div class="section-actions"><button class="secondary-button small">${b.addItem} ${title}</button></div>` : "";

  if (index === 0) {
    const firstName = personal.firstName || String(personal.fullName || "").split(" ")[0] || "";
    const lastName = personal.lastName || String(personal.fullName || "").split(" ").slice(1).join(" ");
    content = `<div class="two-col"><label>${b.labels.firstName}<input data-resume-field="firstName" data-preview-name-part="first" value="${value(firstName)}" placeholder="Amanda" autocomplete="given-name" /></label><label>${b.labels.lastName}<input data-resume-field="lastName" data-preview-name-part="last" value="${value(lastName)}" placeholder="Silva" autocomplete="family-name" /></label><label>${b.labels.title}<input data-resume-field="title" data-preview-source="title" data-preview-target="title" value="${value(personal.title)}" placeholder="${b.labels.title}" /></label><label>${b.labels.email}<input data-resume-field="email" data-preview-source="email" value="${value(personal.email)}" placeholder="email@example.com" autocomplete="email" /></label><label>${b.labels.phone}<input data-resume-field="phone" data-preview-source="phone" value="${value(personal.phone)}" placeholder="+55 11 99999-9999" autocomplete="tel" /></label><label>${b.labels.address}<input data-resume-field="address" data-preview-source="address" value="${value(personal.address)}" placeholder="${b.labels.address}" autocomplete="street-address" /></label><label>${b.labels.city}<input data-resume-field="city" data-preview-source="city" value="${value(personal.city)}" placeholder="${b.labels.city}" autocomplete="address-level2" /></label><label>${b.labels.state}<input data-resume-field="state" data-preview-source="state" value="${value(personal.state)}" placeholder="${b.labels.state}" autocomplete="address-level1" /></label><label>${b.labels.postalCode}<input data-resume-field="postalCode" data-preview-source="postalCode" value="${value(personal.postalCode)}" placeholder="${b.labels.postalCode}" autocomplete="postal-code" /></label></div>`;
  } else if (index === 1) {
    content = `<label>${b.labels.summary}<textarea data-resume-field="summary" data-preview-target="summary" placeholder="${b.placeholders.summary}">${value(resume.summary)}</textarea></label>`;
  } else if (index === 2) {
    content = `<div class="two-col"><label>${b.labels.company}<input data-resume-field="experienceCompany" data-preview-target="experienceCompany" value="${value(experience.company)}" placeholder="Company name" /></label><label>${b.labels.role}<input data-resume-field="experienceRole" data-preview-target="experienceRole" value="${value(experience.role)}" placeholder="Role title" /></label><label>${b.labels.period}<input data-resume-field="experiencePeriod" data-preview-target="experiencePeriod" value="${value(experience.period)}" placeholder="2021 - Present" /></label><label>${b.labels.location}<input data-resume-field="experienceLocation" value="${value(experience.location)}" placeholder="${b.labels.location}" /></label></div><label>${b.labels.achievements}<textarea data-resume-field="experience" data-preview-target="experience" placeholder="${b.placeholders.achievements}">${listValue(experience.achievements)}</textarea></label>`;
    actions = `<div class="section-actions"><button class="secondary-button small">${icon("pen")} ${b.addExperience}</button><button class="ghost-button small">${b.remove}</button></div>`;
  } else if (index === 3) {
    content = `<div class="two-col"><label>${b.labels.school}<input data-resume-field="educationSchool" data-preview-target="educationSchool" value="${value(education.school)}" /></label><label>${b.labels.degree}<input data-resume-field="educationDegree" data-preview-target="educationDegree" value="${value(education.degree)}" /></label></div>`;
  } else if (index === 4) {
    content = `<label>${b.labels.skills}<textarea data-resume-field="skills" data-preview-target="skills" placeholder="${b.placeholders.skills}">${escapeHtml((resume.skills || []).join(", "))}</textarea></label>`;
  } else if (index === 5) {
    content = `<label>${b.labels.languages}<textarea data-resume-field="languages" data-preview-target="languages">${listValue(resume.languages)}</textarea></label>`;
  } else if (index === 6) {
    content = `<label>${b.labels.certifications}<textarea data-resume-field="certifications" data-preview-target="certifications">${listValue(resume.certifications)}</textarea></label>`;
  } else if (index === 7) {
    content = `<label>${b.labels.projects}<textarea data-resume-field="projects" data-preview-target="projects">${listValue(resume.projects)}</textarea></label>`;
  } else if (index === 8) {
    content = `<label>${b.labels.links}<textarea data-resume-field="links" data-preview-target="links" placeholder="${b.placeholders.links}">${listValue(resume.professionalLinks)}</textarea></label>`;
  } else {
    const template = getTemplateByKey(selectedTemplateKey);
    const missing = missingSectionLabels(resume);
    content = `<div class="finish-panel"><div><span class="eyebrow">${b.selectedTemplate}</span><h3>${template.name}</h3><p>${template.description}</p></div><div class="missing-list" data-missing-sections><strong>${b.missingTitle}</strong>${missing.length ? missing.map((item) => `<span>${item}</span>`).join("") : `<span>${currentLanguage === "pt" ? "Pronto para revisar" : "Ready to review"}</span>`}</div><div class="section-actions"><button class="primary-button small" type="button" data-save-resume>${icon("check")} ${b.save}</button><button class="secondary-button small" type="button" data-builder-full-preview>${icon("file")} ${b.previewBeforeDownload}</button><button class="secondary-button small" type="button" data-pdf-export>${icon("download")} ${b.download}</button></div></div>`;
    actions = "";
  }

  return `
    <section class="form-section builder-card builder-panel" id="builder-section-${index}" data-builder-panel="${index}" ${index === activeBuilderSectionIndex ? "" : "hidden"}>
      <div class="form-section-head"><div><span class="section-status">${status}</span><h2>${title}</h2>${helper ? `<p>${helper}</p>` : ""}</div>${aiButton ? `<button class="secondary-button small" type="button" data-ai-action="${index === 2 ? "rewrite-experience" : "improve-summary"}">${icon("sparkles")} ${aiButton}</button>` : ""}</div>
      ${content}
      ${actions}
    </section>
  `;
}

function resumeDocument(template = "modern", format = selectedDocumentFormat, resume = builderDraft) {
  const b = t().builder;
  const data = normalizeResume(resume || createBlankResume({ selectedTemplate: template, documentFormat: format }));
  const personal = data.personal || {};
  const experience = data.workExperience?.[0] || {};
  const education = data.education?.[0] || {};
  const display = (value, fallback = "") => escapeHtml(value || fallback);
  const listMarkup = (items, fallback = "") => {
    const list = normalizeTextList(items);
    return list.length ? list.map((item) => `<span>${escapeHtml(item)}</span>`).join("") : (fallback ? fallback.split(", ").map((item) => `<span>${escapeHtml(item)}</span>`).join("") : "");
  };
  const linesMarkup = (items, fallback = "") => {
    const list = Array.isArray(items) ? items.filter(Boolean) : linesFromValue(items);
    const source = list.length ? list : linesFromValue(fallback);
    return source.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  };
  const paragraphList = (items, fallback = "") => {
    const list = normalizeTextList(items);
    const source = list.length ? list : normalizeTextList(fallback);
    return source.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
  };
  const brList = (items, fallback = "") => {
    const list = normalizeTextList(items);
    const source = list.length ? list : normalizeTextList(fallback);
    return source.map(escapeHtml).join("<br>");
  };
  const displayName = personal.fullName || [personal.firstName, personal.lastName].filter(Boolean).join(" ");
  const displayLocation = resumeContactLocation(personal);
  const contact = [displayLocation, personal.email, personal.phone].filter(Boolean).join(" | ") || b.document.header;
  return `
    <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
      <div class="resume-page-scale-wrapper">
        <div class="resume-document professional-preview resume-template-${template} ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
        <header>
          <div>
            <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
            <strong data-preview-field="title" data-preview-empty="${b.values.professionalTitle}">${display(personal.title, b.values.professionalTitle)}</strong>
          </div>
          <p class="resume-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(contact, b.document.header)}</p>
        </header>
        <section><h3>${b.document.summaryTitle}</h3><p data-preview-field="summary" data-preview-empty="${b.document.summaryText}">${display(data.summary, b.document.summaryText)}</p></section>
        <section><h3>${b.document.experienceTitle}</h3><div class="resume-entry"><strong><span data-preview-field="experienceRole" data-preview-empty="Product Manager">${display(experience.role, "Product Manager")}</span>, <span data-preview-field="experienceCompany" data-preview-empty="NovaTech Solutions">${display(experience.company, "NovaTech Solutions")}</span></strong><span data-preview-field="experiencePeriod" data-preview-empty="2021 - Present">${display(experience.period, "2021 - Present")}</span></div><ul data-preview-field="experience" data-preview-empty="${b.document.experienceText}">${linesMarkup(experience.achievements, b.document.experienceText)}</ul></section>
        <section><h3>${b.document.educationTitle}</h3><p><strong data-preview-field="educationDegree" data-preview-empty="${currentLanguage === "pt" ? "Administração" : "Bachelor's Degree in Business Administration"}">${display(education.degree, currentLanguage === "pt" ? "Administração" : "Bachelor's Degree in Business Administration")}</strong><br><span data-preview-field="educationSchool" data-preview-empty="${b.values.school}">${display(education.school, b.values.school)}</span></p></section>
        <section><h3>${b.document.skillsTitle}</h3><div class="resume-skill-list" data-preview-field="skills" data-preview-empty="${b.values.skills}">${listMarkup(data.skills, b.values.skills)}</div></section>
        <section class="resume-two-column-section"><div><h3>${b.labels.languages}</h3><p data-preview-field="languages" data-preview-empty="${b.values.languages}">${brList(data.languages, b.values.languages)}</p></div><div><h3>${b.labels.certifications}</h3><p data-preview-field="certifications" data-preview-empty="${b.values.certifications}">${brList(data.certifications, b.values.certifications)}</p></div></section>
        <section><h3>${b.labels.projects}</h3><div data-preview-field="projects" data-preview-empty="${b.values.projects}">${paragraphList(data.projects, b.values.projects)}</div></section>
          <section><h3>${b.labels.links}</h3><div class="resume-link-list" data-preview-field="links" data-preview-empty="${b.placeholders.links}">${paragraphList(data.professionalLinks, b.placeholders.links)}</div></section>
        </div>
      </div>
    </div>
  `;
}

function renderAiAssistant() {
  const a = t().ai;
  const resumes = loadResumes();
  const selectedResume = resumes.find((resume) => resume.id === aiAssistantState.resumeId) || resumes[0] || null;
  if (selectedResume && aiAssistantState.resumeId !== selectedResume.id) aiAssistantState.resumeId = selectedResume.id;
  const result = aiAssistantState.result;
  const isLoading = result?.state === "loading";
  const score = result?.score || 0;
  const scoreLabel = result ? atsScoreLabel(score) : a.scoreLabels[0];
  const suggestionCards = result?.suggestions?.length
    ? result.suggestions.map((suggestion) => aiSuggestionCard(suggestion, selectedResume?.id)).join("")
    : `<div class="ai-empty-panel">${icon("sparkles")}<p>${result ? a.noSuggestions : a.start}</p></div>`;
  const hasAnalysis = result && !isLoading;
  const keywordPanel = hasAnalysis ? `
    <section class="ai-keyword-grid">
      ${aiKeywordCard(a.foundKeywords, result.foundKeywords)}
      ${aiKeywordCard(a.missingKeywords, result.missingKeywords)}
      <article class="dash-card ai-match-card"><h3>${a.skillsMatch}</h3><strong>${result.skillsMatch}%</strong><p>${result.skillsMatched.join(", ") || a.noSuggestions}</p></article>
      <article class="dash-card ai-match-card"><h3>${a.experienceMatch}</h3><strong>${result.experienceMatch}%</strong><p>${result.experienceNote}</p></article>
    </section>
  ` : `<section class="ai-keyword-grid"><div class="ai-empty-panel wide">${icon("target")}<p>${a.start}</p></div></section>`;

  const content = !resumes.length ? `
    <main class="ai-page ai-empty-page">
      <section class="empty-state premium-empty">${icon("sparkles")}<h2>${a.navTitle}</h2><p>${a.noResume}</p><button class="primary-button" type="button" data-route="/dashboard/builder">${a.createResume}</button></section>
    </main>
  ` : `
    <main class="ai-page">
      <section class="ai-input-panel">
        <div class="ai-panel-head"><span class="eyebrow">${a.navTitle}</span><h2>${a.title}</h2><p>${a.text}</p></div>
        <form data-ai-form>
          <label>${a.selectResume}
            <select data-ai-field="resumeId">
              ${resumes.map((resume) => `<option value="${resume.id}" ${resume.id === selectedResume?.id ? "selected" : ""}>${escapeHtml(resume.title)}</option>`).join("")}
            </select>
          </label>
          <div class="two-col">
            <label>${a.jobTitle}<input data-ai-field="jobTitle" value="${escapeHtml(aiAssistantState.jobTitle)}" /></label>
            <label>${a.company}<input data-ai-field="company" value="${escapeHtml(aiAssistantState.company)}" /></label>
          </div>
          <label>${a.label}<textarea data-ai-field="jobDescription" placeholder="${a.placeholder}">${escapeHtml(aiAssistantState.jobDescription)}</textarea></label>
          <p class="ai-form-error" data-ai-error ${aiAssistantState.error ? "" : "hidden"}>${escapeHtml(aiAssistantState.error)}</p>
          <button class="primary-button full" type="submit">${icon("target")} ${isLoading ? a.analyzing : a.button}</button>
        </form>
      </section>
      <section class="ai-results">
        <article class="ats-score ai-score-card">
          <span>${a.score}</span>
          <strong>${isLoading ? "..." : `${score}%`}</strong>
          <em>${isLoading ? a.analyzing : scoreLabel}</em>
          <div class="progress"><span style="width:${isLoading ? 18 : score}%"></span></div>
        </article>
        <section class="ai-suggestions-panel">
          <div class="ai-section-head"><h3>${a.suggestionsTitle}</h3>${!isPaidPlan() ? `<span>${a.actions.pro}</span>` : ""}</div>
          <div class="ai-suggestion-grid">${isLoading ? `<div class="ai-empty-panel">${icon("sparkles")}<p>${a.analyzing}</p></div>` : suggestionCards}</div>
        </section>
      </section>
      ${keywordPanel}
    </main>
  `;
  dashboardShell("ai", content);
}

function aiKeywordCard(title, keywords = []) {
  return `
    <article class="dash-card ai-keyword-card">
      <h3>${title}</h3>
      <div class="keyword-cloud">${keywords.length ? keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("") : `<small>${t().ai.noSuggestions}</small>`}</div>
    </article>
  `;
}

function aiSuggestionCard(suggestion, resumeId) {
  const a = t().ai;
  const locked = suggestion.locked;
  return `
    <article class="ai-tool-suggestion-card ${locked ? "locked-feature" : ""}">
      <div><span>${escapeHtml(suggestion.category)}</span>${locked ? `<em>${a.actions.pro}</em>` : ""}</div>
      <p>${escapeHtml(suggestion.text)}</p>
      <footer>
        ${locked
          ? `<button class="secondary-button small" type="button" data-route="/dashboard/billing">${t().dashboard.access.viewPlans}</button>`
          : `<button class="ghost-button small" type="button" data-ai-copy="${escapeHtml(suggestion.text)}">${a.actions.copy}</button>
            <button class="secondary-button small" type="button" data-ai-edit-resume="${resumeId || ""}" data-ai-section="${suggestion.section || "summary"}">${a.actions.edit}</button>
            <button class="primary-button small" type="button" data-ai-edit-resume="${resumeId || ""}" data-ai-section="${suggestion.section || "summary"}">${a.actions.apply}</button>`}
      </footer>
    </article>
  `;
}

function atsScoreLabel(score) {
  const labels = t().ai.scoreLabels;
  if (score >= 82) return labels[3];
  if (score >= 68) return labels[2];
  if (score >= 48) return labels[1];
  return labels[0];
}

function normalizeAiText(value) {
  return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function resumeSearchText(resume) {
  const experience = (resume.workExperience || []).flatMap((item) => [item.role, item.company, item.period, ...(item.achievements || [])]);
  const education = (resume.education || []).flatMap((item) => [item.school, item.degree]);
  return normalizeAiText([
    resume.title,
    resume.personal?.fullName,
    resume.personal?.title,
    resume.personal?.email,
    resume.personal?.phone,
    resume.personal?.location,
    resume.summary,
    ...experience,
    ...education,
    ...(resume.skills || []),
    ...(resume.languages || []),
    ...(resume.certifications || []),
    ...(resume.projects || []),
    ...(resume.professionalLinks || []),
  ].filter(Boolean).join(" "));
}

function aiStopWords() {
  return new Set([
    "about", "above", "after", "again", "also", "and", "are", "because", "been", "but", "can", "com", "como", "das", "de", "del", "dos", "for", "from", "have", "job", "mais", "para", "por", "que", "role", "ser", "the", "this", "uma", "with", "you", "your", "vaga", "will", "work", "our", "sua", "seu", "sao", "são", "responsibilities", "requirements", "required", "preferred", "candidate", "empresa", "experiencia", "experiência",
  ]);
}

function extractJobKeywords(jobText, resume = null) {
  const stopWords = aiStopWords();
  const normalized = normalizeAiText(jobText);
  const counts = {};
  normalized.match(/[\p{L}\d+#.-]{3,}/gu)?.forEach((word) => {
    const clean = word.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gi, "");
    if (!clean || clean.length < 3 || stopWords.has(clean)) return;
    counts[clean] = (counts[clean] || 0) + 1;
  });
  const skillHits = (resume?.skills || []).filter((skill) => normalizeAiText(jobText).includes(normalizeAiText(skill)));
  const counted = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([word]) => word);
  return [...new Set([...skillHits, ...counted])].slice(0, 14).map((keyword) => keyword.length <= 4 ? keyword.toUpperCase() : keyword.replace(/\b\w/g, (letter) => letter.toUpperCase()));
}

function selectedAiResume() {
  const resumes = loadResumes();
  return resumes.find((resume) => resume.id === aiAssistantState.resumeId) || resumes[0] || null;
}

function hasMeasurableResults(resume) {
  return (resume.workExperience || []).some((item) => (item.achievements || []).some((line) => /\d|%|\$|R\$/.test(line)));
}

function missingResumeSections(resume) {
  return [
    !resume.summary ? "summary" : "",
    !(resume.workExperience || []).some((item) => item.role || item.company || item.achievements?.length) ? "experience" : "",
    !(resume.skills || []).length ? "skills" : "",
    !(resume.education || []).some((item) => item.school || item.degree) ? "formatting" : "",
    !resume.personal?.email || !resume.personal?.phone ? "contact" : "",
  ].filter(Boolean);
}

function analyzeResumeForJob(resume, values) {
  const a = t().ai;
  const access = getUserAccess();
  const jobText = [values.jobTitle, values.company, values.jobDescription].filter(Boolean).join(" ");
  const resumeText = resumeSearchText(resume);
  const normalizedJob = normalizeAiText(jobText);
  const normalizedResumeTitle = normalizeAiText(`${resume.personal?.title || ""} ${resume.summary || ""}`);
  const keywords = extractJobKeywords(jobText, resume);
  const foundKeywords = keywords.filter((keyword) => resumeText.includes(normalizeAiText(keyword))).slice(0, 10);
  const missingKeywords = keywords.filter((keyword) => !resumeText.includes(normalizeAiText(keyword))).slice(0, 10);
  const skillsMatched = (resume.skills || []).filter((skill) => normalizedJob.includes(normalizeAiText(skill))).slice(0, 8);
  const skillsMatch = Math.min(100, Math.round(((skillsMatched.length || 0) / Math.max(3, Math.min(8, keywords.length || 3))) * 100));
  const roleMentioned = values.jobTitle ? normalizedResumeTitle.includes(normalizeAiText(values.jobTitle)) : foundKeywords.length > 1;
  const measurable = hasMeasurableResults(resume);
  const missing = missingResumeSections(resume);
  const summaryStrong = String(resume.summary || "").trim().length >= 120;
  const hasContact = Boolean(resume.personal?.email && resume.personal?.phone);
  const experienceText = normalizeAiText((resume.workExperience || []).flatMap((item) => [item.role, item.company, ...(item.achievements || [])]).join(" "));
  const experienceMatch = Math.min(100, Math.round((foundKeywords.filter((keyword) => experienceText.includes(normalizeAiText(keyword))).length / Math.max(1, foundKeywords.length)) * 100));
  let score = 35;
  score += Math.round((foundKeywords.length / Math.max(1, keywords.length)) * 25);
  score += Math.round(skillsMatch * 0.15);
  if (summaryStrong) score += 8;
  if (roleMentioned) score += 7;
  if (measurable) score += 7;
  if (!missing.length) score += 8;
  if (hasContact) score += 5;
  score = Math.max(0, Math.min(100, score));

  const suggestions = [];
  const push = (categoryKey, text, section = categoryKey, locked = false) => suggestions.push({ category: a.categories[categoryKey] || categoryKey, text, section, locked });
  if (!roleMentioned) push("summary", a.suggestions.summaryTarget, "summary");
  if (!summaryStrong) push("summary", a.suggestions.summaryWeak, "summary");
  if (!measurable) push("experience", a.suggestions.measurable, "experience");
  if (missing.includes("skills") || missingKeywords.length) push("skills", a.suggestions.skills, "skills");
  if (missingKeywords.length) push("keywords", `${a.suggestions.keywords} ${missingKeywords.slice(0, 5).join(", ")}.`, "skills");
  push("formatting", missing.includes("contact") ? a.suggestions.contact : a.suggestions.formatting, missing.includes("contact") ? "personal" : "experience");
  if (access.plan === "free") push("upgrade", a.suggestions.advanced, "summary", true);
  if (access.plan === "premium" && missingKeywords.length > 5) push("keywords", `${a.suggestions.keywords} ${missingKeywords.slice(5, 10).join(", ")}.`, "skills");

  const visibleSuggestions = access.plan === "premium"
    ? suggestions
    : access.plan === "pro"
      ? suggestions.slice(0, 7)
      : [...suggestions.filter((suggestion) => !suggestion.locked).slice(0, 5), ...suggestions.filter((suggestion) => suggestion.locked).slice(0, 1)];
  return {
    score,
    foundKeywords,
    missingKeywords,
    skillsMatch,
    skillsMatched,
    experienceMatch,
    experienceNote: experienceMatch >= 65 ? a.scoreLabels[2] : a.suggestions.measurable,
    suggestions: visibleSuggestions,
  };
}

function builderSectionIndexForAi(section) {
  const map = { personal: 0, summary: 1, experience: 2, skills: 4, keywords: 4, formatting: 2 };
  return map[section] ?? 1;
}

function openResumeBuilderFromAi(resumeId, section) {
  if (resumeId) loadResumeIntoBuilder(resumeId);
  activeBuilderSectionIndex = builderSectionIndexForAi(section);
  preferCollapsedSidebarForBuilder();
  setRoute("/dashboard/builder");
}

function renderProfile() {
  const copy = t();
  const s = copy.settings;
  const b = copy.builder;
  const profile = loadProfile();
  dashboardShell("profile", `
    <main class="settings-page settings-page-premium profile-page">
      <section class="settings-hero-card">
        <div class="settings-avatar">${escapeHtml(profileInitials(profile))}</div>
        <div>
          <span class="eyebrow">${copy.dashboard.currentPlan}: ${escapeHtml(accessPlanLabel())}</span>
          <h2>${escapeHtml(profile.fullName)}</h2>
          <p>${escapeHtml(profile.title || s.professionalTitle)} · ${escapeHtml(profile.location || b.labels.location)}</p>
        </div>
      </section>
      <form class="settings-card profile-settings-card" data-profile-form>
        <div class="settings-card-head">
          <div><span class="eyebrow">${s.profileTitle}</span><h2>${s.profileTitle}</h2></div>
          <span class="settings-status" data-profile-status hidden>${s.unsaved}</span>
        </div>
        <div class="two-col">
          <label>${s.name}<input data-profile-field="fullName" value="${escapeHtml(profile.fullName)}" autocomplete="name" required /></label>
          <label>${b.labels.email}<input data-profile-field="email" type="email" value="${escapeHtml(profile.email)}" autocomplete="email" required /></label>
          <label>${s.phone}<input data-profile-field="phone" type="tel" value="${escapeHtml(profile.phone || "")}" autocomplete="tel" /></label>
          <label>${b.labels.location}<input data-profile-field="location" value="${escapeHtml(profile.location)}" autocomplete="address-level2" /></label>
          <label>${s.professionalTitle}<input data-profile-field="title" value="${escapeHtml(profile.title)}" autocomplete="organization-title" /></label>
          <label>${s.preferredLanguage}<select data-profile-field="preferredLanguage"><option value="pt" ${profile.preferredLanguage === "pt" ? "selected" : ""}>${s.languageOptions.pt}</option><option value="en" ${profile.preferredLanguage === "en" ? "selected" : ""}>${s.languageOptions.en}</option></select></label>
        </div>
        <p class="settings-message" data-profile-message hidden></p>
        <div class="section-actions">
          <button class="primary-button small" type="submit" data-profile-save disabled>${s.saveChanges}</button>
          <button class="secondary-button small" type="button" data-password-prepared="#profile-password-message">${s.changePassword}</button>
          <button class="secondary-button small" type="button" data-profile-cancel disabled>${s.cancel}</button>
        </div>
        <p class="settings-message" id="profile-password-message" hidden></p>
      </form>
    </main>
  `);
}

function renderSettings() {
  const copy = t();
  const s = copy.settings;
  const b = copy.builder;
  const profile = loadProfile();
  const themeOptions = ["light", "dark", "system"].map((value) => [value, s.themeOptions[value]]);
  dashboardShell("settings", `
    <main class="settings-page settings-page-premium">
      <section class="settings-hero-card">
        <div class="settings-avatar">${escapeHtml(profileInitials(profile))}</div>
        <div>
          <span class="eyebrow">Succeedora</span>
          <h2>${escapeHtml(profile.fullName)}</h2>
          <p>${escapeHtml(profile.title)} · ${escapeHtml(profile.location)}</p>
        </div>
      </section>
      <form class="settings-card profile-settings-card" data-profile-form>
        <div class="settings-card-head">
          <div><span class="eyebrow">${s.profileTitle}</span><h2>${s.profileTitle}</h2></div>
          <span class="settings-status" data-profile-status hidden>${s.unsaved}</span>
        </div>
        <div class="two-col">
          <label>${b.labels.fullName}<input data-profile-field="fullName" value="${escapeHtml(profile.fullName)}" autocomplete="name" required /></label>
          <label>${b.labels.email}<input data-profile-field="email" type="email" value="${escapeHtml(profile.email)}" autocomplete="email" required /></label>
          <label>${s.professionalTitle}<input data-profile-field="title" value="${escapeHtml(profile.title)}" autocomplete="organization-title" /></label>
          <label>${b.labels.location}<input data-profile-field="location" value="${escapeHtml(profile.location)}" autocomplete="address-level2" /></label>
        </div>
        <p class="settings-message" data-profile-message hidden></p>
        <div class="section-actions">
          <button class="primary-button small" type="submit" data-profile-save disabled>${s.saveChanges}</button>
          <button class="secondary-button small" type="button" data-profile-cancel disabled>${s.cancel}</button>
        </div>
      </form>
      <section class="settings-card preferences-settings-card">
        <div class="settings-card-head"><div><span class="eyebrow">${s.preferencesTitle}</span><h2>${s.preferencesTitle}</h2></div></div>
        <div class="settings-preference-grid">
          <label>${s.languageTitle}<select data-settings-language><option value="pt" ${currentLanguage === "pt" ? "selected" : ""}>${s.languageOptions.pt}</option><option value="en" ${currentLanguage === "en" ? "selected" : ""}>${s.languageOptions.en}</option></select></label>
          <label>${s.themeTitle}<select data-theme-choice>${themeOptions.map(([value, label]) => `<option value="${value}" ${selectedTheme === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
        </div>
      </section>
      <section class="settings-grid">
        <article class="settings-card security-settings-card">
          <div class="settings-card-head"><div><span class="eyebrow">${s.securityTitle}</span><h2>${s.securityTitle}</h2></div></div>
          <div class="settings-status-list">
            <span>${icon("check")} ${s.emailVerified}</span>
            <span>${icon("shield")} ${s.activeAccount}</span>
          </div>
          <p>${s.changePasswordHelp}</p>
          <button class="secondary-button small" type="button">${s.updatePassword}</button>
        </article>
        <article class="settings-card account-settings-card">
          <div class="settings-card-head"><div><span class="eyebrow">${s.accountTitle}</span><h2>${s.accountTitle}</h2></div></div>
          <p>${s.accountText}</p>
          <div class="section-actions">
            <a class="ghost-button small" href="#/terms" data-route="/terms">${copy.auth.terms}</a>
            <a class="ghost-button small" href="#/privacy" data-route="/privacy">${copy.auth.privacy}</a>
          </div>
        </article>
      </section>
    </main>
  `);
}

function renderAccountSettings() {
  const copy = t();
  const s = copy.settings;
  const profile = loadProfile();
  const themeOptions = ["light", "dark", "system"].map((value) => [value, s.themeOptions[value]]);
  dashboardShell("settings", `
    <main class="settings-page settings-page-premium">
      <section class="settings-hero-card">
        <div class="settings-avatar">${escapeHtml(profileInitials(profile))}</div>
        <div>
          <span class="eyebrow">Succeedora</span>
          <h2>${escapeHtml(profile.fullName)}</h2>
          <p>${escapeHtml(profile.email)} &middot; ${copy.dashboard.currentPlan}: ${escapeHtml(accessPlanLabel())}</p>
        </div>
      </section>
      <section class="settings-grid">
        <article class="settings-card preferences-settings-card">
          <div class="settings-card-head"><div><span class="eyebrow">${s.appearanceTitle}</span><h2>${s.appearanceTitle}</h2></div></div>
          <label>${s.themeTitle}<select data-theme-choice>${themeOptions.map(([value, label]) => `<option value="${value}" ${selectedTheme === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
        </article>
        <article class="settings-card preferences-settings-card">
          <div class="settings-card-head"><div><span class="eyebrow">${s.languageTitle}</span><h2>${s.languageTitle}</h2></div></div>
          <label>${s.languageTitle}<select data-settings-language><option value="pt" ${currentLanguage === "pt" ? "selected" : ""}>${s.languageOptions.pt}</option><option value="en" ${currentLanguage === "en" ? "selected" : ""}>${s.languageOptions.en}</option></select></label>
        </article>
      </section>
      <section class="settings-grid">
        <article class="settings-card account-settings-card">
          <div class="settings-card-head"><div><span class="eyebrow">${s.accountTitle}</span><h2>${s.accountTitle}</h2></div></div>
          <div class="settings-status-list">
            <span>${icon("check")} ${escapeHtml(profile.email)}</span>
            <span>${icon("card")} ${copy.dashboard.currentPlan}: ${escapeHtml(accessPlanLabel())}</span>
          </div>
          <p>${s.accountText}</p>
          <div class="section-actions">
            <button class="secondary-button small" type="button" data-route="/dashboard/profile">${copy.dashboard.nav.profile}</button>
            <button class="secondary-button small" type="button" data-password-prepared="#settings-password-message">${s.changePassword}</button>
            <button class="ghost-button small" type="button" data-route="/" data-sign-out>${copy.dashboard.signOut}</button>
          </div>
          <p class="settings-message" id="settings-password-message" hidden></p>
        </article>
        <article class="settings-card account-settings-card">
          <div class="settings-card-head"><div><span class="eyebrow">${s.privacyTitle}</span><h2>${s.privacyTitle}</h2></div></div>
          <p>${s.privacyText}</p>
          <div class="section-actions">
            <a class="ghost-button small" href="#/terms" data-route="/terms">${copy.auth.terms}</a>
            <a class="ghost-button small" href="#/privacy" data-route="/privacy">${copy.auth.privacy}</a>
            <a class="ghost-button small" href="#/cookies" data-route="/cookies">${copy.dashboard.cookies}</a>
          </div>
        </article>
      </section>
    </main>
  `);
}

function renderCoverLetters() {
  const c = coverLetterLabels();
  const letters = loadCoverLetters();
  const resumes = loadResumes();
  const draft = normalizeCoverLetter(coverLetterDraft || createBlankCoverLetter({ id: currentCoverLetterId || undefined }));
  const builder = `
    <section class="cover-letter-builder-page" data-letter-builder>
      <div class="cover-letter-mobile-tabs">
        <button class="active" type="button" data-cover-letter-tab="edit">${c.tabs.edit}</button>
        <button type="button" data-cover-letter-tab="preview">${c.tabs.preview}</button>
      </div>
      <article class="letter-form-panel">
        <div class="card-head">
          <div>
            <h2>${currentCoverLetterId ? c.editBuilderTitle : c.builderTitle}</h2>
            <p>${c.intro}</p>
          </div>
          <button class="ghost-button small" type="button" data-cover-letter-list>${c.actions.list}</button>
        </div>
        ${resumes.length ? `
          <label>${c.selectResume}
            <select data-cover-letter-resume>
              <option value="">${c.noResumeOption}</option>
              ${resumes.map((resume) => `<option value="${escapeHtml(resume.id)}" ${draft.resumeId === resume.id ? "selected" : ""}>${escapeHtml(resume.title || resumeLabels().untitled)}</option>`).join("")}
            </select>
          </label>
        ` : ""}
        <div class="two-col">
          <label>${c.fields.title}<input data-letter-field="title" value="${escapeHtml(draft.title)}" /></label>
          <label>${c.fields.role}<input data-letter-field="targetRole" value="${escapeHtml(draft.targetRole)}" /></label>
          <label>${c.fields.company}<input data-letter-field="company" value="${escapeHtml(draft.company)}" /></label>
          <label>${c.fields.recruiter}<input data-letter-field="recruiter" value="${escapeHtml(draft.recruiter)}" /></label>
          <label>${c.fields.tone}<select data-letter-field="tone">${c.tones.map((tone) => `<option ${draft.tone === tone ? "selected" : ""}>${escapeHtml(tone)}</option>`).join("")}</select></label>
          <label>${c.fields.candidateName}<input data-letter-field="candidateName" value="${escapeHtml(draft.candidateName)}" /></label>
          <label>${c.fields.email}<input data-letter-field="email" type="email" value="${escapeHtml(draft.email)}" /></label>
          <label>${c.fields.phone}<input data-letter-field="phone" value="${escapeHtml(draft.phone)}" /></label>
          <label>${c.fields.location}<input data-letter-field="location" value="${escapeHtml(draft.location)}" /></label>
        </div>
        <label>${c.fields.jobDescription}<textarea data-letter-field="jobDescription" class="letter-job-field">${escapeHtml(draft.jobDescription)}</textarea></label>
        <div class="two-col">
          <label>${c.fields.strengths}<textarea data-letter-field="strengths">${escapeHtml(draft.strengths)}</textarea></label>
          <label>${c.fields.experience}<textarea data-letter-field="experience">${escapeHtml(draft.experience)}</textarea></label>
        </div>
        <div class="letter-editor-head">
          <label>${c.fields.body}</label>
          <button class="secondary-button small" type="button" data-cover-letter-generate>${icon("sparkles")} ${c.actions.generate}</button>
        </div>
        <textarea class="cover-letter-body-editor" data-letter-field="body">${escapeHtml(draft.body)}</textarea>
        <p class="settings-message" data-cover-letter-message ${coverLetterSaveMessage ? "" : "hidden"}>${escapeHtml(coverLetterSaveMessage)}</p>
        <div class="section-actions cover-letter-builder-actions">
          <button class="primary-button small" type="button" data-cover-letter-save>${icon("check")} ${c.actions.save}</button>
          <button class="secondary-button small" type="button" data-cover-letter-preview-current>${c.actions.preview}</button>
          <button class="secondary-button small" type="button" data-cover-letter-pdf-current>${icon("download")} ${c.actions.download}</button>
        </div>
      </article>
      <aside class="letter-preview-panel">
        <div class="preview-toolbar"><span>${c.previewTitle}</span></div>
        <div class="letter-document" data-letter-preview>${coverLetterDocument(draft)}</div>
      </aside>
    </section>
  `;
  const library = letters.length ? `
    <section class="cover-letter-library">
      ${letters.map((letter) => `
        <article class="cover-letter-card">
          <div class="cover-letter-card-main">
            <span class="status-pill">${letter.status === "saved" ? c.statusSaved : c.statusDraft}</span>
            <h2>${escapeHtml(letter.title || c.untitled)}</h2>
            <div class="cover-letter-card-meta">
              <span>${escapeHtml(letter.targetRole || c.fields.role)}</span>
              <span>${escapeHtml(letter.company || c.fields.company)}</span>
            </div>
            <small>${c.lastEdited}: ${escapeHtml(formatResumeDate(letter.updatedAt))}</small>
          </div>
          <div class="cover-letter-card-actions">
            <button class="ghost-button small" type="button" data-cover-letter-edit="${escapeHtml(letter.id)}">${c.actions.edit}</button>
            <button class="ghost-button small" type="button" data-cover-letter-preview="${escapeHtml(letter.id)}">${c.actions.preview}</button>
            <button class="ghost-button small" type="button" data-cover-letter-duplicate="${escapeHtml(letter.id)}">${c.actions.duplicate}</button>
            <button class="ghost-button small danger-link" type="button" data-cover-letter-delete="${escapeHtml(letter.id)}">${c.actions.delete}</button>
            <button class="ghost-button small" type="button" data-cover-letter-pdf="${escapeHtml(letter.id)}">${icon("download")} ${c.actions.download}</button>
          </div>
        </article>
      `).join("")}
    </section>
  ` : `<section class="empty-state premium-empty">${icon("mail")}<h2>${c.emptyTitle}</h2><p>${c.emptyText}</p><button class="primary-button" type="button" data-cover-letter-new>${c.dashboardNew}</button></section>`;
  dashboardShell("coverLetters", `
    <main class="dashboard-content">
      <div class="page-actions"><p>${c.intro}</p><button class="primary-button" type="button" data-cover-letter-new>${icon("mail")} ${c.dashboardNew}</button></div>
      ${coverLetterBuilderOpen ? builder : library}
    </main>
  `);
}

function renderTemplatesPage() {
  const copy = t();
  const filterKeys = ["all", "free", "pro", "modern", "minimal", "executive", "creative", "student", "international", "classic", "corporate", "tech", "simple-ats", "elegant", "first-job"];
  const templates = resumeTemplates();
  dashboardShell("templates", `
    <main class="dashboard-content">
      <div class="template-filter-row">${copy.dashboard.templateFilters.map((filter, index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-template-filter="${filterKeys[index]}">${filter}</button>`).join("")}</div>
      <div class="template-grid dashboard-templates">${templates.map((template, index) => `
        <article class="template-card dashboard-template-card template-${template.key} ${canUseTemplate(template.key) ? "" : "locked-feature"}" data-template-category="${template.key}" data-template-access="${template.access}">
          <div class="template-card-topline">
            <span class="template-badge">${template.category}</span>
            <span class="template-badge ${template.access === "free" ? "free" : "pro"}">${template.access === "free" ? copy.dashboard.free : copy.dashboard.pro}</span>
          </div>
          ${templateCardPreviewMarkup(template.key)}
          <h3>${template.name}</h3>
          <p>${template.description}</p>
          <p class="template-best"><strong>${copy.dashboard.bestFor}:</strong> ${template.bestForText}</p>
          <div class="template-actions">
            <button class="ghost-button small" type="button" data-template-preview="${template.key}" data-preview-context="dashboard">${copy.dashboard.previewTemplate}</button>
            <button class="secondary-button small" type="button" data-use-template="${template.key}" data-template-destination="builder">${copy.dashboard.useTemplate}</button>
          </div>
        </article>
      `).join("")}</div>
    </main>
  `);
}

function renderBilling() {
  const access = getUserAccess();
  const labels = t().dashboard.access;
  dashboardShell("billing", `
    <main class="dashboard-content billing-page">
      <section class="billing-summary settings-card">
        <div>
          <span class="eyebrow">${t().dashboard.billing}</span>
          <h2>${currentPlanText(access)}</h2>
          <p>${labels.aiCredits}: ${access.aiCredits}</p>
        </div>
        <div class="billing-actions">
          <button class="primary-button small" type="button" data-pricing-jump="monthly">${t().dashboard.upgrade}</button>
          <button class="secondary-button small" type="button" data-pricing-jump="credits">${labels.buyCredits}</button>
          <button class="secondary-button small" type="button" data-pricing-jump="one-time">${labels.removeWatermark}</button>
        </div>
      </section>
      ${paymentHistorySection()}
      ${monetizationSections("dashboard")}
    </main>
  `);
}

window.addEventListener("hashchange", render);
window.addEventListener("popstate", render);
window.addEventListener("resize", () => updateResumePreviewScales());
if (window.matchMedia) {
  const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = () => {
    if (selectedTheme === "system") {
      applyTheme();
      render();
    }
  };
  if (colorSchemeQuery.addEventListener) colorSchemeQuery.addEventListener("change", handleSystemThemeChange);
  else if (colorSchemeQuery.addListener) colorSchemeQuery.addListener(handleSystemThemeChange);
}
applyTheme();
normalizeLanguagePath(true);
render();
