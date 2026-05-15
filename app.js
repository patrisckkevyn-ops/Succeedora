const LANG_STORAGE_KEY = "succeedora.language";
const DOCUMENT_FORMAT_STORAGE_KEY = "succeedora.documentFormat";
const RESUMES_STORAGE_KEY = "succeedora.resumes";
const COVER_LETTERS_STORAGE_KEY = "succeedora.coverLetters";
const THEME_STORAGE_KEY = "succeedora.theme";
const AUTH_VERIFIED_STORAGE_KEY = "succeedora.authVerified";
const AUTH_EMAIL_STORAGE_KEY = "succeedora.authEmail";
const AUTH_PASSWORD_STORAGE_KEY = "succeedora.authPassword";
const AUTH_REMEMBER_STORAGE_KEY = "succeedora.rememberUser";
const PROFILE_STORAGE_KEY = "succeedora.profile";
const ACCESS_STORAGE_KEY = "succeedora.access";
const ACCOUNTS_STORAGE_KEY = "succeedora.accounts";
const SESSION_STORAGE_KEY = "succeedora.session";
const PENDING_ROUTE_STORAGE_KEY = "succeedora.pendingRoute";
const LEGACY_MIGRATION_STORAGE_KEY = "succeedora.legacyMigration";
const PAYMENT_REQUESTS_STORAGE_KEY = "succeedora.paymentRequests";
const ADMIN_AUDIT_LOG_STORAGE_KEY = "succeedora.adminAuditLog";
const AI_USAGE_STORAGE_KEY = "succeedora.aiUsage";
const SUPPORT_TICKETS_STORAGE_KEY = "succeedora_support_tickets";
const SITE_ORIGIN = "https://succeedora.com";
const ADMIN_EMAILS = ["patrisckkevyn@gmail.com"];
const VERIFICATION_CODE_TTL_MS = 10 * 60 * 1000;
const VERIFICATION_RESEND_COOLDOWN_MS = 60 * 1000;
const VERIFICATION_EMAIL_TIMEOUT_MS = 12000;
const paymentConfig = {
  // Confirm this CNPJ is registered as a Pix key at the bank before using this QR Code in production.
  // If it is not registered, generated Pix BR Codes must not be considered valid for production payments.
  pixKey: "60099692000107",
  pixKeyType: "CNPJ",
  merchantName: "SUCCEEDORA",
  merchantCity: "SERRA",
  currency: "BRL",
  pixManualConfirmation: true,
  stripeEnabled: true,
  pixEnabled: true,
};
const stripeConfig = {
  enabled: true,
  currency: "brl",
  mode: "live",
  allowedMethods: ["card"],
  subscriptionsEnabled: true,
  oneTimePaymentsEnabled: true,
  installmentsEnabled: false,
};
const PIX_ONE_TIME_PRODUCTS = {
  remove_watermark: { amount: 790, names: { pt: "Remover marca d'água", en: "Remove watermark" }, descriptions: { pt: "PDF sem marca da Succeedora para um currículo.", en: "Watermark-free PDF for one resume." } },
  premium_pdf: { amount: 2900, names: { pt: "PDF premium", en: "Premium PDF" }, descriptions: { pt: "Exportação premium em PDF para um currículo.", en: "Premium PDF export for one resume." } },
  premium_template: { amount: 1900, names: { pt: "Modelo premium", en: "Premium template" }, descriptions: { pt: "Desbloqueio manual futuro de um modelo premium.", en: "Future manual unlock for one premium template." } },
  career_pack: { amount: 7900, names: { pt: "Pacote carreira", en: "Career pack" }, descriptions: { pt: "Pacote avulso de recursos de carreira.", en: "One-time career resource pack." } },
  ai_credits: { amount: 1900, names: { pt: "Créditos de IA", en: "AI credits" }, descriptions: { pt: "Pacote avulso de créditos de IA para liberação futura.", en: "One-time AI credits pack for future unlock." } },
  ai_credits_starter: { amount: 1900, names: { pt: "Créditos Starter", en: "Starter credits" }, descriptions: { pt: "Pacote pequeno de créditos de IA.", en: "Small AI credits pack." } },
  ai_credits_growth: { amount: 4900, names: { pt: "Créditos Growth", en: "Growth credits" }, descriptions: { pt: "Pacote médio de créditos de IA.", en: "Medium AI credits pack." } },
  ai_credits_power: { amount: 9900, names: { pt: "Créditos Power", en: "Power credits" }, descriptions: { pt: "Pacote maior de créditos de IA.", en: "Large AI credits pack." } },
  online_resume_link: { amount: 2400, names: { pt: "Link de currículo online", en: "Online resume link" }, descriptions: { pt: "Link público do currículo para liberação futura.", en: "Public resume link for future unlock." } },
};
const AI_CREDIT_PRODUCT_TYPES = ["ai_credits", "ai_credits_starter", "ai_credits_growth", "ai_credits_power"];
const AI_CREDIT_PRODUCT_AMOUNTS = { ai_credits: 10, ai_credits_starter: 10, ai_credits_growth: 30, ai_credits_power: 75 };
const AI_CREDIT_STRIPE_PRODUCTS = ["ai_credits_starter", "ai_credits_growth", "ai_credits_power"];
const DISPOSABLE_EMAIL_DOMAINS = new Set(["mailinator.com", "10minutemail.com", "temp-mail.org", "guerrillamail.com", "yopmail.com", "throwawaymail.com", "getnada.com", "emailondeck.com", "fakeinbox.com", "trashmail.com"]);
const AI_TASK_CREDITS = {
  generate_professional_summary: 1,
  improve_professional_summary: 1,
  rewrite_experience: 1,
  suggest_skills: 1,
  improve_project_description: 1,
  generate_cover_letter: 2,
  improve_cover_letter: 2,
  tailor_cover_letter_to_job: 2,
  formal_cover_letter: 2,
  direct_cover_letter: 2,
  confident_cover_letter: 2,
  analyze_resume_ats: 2,
  analyze_job_description: 2,
  ats_keyword_suggestions: 2,
  suggest_ats_keywords: 2,
  assistant_chat: 2,
  translate_resume: 3,
  tailor_resume_to_job: 4,
  recommend_resume_template: 1,
};
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
  headset: "M4 13a8 8 0 0116 0v4a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3M4 12h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm14 7v.5A2.5 2.5 0 0115.5 22H13",
  shield: "M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-3 10l2 2 4-5",
  globe: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-20c2.5 2.7 3.8 6 3.8 10S14.5 19.3 12 22m0-20C9.5 4.7 8.2 8 8.2 12S9.5 19.3 12 22M2.5 12h19M4.5 7h15M4.5 17h15",
  target: "M12 22a10 10 0 100-20 10 10 0 000 20zm0-4a6 6 0 100-12 6 6 0 000 12zm0-4a2 2 0 100-4 2 2 0 000 4z",
  download: "M12 3v11m0 0l-4-4m4 4l4-4M5 19h14",
  link: "M10 13a5 5 0 007 0l2-2a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-2 2a5 5 0 007 7l1-1",
  layout: "M3 4h18v16H3V4zm0 5h18M9 9v11",
  templates: "M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zm9 0h7v7h-7v-7z",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
  settings: "M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1A2 2 0 014.2 17l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9L4.3 7A2 2 0 017 4.2l.1.1a1.7 1.7 0 001.9.3h.1a1.7 1.7 0 001-1.6V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.6h.1a1.7 1.7 0 001.9-.3l.1-.1A2 2 0 0119.8 7l-.1.1a1.7 1.7 0 00-.3 1.9v.1a1.7 1.7 0 001.6 1h.1a2 2 0 010 4H21a1.7 1.7 0 00-1.6.9z",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7l1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2l-1.4-1.4M12 16a4 4 0 100-8 4 4 0 000 8z",
  moon: "M21 14.5A8.5 8.5 0 119.5 3a7 7 0 0011.5 11.5z",
  card: "M3 6h18v12H3V6zm0 4h18M7 15h4",
  arrow: "M5 12h14m-6-6l6 6-6 6",
  arrowLeft: "M19 12H5m6-6l-6 6 6 6",
  check: "M20 6L9 17l-5-5",
  lock: "M7 11V8a5 5 0 0110 0v3M6 11h12v10H6V11zm6 4.5V17m-2-6V8a2 2 0 114 0v3",
  eye: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zm10 3a3 3 0 100-6 3 3 0 000 6z",
  eyeOff: "M3 3l18 18M9.9 4.6A10.7 10.7 0 0112 4c6.5 0 10 8 10 8a17.8 17.8 0 01-3.2 4.2M6.6 6.6C3.5 8.7 2 12 2 12s3.5 8 10 8a10.7 10.7 0 004.2-.9M9.9 9.9A3 3 0 0114.1 14.1",
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
      heroSubtitle: "Build, improve, translate and tailor your resume for each job application with modern templates and smart tools.",
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
      viewTemplate: "Preview",
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
      verifySubtitle: "We sent a 6-digit code to your email.",
      verifyButton: "Confirm email",
      resendCode: "Resend code",
      backToLogin: "Back to login",
      verificationSent: "Verification email sent.",
      verificationSendError: "We could not send the verification email. Please try again.",
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
        expired: "Code expired. Please request a new code.",
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
        title: "Welcome to your global career workspace",
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
      backToCreateResume: "Back to create resume",
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
      heroSubtitle: "Monte, melhore, traduza e adapte seu currículo para cada vaga com modelos modernos e ferramentas inteligentes.",
      primaryCta: "Criar meu currículo",
      secondaryCta: "Ver modelos",
      trust: ["Compatível com ATS", "Pronto para vários idiomas", "Currículo em PDF"],
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
      viewTemplate: "Visualizar",
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
      paymentFaq: [["Posso usar a Succeedora grátis?", "Sim. O plano Grátis permite testar o criador e fazer um currículo básico."], ["Posso pagar apenas uma vez?", "Sim. As opções avulsas servem para quem precisa de um download premium, Career Pack, modelo ou link online sem assinatura."], ["Preciso de assinatura para baixar meu currículo?", "Não. Você pode usar um plano mensal ou escolher o Download PDF Premium avulso."], ["O que são créditos de IA?", "Créditos de IA permitem usar recursos como reescrita, tradução, carta de apresentação e adaptação para vaga sem assinatura."], ["Posso cancelar minha assinatura quando quiser?", "Sim. Assinaturas por cartão são processadas pela Stripe e podem ser gerenciadas conforme as opções exibidas no checkout e no portal de cobrança."], ["Posso fazer upgrade depois?", "Sim. Você pode começar grátis, comprar uma opção avulsa, usar créditos ou migrar para Pro ou Premium depois."]],
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
      backToLogin: "Voltar ao login",
      verificationSent: "E-mail de confirmaÃ§Ã£o enviado.",
      verificationSendError: "NÃ£o foi possÃ­vel enviar o e-mail de confirmaÃ§Ã£o. Tente novamente.",
      verifySubtitle: "Enviamos um cÃ³digo de 6 dÃ­gitos para o seu e-mail.",
      verifyButton: "Confirmar e-mail",
      verificationSent: "E-mail de confirma\u00e7\u00e3o enviado.",
      verificationSendError: "N\u00e3o foi poss\u00edvel enviar o e-mail de confirma\u00e7\u00e3o. Tente novamente.",
      verifySubtitle: "Enviamos um c\u00f3digo de 6 d\u00edgitos para o seu e-mail.",
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
        title: "Bem-vindo ao seu workspace global",
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
      templateFilters: ["Todos", "Gratuitos", "Pro", "Moderno", "Minimalista", "Executivo", "Criativo", "Estudante", "Internacional", "Clássico", "Corporativo", "Tech", "Simple ATS", "Elegante", "Primeiro emprego"],
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
      backToCreateResume: "Voltar para criar currículo",
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
  showPassword: "Show password",
  hidePassword: "Hide password",
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
  legal: "You need to accept the Terms of Use and Privacy Policy to continue.",
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
  featureComparisonTitle: "Compare plans",
  featureComparisonSubtitle: "See the difference between Free, Pro and Premium.",
  featureColumnLabel: "Feature",
  included: "Included",
  limited: "Limited",
  notIncluded: "Not included",
  plans: [
    ["Free", "$0", ["1 basic resume", "Limited templates", "Basic editing", "PDF with Succeedora branding"]],
    ["Pro", "$12", ["Multiple resumes", "Premium templates", "PDF without branding", "AI resume improvements", "Cover letter generator"]],
    ["Premium", "$24", ["Unlimited resumes", "All premium templates", "Advanced ATS analysis", "Job-specific tailoring", "Priority support"]],
  ],
  comparisonRows: [
    ["Saved resumes", "1 basic resume", "Multiple resumes", "Unlimited resumes"],
    ["Templates", "Limited templates", "Premium templates", "All premium templates"],
    ["PDF", "With Succeedora branding", "Without branding", "Without branding"],
    ["Cover letter", "Limited basic access", "Cover letter generator", "Advanced tailored letters"],
    ["AI / ATS", "Limited", "AI improvements", "ATS analysis and advanced suggestions"],
    ["Job tailoring", "No", "Basic", "Advanced"],
    ["Support", "Standard", "Basic priority", "Priority"],
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
    orderId: "Order ID",
    pixPayload: "Pix code",
    confirmedAt: "Confirmed by user",
    approvedAt: "Approved at",
    rejectedAt: "Rejected at",
    approvedBy: "Approved by",
    rejectedBy: "Rejected by",
    rejectionReason: "Rejection reason",
    pixCopyPaste: "Pix copy and paste",
    copyCode: "Copy code",
    codeCopied: "Code copied",
    completed: "I have completed the payment",
    dataTitle: "Pix payment",
    dataSubtitle: "Confirm the information below before generating the QR Code.",
    fullName: "Full name",
    contactEmail: "Contact email",
    taxId: "CPF or CNPJ",
    optional: "optional",
    note: "Note",
    generatePix: "Generate Pix QR Code",
    dataHelp: "Use correct information to help us manually confirm your payment.",
    requiredError: "Fill in full name, email and CPF or CNPJ to generate the Pix payment.",
    afterPayInstruction: "After paying, click 'I have completed the payment'.",
    checkingTitle: "Checking your confirmation...",
    checkingText: "We are registering your request for manual review.",
    reviewTitle: "Payment under review",
    reviewText: "We received your payment confirmation. Our team will manually review the Pix payment and unlock the feature once approved.",
    reviewNote: "Access may not be immediate.",
    viewMyPayments: "View my payments",
    backDashboard: "Back to dashboard",
    approvedMessage: "Payment approved. Feature unlocked.",
    rejectedMessage: "Payment rejected. Check the information or contact support.",
    cancel: "Cancel",
    warning: "After payment, access may not be immediate. Confirmation will be manually reviewed by the Succeedora team.",
    waitingPayment: "Waiting for payment",
    waitingConfirmation: "Payment under review",
    approved: "Approved",
    rejected: "Rejected",
    cancelled: "Cancelled",
    confirmedMessage: "We received your confirmation. The payment will be manually reviewed before the feature is unlocked.",
    historyTitle: "Payments",
    historyEmpty: "No Pix payment requests yet.",
    viewDetails: "View details",
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
  showPassword: "Mostrar senha",
  hidePassword: "Esconder senha",
  resetSubtitle: "Digite seu e-mail para receber as instru\u00e7\u00f5es de recupera\u00e7\u00e3o.",
  sendCode: "Enviar instru\u00e7\u00f5es",
  sendingCode: "Preparando instru\u00e7\u00f5es...",
  resetPrepared: "Recupera\u00e7\u00e3o de senha preparada. Configure o envio de e-mails para ativar em produ\u00e7\u00e3o.",
});
Object.assign(I18N.pt.auth.errors, {
  duplicate: "Este e-mail j\u00e1 est\u00e1 cadastrado.",
  login: "E-mail ou senha incorretos.",
  password: "Use pelo menos 8 caracteres.",
  legal: "Voc\u00ea precisa aceitar os Termos de Uso e a Pol\u00edtica de Privacidade para continuar.",
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
  featureComparisonTitle: "Compare os planos",
  featureComparisonSubtitle: "Veja a diferen\u00e7a entre Gr\u00e1tis, Pro e Premium.",
  featureColumnLabel: "Recurso",
  included: "Inclu\u00eddo",
  limited: "Limitado",
  notIncluded: "N\u00e3o inclu\u00eddo",
  plans: [
    ["Gr\u00e1tis", "R$0", ["1 curr\u00edculo b\u00e1sico", "Modelos limitados", "Edi\u00e7\u00e3o b\u00e1sica", "PDF com marca da Succeedora"]],
    ["Pro", "R$59", ["V\u00e1rios curr\u00edculos", "Modelos premium", "PDF sem marca", "Melhorias com IA", "Gerador de carta de apresenta\u00e7\u00e3o"]],
    ["Premium", "R$99", ["Curr\u00edculos ilimitados", "Todos os modelos premium", "An\u00e1lise ATS avan\u00e7ada", "Adapta\u00e7\u00e3o para vagas", "Suporte priorit\u00e1rio"]],
  ],
  comparisonRows: [
    ["Curr\u00edculos salvos", "1 curr\u00edculo b\u00e1sico", "V\u00e1rios curr\u00edculos", "Curr\u00edculos ilimitados"],
    ["Modelos", "Modelos limitados", "Modelos premium", "Todos os modelos premium"],
    ["PDF", "PDF com marca da Succeedora", "PDF sem marca", "PDF sem marca"],
    ["Carta de apresenta\u00e7\u00e3o", "B\u00e1sico limitado", "Gerador de carta", "Cartas avan\u00e7adas e adaptadas"],
    ["IA / ATS", "Limitado", "Melhorias com IA", "An\u00e1lise ATS e sugest\u00f5es avan\u00e7adas"],
    ["Adapta\u00e7\u00e3o para vaga", "N\u00e3o", "B\u00e1sico", "Avan\u00e7ado"],
    ["Suporte", "Padr\u00e3o", "Priorit\u00e1rio b\u00e1sico", "Priorit\u00e1rio"],
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
    orderId: "ID do pedido",
    pixPayload: "Código Pix",
    confirmedAt: "Confirmado pelo usuário",
    approvedAt: "Aprovado em",
    rejectedAt: "Recusado em",
    approvedBy: "Aprovado por",
    rejectedBy: "Recusado por",
    rejectionReason: "Motivo da recusa",
    pixCopyPaste: "Pix Copia e Cola",
    copyCode: "Copiar código",
    codeCopied: "Código copiado",
    completed: "Já realizei o pagamento",
    dataTitle: "Pagamento via Pix",
    dataSubtitle: "Confirme os dados abaixo antes de gerar o QR Code.",
    fullName: "Nome completo",
    contactEmail: "E-mail de contato",
    taxId: "CPF ou CNPJ",
    optional: "opcional",
    note: "Observação",
    generatePix: "Gerar QR Code Pix",
    dataHelp: "Use dados corretos para facilitar a confirmação manual do pagamento.",
    requiredError: "Preencha nome, e-mail e CPF ou CNPJ para gerar o Pix.",
    afterPayInstruction: "Após pagar, clique em 'Já realizei o pagamento'.",
    checkingTitle: "Verificando sua confirmação...",
    checkingText: "Estamos registrando sua solicitação para análise manual.",
    reviewTitle: "Pagamento em análise",
    reviewText: "Recebemos sua confirmação de pagamento. Nossa equipe irá verificar manualmente o Pix e liberar o recurso assim que for aprovado.",
    reviewNote: "A liberação pode não ser imediata.",
    viewMyPayments: "Ver meus pagamentos",
    backDashboard: "Voltar ao dashboard",
    approvedMessage: "Pagamento aprovado. Recurso liberado.",
    rejectedMessage: "Pagamento recusado. Verifique os dados ou entre em contato com o suporte.",
    cancel: "Cancelar",
    warning: "Após o pagamento, a liberação pode não ser imediata. A confirmação será feita manualmente pela equipe da Succeedora.",
    waitingPayment: "Aguardando pagamento",
    waitingConfirmation: "Em análise",
    approved: "Aprovado",
    rejected: "Recusado",
    cancelled: "Cancelado",
    confirmedMessage: "Recebemos sua confirmação. O pagamento será analisado manualmente antes da liberação do recurso.",
    historyTitle: "Pagamentos",
    historyEmpty: "Nenhum pedido Pix criado ainda.",
    viewDetails: "Ver detalhes",
    manualBadge: "Confirmação manual",
    pixOnly: "Pix está disponível apenas para compras avulsas.",
  },
});

Object.assign(I18N.en.payments, {
  payWithCard: "Pay with card",
  subscribeWithCard: "Subscribe with card",
  secureStripe: "Secure payment via Stripe",
  cardInstallmentsNote: "Installments are available by card when enabled by the payment provider.",
  manageSubscription: "Manage subscription",
  stripeTestMode: "Stripe test mode",
  stripeTestNotice: "No real charge will be made in test mode.",
  redirectingStripe: "Opening secure Stripe Checkout...",
  stripeUnavailable: "Card payment is not available yet. Check Stripe environment variables and backend storage.",
  cardMethod: "Card via Stripe",
  receipt: "Receipt",
  subscription: "Subscription",
  historyEmpty: "No payment requests yet.",
  successTitle: "Payment received",
  successText: "Payment received. We are updating your access.",
  cancelTitle: "Payment canceled",
  cancelText: "Payment canceled. No charge was completed.",
  paid: "Paid",
  failed: "Failed",
  refunded: "Refunded",
});
Object.assign(I18N.pt.payments, {
  payWithCard: "Pagar com cartão",
  subscribeWithCard: "Assinar com cartão",
  secureStripe: "Pagamento seguro via Stripe",
  cardInstallmentsNote: "Parcelamento disponível no cartão quando habilitado pelo provedor de pagamento.",
  manageSubscription: "Gerenciar assinatura",
  stripeTestMode: "Stripe em modo teste",
  stripeTestNotice: "Nenhuma cobrança real será feita em ambiente de teste.",
  redirectingStripe: "Abrindo Checkout seguro da Stripe...",
  stripeUnavailable: "Pagamento com cartão ainda não está disponível. Verifique variáveis da Stripe e armazenamento backend.",
  cardMethod: "Cartão via Stripe",
  receipt: "Recibo",
  subscription: "Assinatura",
  historyEmpty: "Nenhum pagamento criado ainda.",
  successTitle: "Pagamento recebido",
  successText: "Pagamento recebido. Estamos atualizando seu acesso.",
  cancelTitle: "Pagamento cancelado",
  cancelText: "Pagamento cancelado. Nenhuma cobrança foi concluída.",
  paid: "Pago",
  failed: "Falhou",
  refunded: "Reembolsado",
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
  "One-time payments may unlock specific features, such as watermark removal, premium PDF, premium templates, AI credits, career packs or online resume links. One-time payments unlock specific features without automatically turning the user into a subscriber. Pix payments will be accepted only for one-time purchases. Pix will not be used for recurring subscriptions or installment payments. In the initial manual Pix phase, Succeedora may show a Pix QR Code using the company CNPJ 60.099.692/0001-07 as the Pix key, and access will only be released after manual review and approval."
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
  "For Pix payments, we may process information necessary to identify and confirm the payment, such as name, email, amount, date, CNPJ Pix key, Pix payload, submitted receipt if requested, confirmation status and requested feature. Pix will be used only for one-time payments. In early stages, Pix confirmation may be manual before any feature is unlocked."
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
  "Pagamentos \u00fanicos podem liberar recursos espec\u00edficos, como remo\u00e7\u00e3o de marca d'\u00e1gua, PDF premium, modelos premium, cr\u00e9ditos de IA, pacotes de carreira ou link de curr\u00edculo online. Pagamentos \u00fanicos liberam recursos espec\u00edficos sem transformar automaticamente o usu\u00e1rio em assinante. Pagamentos via Pix ser\u00e3o aceitos apenas para compras avulsas e pagamentos \u00fanicos. Pix n\u00e3o ser\u00e1 usado para assinaturas recorrentes ou pagamentos parcelados. Na fase inicial de Pix manual, a Succeedora poder\u00e1 exibir QR Code Pix usando o CNPJ 60.099.692/0001-07 como chave Pix, e o acesso s\u00f3 ser\u00e1 liberado ap\u00f3s an\u00e1lise e aprova\u00e7\u00e3o manual."
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
  "Para pagamentos via Pix, poderemos tratar informa\u00e7\u00f5es necess\u00e1rias para identifica\u00e7\u00e3o e confirma\u00e7\u00e3o do pagamento, como nome, e-mail, valor, data, chave Pix CNPJ, payload Pix, comprovante enviado se solicitado, status de confirma\u00e7\u00e3o e recurso solicitado. Pix ser\u00e1 usado apenas para pagamentos \u00fanicos. Em fases iniciais, a confirma\u00e7\u00e3o de Pix poder\u00e1 ser manual antes da libera\u00e7\u00e3o de qualquer recurso."
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
  plannedPaymentMethodsTitle: "Payment methods",
  plannedPaymentMethodsStatus: "Payments",
  plannedPaymentMethodsText: "Planned options for purchases and subscriptions when payments are activated.",
  paymentMethods: [
    ["Pix", "For one-time purchases with manual confirmation."],
    ["Card via Stripe", "For subscriptions and international payments."],
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
    ["Can Pix be used for subscriptions?", "No. Pix is planned for one-time payments and manual confirmations, not automatic recurring billing."],
    ["How will card payments work?", "Card payments may be processed via Stripe for Pro and Premium subscriptions, international payments and recurring billing when available."],
    ["What are AI credits?", "AI credits unlock AI actions such as rewriting, translation, cover letters, job tailoring and ATS suggestions."],
    ["Can I cancel my subscription anytime?", "Yes. When subscriptions are activated, cancellation details will be shown before purchase confirmation."],
  ],
});

Object.assign(I18N.pt.pricing, {
  plannedPaymentMethodsTitle: "M\u00e9todos de pagamento",
  plannedPaymentMethodsStatus: "Pagamentos",
  plannedPaymentMethodsText: "Op\u00e7\u00f5es previstas para compras e assinaturas quando os pagamentos forem ativados.",
  paymentMethods: [
    ["Pix", "Para compras avulsas com confirma\u00e7\u00e3o manual."],
    ["Cart\u00e3o via Stripe", "Para assinaturas e pagamentos internacionais."],
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
    ["Pix poder\u00e1 ser usado em assinaturas?", "N\u00e3o. Pix est\u00e1 previsto para pagamentos \u00fanicos e confirma\u00e7\u00f5es manuais, n\u00e3o para cobran\u00e7a recorrente autom\u00e1tica."],
    ["Como funcionar\u00e1 o cart\u00e3o?", "Pagamentos com cart\u00e3o poder\u00e3o ser processados via Stripe para assinaturas Pro e Premium, pagamentos internacionais e cobran\u00e7a recorrente quando dispon\u00edveis."],
    ["O que s\u00e3o cr\u00e9ditos de IA?", "Cr\u00e9ditos de IA liberam a\u00e7\u00f5es como reescrita, tradu\u00e7\u00e3o, carta de apresenta\u00e7\u00e3o, adapta\u00e7\u00e3o para vaga e sugest\u00f5es ATS."],
    ["Posso cancelar minha assinatura quando quiser?", "Sim. Quando assinaturas forem ativadas, os detalhes de cancelamento aparecer\u00e3o antes da confirma\u00e7\u00e3o da compra."],
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

Object.assign(I18N.en.dashboard.nav, { support: "Support", admin: "Admin" });
Object.assign(I18N.pt.dashboard.nav, { support: "Suporte", admin: "Admin" });

Object.assign(I18N.en, {
  admin: {
    title: "Admin",
    restricted: "Restricted access.",
    primaryAdmin: "Primary admin email",
    sections: { overview: "Overview", users: "Users", payments: "Payments", pendingPix: "Pending Pix", plans: "Plans", purchases: "One-time purchases", credits: "AI Credits", support: "Support", settings: "Settings" },
    metrics: { users: "Registered users", free: "Free users", pending: "Pending payments", pendingPix: "Pix waiting confirmation", openSupport: "Open support tickets", approved: "Approved payments", pro: "Pro users", premium: "Premium users", purchases: "One-time purchases", creditsSold: "AI credits distributed" },
    table: { name: "Name", email: "Email", plan: "Effective plan", subscriptionStatus: "Subscription status", planExpiresAt: "Plan validity", createdAt: "Created at", emailVerified: "Email confirmed", resumes: "Resumes", letters: "Letters", aiCredits: "AI credits", status: "Account status", actions: "Actions", id: "Order ID", user: "User", payerName: "Informed name", payerTaxId: "CPF/CNPJ", product: "Product", amount: "Amount", currency: "Currency", method: "Payment method", date: "Date", pixKey: "Pix key", unlocked: "Feature unlocked", admin: "Admin", action: "Action", oldValue: "Old value", newValue: "New value" },
    actions: { view: "View", reply: "Reply", markInProgress: "Mark in progress", close: "Close", sendReply: "Send reply", changePlan: "Change plan", addCredits: "Add credits", removeCredits: "Remove credits", block: "Block user", unblock: "Unblock user", approve: "Approve", reject: "Reject", details: "View details", save: "Save", cancel: "Cancel" },
    filters: { search: "Search by name, email or product", searchTickets: "Search tickets...", status: "Filter by status", category: "Filter by category", priority: "Filter by priority", all: "All statuses", allCategories: "All categories", allPriorities: "All priorities" },
    status: { active: "Active", expired: "Expired", noExpiration: "No expiration", blocked: "Blocked", yes: "Yes", no: "No", open: "Open", in_progress: "In progress", answered: "Answered", closed: "Closed", pending_payment: "Waiting for payment", pending_manual_confirmation: "Payment under review", approved: "Approved", paid: "Paid", pending: "Pending", failed: "Failed", refunded: "Refunded", rejected: "Rejected", cancelled: "Cancelled", pix: "Pix", stripe: "Card via Stripe" },
    messages: { planUpdated: "Plan updated successfully.", paymentApproved: "Payment approved and feature unlocked.", paymentRejected: "Payment rejected.", creditsAdded: "Credits added.", creditsRemoved: "Credits removed.", userBlocked: "User blocked.", userUnblocked: "User unblocked.", replySent: "Reply sent successfully.", ticketClosed: "Ticket closed." },
    fields: { quantity: "Quantity", reason: "Reason", newPlan: "New plan", duration: "Duration", customDate: "Custom date" },
    rejectReasons: ["Payment not found", "Incorrect amount", "Invalid receipt", "Duplicate request", "Other reason"],
    details: { profile: "User details", savedResumes: "Saved resumes", savedLetters: "Saved cover letters", payments: "Payments", purchases: "One-time purchases", credits: "AI Credits", creditHistory: "Credit history", auditLog: "Audit log", noData: "No records yet." },
    settings: { cnpj: "Pix CNPJ", pixKey: "Pix key", pixKeyType: "Pix key type", pixManual: "Pix status", stripe: "Stripe status", manual: "Manual for now", disabled: "Disabled for now" },
  },
});

Object.assign(I18N.pt, {
  admin: {
    title: "Admin",
    restricted: "Acesso restrito.",
    primaryAdmin: "E-mail admin principal",
    sections: { overview: "Vis\u00e3o geral", users: "Usu\u00e1rios", payments: "Pagamentos", pendingPix: "Pix pendentes", plans: "Planos", purchases: "Compras avulsas", credits: "Cr\u00e9ditos de IA", support: "Suporte", settings: "Configura\u00e7\u00f5es" },
    metrics: { users: "Usu\u00e1rios cadastrados", free: "Usu\u00e1rios Free", pending: "Pagamentos pendentes", pendingPix: "Pix aguardando confirma\u00e7\u00e3o", openSupport: "Tickets de suporte abertos", approved: "Pagamentos aprovados", pro: "Usu\u00e1rios Pro", premium: "Usu\u00e1rios Premium", purchases: "Compras avulsas", creditsSold: "Cr\u00e9ditos de IA distribu\u00eddos" },
    table: { name: "Nome", email: "E-mail", plan: "Plano efetivo", subscriptionStatus: "Status da assinatura", planExpiresAt: "Validade do plano", createdAt: "Cadastro", emailVerified: "E-mail confirmado", resumes: "Curr\u00edculos", letters: "Cartas", aiCredits: "Cr\u00e9ditos de IA", status: "Status da conta", actions: "A\u00e7\u00f5es", id: "ID do pedido", user: "Usu\u00e1rio", payerName: "Nome informado", payerTaxId: "CPF/CNPJ", product: "Produto", amount: "Valor", currency: "Moeda", method: "M\u00e9todo de pagamento", date: "Data", pixKey: "Chave Pix", unlocked: "Recurso liberado", admin: "Admin", action: "A\u00e7\u00e3o", oldValue: "Valor antigo", newValue: "Valor novo" },
    actions: { view: "Ver", reply: "Responder", markInProgress: "Marcar em andamento", close: "Fechar", sendReply: "Enviar resposta", changePlan: "Alterar plano", addCredits: "Adicionar cr\u00e9ditos", removeCredits: "Remover cr\u00e9ditos", block: "Bloquear usu\u00e1rio", unblock: "Desbloquear usu\u00e1rio", approve: "Aprovar", reject: "Recusar", details: "Ver detalhes", save: "Salvar", cancel: "Cancelar" },
    filters: { search: "Buscar por nome, e-mail ou produto", searchTickets: "Buscar tickets...", status: "Filtrar por status", category: "Filtrar por categoria", priority: "Filtrar por prioridade", all: "Todos os status", allCategories: "Todas as categorias", allPriorities: "Todas as prioridades" },
    status: { active: "Ativo", expired: "Expirado", noExpiration: "Sem expira\u00e7\u00e3o", blocked: "Bloqueado", yes: "Sim", no: "N\u00e3o", open: "Aberto", in_progress: "Em andamento", answered: "Respondido", closed: "Fechado", pending_payment: "Aguardando pagamento", pending_manual_confirmation: "Em an\u00e1lise", approved: "Aprovado", paid: "Pago", pending: "Pendente", failed: "Falhou", refunded: "Reembolsado", rejected: "Recusado", cancelled: "Cancelado", pix: "Pix", stripe: "Cart\u00e3o via Stripe" },
    messages: { planUpdated: "Plano atualizado com sucesso.", paymentApproved: "Pagamento aprovado e recurso liberado.", paymentRejected: "Pagamento recusado.", creditsAdded: "Cr\u00e9ditos adicionados.", creditsRemoved: "Cr\u00e9ditos removidos.", userBlocked: "Usu\u00e1rio bloqueado.", userUnblocked: "Usu\u00e1rio desbloqueado.", replySent: "Resposta enviada com sucesso.", ticketClosed: "Ticket fechado." },
    fields: { quantity: "Quantidade", reason: "Motivo", newPlan: "Novo plano", duration: "Duração", customDate: "Data personalizada" },
    rejectReasons: ["Pagamento n\u00e3o encontrado", "Valor incorreto", "Comprovante inv\u00e1lido", "Pedido duplicado", "Outro motivo"],
    details: { profile: "Detalhes do usu\u00e1rio", savedResumes: "Curr\u00edculos salvos", savedLetters: "Cartas salvas", payments: "Pagamentos", purchases: "Compras avulsas", credits: "Cr\u00e9ditos de IA", creditHistory: "Hist\u00f3rico de cr\u00e9ditos", auditLog: "Hist\u00f3rico administrativo", noData: "Nenhum registro ainda." },
    settings: { cnpj: "CNPJ Pix", pixKey: "Chave Pix", pixKeyType: "Tipo da chave Pix", pixManual: "Status Pix", stripe: "Status Stripe", manual: "Manual por enquanto", disabled: "Desativado por enquanto" },
  },
});

Object.assign(I18N.en, {
  support: {
    title: "Support",
    heroEyebrow: "SUCCEEDORA SUPPORT",
    heroTitle: "How can we help?",
    intro: "Send a request, track progress and receive replies from the Succeedora team in one place.",
    formTitle: "New support request",
    formSubtitle: "Describe your issue clearly so we can help you as efficiently as possible.",
    historyTitle: "Your requests",
    historySubtitle: "Track your message history and replies from the team.",
    send: "Send message",
    sending: "Sending...",
    success: "Message sent successfully. Our team will review your request.",
    emptyTitle: "You haven\u2019t sent any requests yet.",
    empty: "Once you send your first message, it will appear here with status updates and replies.",
    emptyCta: "Create first request",
    replyNotice: "You received a support reply.",
    adminReply: "Support reply",
    noReply: "No reply yet.",
    you: "You",
    team: "Succeedora Team",
    lastUpdate: "Last update",
    preview: "Latest message",
    responseWindow: "Average response: up to 24h",
    secureChannel: "Secure channel",
    centralizedHistory: "Centralized history",
    organizedSupport: "Organized support",
    fields: { subject: "Subject", category: "Category", priority: "Priority", message: "Message" },
    fieldHints: { subject: "Short summary of the issue", category: "Choose the related area", priority: "Select urgency", message: "Share as much useful detail as possible" },
    categories: { account: "Account", resume: "Resumes", cover_letter: "Cover Letters", payment: "Payments", plans: "Plans", ai: "AI", pdf_export: "PDF & Export", technical_issue: "Technical Issue", website_issue: "Technical Issue", suggestion: "Suggestion", other: "Other" },
    priorities: { low: "Low", medium: "Medium", high: "High" },
    status: { open: "Open", in_progress: "In review", answered: "Replied", closed: "Resolved" },
    placeholders: { subject: "Briefly describe what you need", message: "Share the details so we can understand the request." },
    metrics: { open: "Open requests", lastReply: "Last reply", responseTime: "Response time", supportStatus: "Support status", none: "No activity yet", noReply: "No reply yet", upTo24h: "Up to 24h", available: "Available" },
    helpTitle: "Quick help",
    helpSubtitle: "Find the right path faster before sending a request.",
    helpCards: [
      ["file", "Account access", "Login, profile and account settings."],
      ["payment", "Payments", "Purchases, plans and manual confirmations."],
      ["resume", "Resumes and PDF", "Builder, templates, PDF and export issues."],
      ["mail", "Cover Letters", "Questions about saved letters and generation."],
      ["shield", "Plans and upgrades", "Limits, premium access and unlocked features."],
      ["sparkles", "AI and technical support", "AI tools, site behavior and technical issues."],
    ],
    admin: {
      intro: "View, prioritize and answer support tickets sent by users.",
      searchPlaceholder: "Search tickets...",
      userDetails: "User details",
      ticketDetails: "Ticket details",
      history: "Basic history",
      replyLabel: "Support reply",
      noTickets: "No support tickets yet.",
      created: "Ticket created",
      progressed: "Marked in progress",
      answered: "Support replied",
      closed: "Ticket closed",
    },
  },
});

Object.assign(I18N.pt, {
  support: {
    title: "Suporte",
    heroEyebrow: "SUPORTE SUCCEEDORA",
    heroTitle: "Como podemos ajudar?",
    intro: "Envie uma solicitação, acompanhe o andamento e receba respostas da equipe da Succeedora em um só lugar.",
    formTitle: "Nova solicitação de suporte",
    formSubtitle: "Descreva sua dúvida ou problema com clareza para que possamos ajudar da melhor forma possível.",
    historyTitle: "Suas solicitações",
    historySubtitle: "Acompanhe o histórico das suas mensagens e as respostas da equipe.",
    send: "Enviar mensagem",
    sending: "Enviando...",
    success: "Mensagem enviada com sucesso. Nossa equipe analisará sua solicitação.",
    emptyTitle: "Você ainda não enviou nenhuma solicitação.",
    empty: "Quando enviar sua primeira mensagem, ela aparecerá aqui com status e atualizações.",
    emptyCta: "Criar primeira solicitação",
    replyNotice: "Você recebeu uma resposta do suporte.",
    adminReply: "Resposta do suporte",
    noReply: "Ainda sem resposta.",
    you: "Você",
    team: "Equipe Succeedora",
    lastUpdate: "Última atualização",
    preview: "Última mensagem",
    responseWindow: "Resposta média: até 24h",
    secureChannel: "Canal seguro",
    centralizedHistory: "Histórico centralizado",
    organizedSupport: "Suporte organizado",
    fields: { subject: "Assunto", category: "Categoria", priority: "Prioridade", message: "Mensagem" },
    fieldHints: { subject: "Resumo curto do problema", category: "Escolha a área relacionada", priority: "Selecione a urgência", message: "Explique o máximo de detalhes possível" },
    categories: { account: "Conta", resume: "Currículos", cover_letter: "Cartas de apresentação", payment: "Pagamentos", plans: "Planos", ai: "IA", pdf_export: "PDF e exportação", technical_issue: "Problema técnico", website_issue: "Problema técnico", suggestion: "Sugestão", other: "Outro" },
    priorities: { low: "Baixa", medium: "Média", high: "Alta" },
    status: { open: "Aberto", in_progress: "Em análise", answered: "Respondido", closed: "Resolvido" },
    placeholders: { subject: "Descreva rapidamente o que você precisa", message: "Conte os detalhes para entendermos a solicitação." },
    metrics: { open: "Solicitações abertas", lastReply: "Última resposta", responseTime: "Tempo de resposta", supportStatus: "Status do suporte", none: "Sem atividade ainda", noReply: "Sem resposta ainda", upTo24h: "Até 24h", available: "Disponível" },
    helpTitle: "Ajuda rápida",
    helpSubtitle: "Encontre o caminho certo mais rápido antes de enviar uma solicitação.",
    helpCards: [
      ["file", "Acesso à conta", "Login, perfil e configurações da conta."],
      ["payment", "Pagamentos", "Compras, planos e confirmações manuais."],
      ["resume", "Currículos e PDF", "Criador, modelos, PDF e problemas de exportação."],
      ["mail", "Cartas de apresentação", "Dúvidas sobre cartas salvas e geração."],
      ["shield", "Planos e upgrade", "Limites, acesso premium e recursos liberados."],
      ["sparkles", "IA e suporte técnico", "Ferramentas de IA, comportamento do site e problemas técnicos."],
    ],
    admin: {
      intro: "Visualize, priorize e responda tickets de suporte enviados pelos usuários.",
      searchPlaceholder: "Buscar tickets...",
      userDetails: "Dados do usuário",
      ticketDetails: "Detalhes do ticket",
      history: "Histórico básico",
      replyLabel: "Resposta do suporte",
      noTickets: "Nenhum ticket de suporte ainda.",
      created: "Ticket criado",
      progressed: "Marcado em andamento",
      answered: "Suporte respondeu",
      closed: "Ticket fechado",
    },
  },
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
  "/payment/success": renderPaymentSuccess,
  "/payment/cancel": renderPaymentCancel,
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
  "/admin": renderAdminOverview,
  "/admin/users": renderAdminUsers,
  "/admin/payments": renderAdminPayments,
  "/admin/payments/pix": renderAdminPendingPix,
  "/admin/plans": renderAdminPlans,
  "/admin/purchases": renderAdminPurchases,
  "/admin/credits": renderAdminCredits,
  "/admin/support": renderAdminSupport,
  "/admin/settings": renderAdminSettings,
  "/dashboard": renderDashboard,
  "/dashboard/resumes": renderResumes,
  "/dashboard/builder": renderBuilder,
  "/dashboard/cover-letters": renderCoverLetters,
  "/dashboard/templates": renderTemplatesPage,
  "/dashboard/ai": renderAiAssistant,
  "/dashboard/support": renderSupport,
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
  "/dashboard/support",
  "/dashboard/profile",
  "/dashboard/settings",
  "/dashboard/billing",
  "/profile",
  "/settings",
  "/admin",
  "/admin/users",
  "/admin/payments",
  "/admin/payments/pix",
  "/admin/plans",
  "/admin/purchases",
  "/admin/credits",
  "/admin/support",
  "/admin/settings",
]);

const PUBLIC_CLEAN_ROUTES = new Set(["/pricing", "/terms", "/privacy", "/contact", "/templates"]);

const NOINDEX_ROUTES = new Set([
  "/login",
  "/signin",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/reset-password",
  "/payment/success",
  "/payment/cancel",
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

const TEMPLATE_STATUS = Object.freeze({
  active: "active",
  draft: "draft",
  hidden: "hidden",
  disabled: "disabled",
});

const TEMPLATE_STATUS_BY_KEY = Object.freeze({
  modern: TEMPLATE_STATUS.active,
  "simple-ats": TEMPLATE_STATUS.active,
  sales: TEMPLATE_STATUS.active,
  minimal: TEMPLATE_STATUS.draft,
  professional: TEMPLATE_STATUS.draft,
  tech: TEMPLATE_STATUS.draft,
  student: TEMPLATE_STATUS.draft,
  "first-job": TEMPLATE_STATUS.draft,
  executive: TEMPLATE_STATUS.hidden,
  creative: TEMPLATE_STATUS.hidden,
  international: TEMPLATE_STATUS.hidden,
  classic: TEMPLATE_STATUS.hidden,
  corporate: TEMPLATE_STATUS.hidden,
  elegant: TEMPLATE_STATUS.hidden,
  "senior-executive": TEMPLATE_STATUS.hidden,
  marketing: TEMPLATE_STATUS.hidden,
  developer: TEMPLATE_STATUS.hidden,
  designer: TEMPLATE_STATUS.hidden,
  healthcare: TEMPLATE_STATUS.hidden,
  legal: TEMPLATE_STATUS.hidden,
  finance: TEMPLATE_STATUS.hidden,
  academic: TEMPLATE_STATUS.hidden,
  "remote-work": TEMPLATE_STATUS.hidden,
  operations: TEMPLATE_STATUS.hidden,
  manager: TEMPLATE_STATUS.hidden,
  consultant: TEMPLATE_STATUS.hidden,
  startup: TEMPLATE_STATUS.hidden,
  global: TEMPLATE_STATUS.hidden,
  "clean-pro": TEMPLATE_STATUS.disabled,
  "modern-ats": TEMPLATE_STATUS.disabled,
  "customer-service": TEMPLATE_STATUS.disabled,
  graduate: TEMPLATE_STATUS.disabled,
});

function templateStatus(key) {
  return TEMPLATE_STATUS_BY_KEY[key] || TEMPLATE_STATUS.hidden;
}

function isTemplateActive(template = {}) {
  return (template.status || templateStatus(template.key)) === TEMPLATE_STATUS.active;
}

const RESUME_TEMPLATES = [
  {
    key: "modern",
    name: "Modern",
    icon: "file",
    category: "Modern",
    categories: {
      en: "Modern / Professional",
      pt: "Moderno / Profissional",
    },
    access: "pro",
    descriptions: {
      en: "Modern and versatile template with a premium structure for professional resumes.",
      pt: "Modelo moderno e versátil, com estrutura premium para currículos profissionais.",
    },
    previewDescriptions: {
      en: "A Pro template with a modern layout, two information areas and a premium look for professionals who want to stand out clearly.",
      pt: "Um modelo Pro com layout moderno, duas áreas de informação e visual premium para profissionais que querem se destacar com clareza.",
    },
    bestFor: {
      en: "Administrative professionals, analysts, coordinators, corporate roles and career transitions",
      pt: "Profissionais administrativos, analistas, coordenadores, áreas corporativas e transição de carreira",
    },
    idealFor: {
      en: ["administrative professionals", "analysts", "coordinators", "corporate roles", "career transitions", "users who want a modern resume without excess"],
      pt: ["profissionais administrativos", "analistas", "coordenadores", "áreas corporativas", "profissionais em transição", "usuários que querem um currículo moderno sem exageros"],
    },
  },
  {
    key: "minimal",
    name: "Minimal ATS",
    icon: "shield",
    category: "ATS",
    access: "free",
    descriptions: {
      en: "Clean and direct template, ideal for ATS systems and traditional applications.",
      pt: "Modelo limpo e direto, ideal para sistemas ATS e candidaturas tradicionais.",
    },
    previewDescriptions: {
      en: "A simple, clean and highly readable template, ideal for applications that require clarity and ATS compatibility.",
      pt: "Um modelo simples, limpo e altamente legível, ideal para candidaturas que exigem clareza e compatibilidade com sistemas de recrutamento.",
    },
    bestFor: {
      en: "Most job applications and ATS systems",
      pt: "A maioria das candidaturas e sistemas ATS",
    },
    idealFor: {
      en: ["corporate roles", "administrative positions", "traditional applications", "ATS systems", "users who prefer a direct resume"],
      pt: ["vagas corporativas", "cargos administrativos", "candidaturas tradicionais", "sistemas ATS", "usuários que preferem currículo direto"],
    },
  },
  {
    key: "executive",
    name: "Executive",
    names: {
      en: "Executive",
      pt: "Executivo",
    },
    icon: "layout",
    category: "Executive",
    categories: {
      en: "Executive / Leadership",
      pt: "Executivo / Liderança",
    },
    access: "pro",
    descriptions: {
      en: "Premium executive template for leadership, management and corporate roles.",
      pt: "Modelo executivo e premium para profissionais de liderança, gestão e cargos corporativos.",
    },
    previewDescriptions: {
      en: "A Pro template with a corporate look, strong header and focus on leadership, experience and professional results.",
      pt: "Um modelo Pro com aparência corporativa, cabeçalho forte e foco em liderança, experiência e resultados profissionais.",
    },
    bestFor: {
      en: "Managers, coordinators, senior professionals and leadership roles",
      pt: "Gestores, coordenadores, profissionais seniores e liderança",
    },
    idealFor: {
      en: ["supervisors", "coordinators", "managers", "team leaders", "corporate professionals", "senior administrative roles"],
      pt: ["supervisores", "coordenadores", "gerentes", "líderes de equipe", "profissionais corporativos", "cargos administrativos seniores"],
    },
  },
  {
    key: "creative",
    name: "Creative",
    icon: "sparkles",
    category: "Creative",
    categories: {
      en: "Creative / Portfolio",
      pt: "Criativo / Portfolio",
    },
    access: "pro",
    previewDescriptions: {
      en: "A creative Pro layout with stronger personality, visible projects and polished visual hierarchy without losing professional restraint.",
      pt: "Um layout Pro criativo, com mais personalidade, projetos visiveis e hierarquia visual refinada sem perder seriedade profissional.",
    },
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
    categories: {
      en: "Student / First job",
      pt: "Estudante / Primeiro emprego",
    },
    access: "free",
    descriptions: {
      en: "Light and professional template for students, internships and first opportunities.",
      pt: "Modelo leve e profissional para estudantes, estágios e primeiras oportunidades.",
    },
    previewDescriptions: {
      en: "A template designed for people starting their career, highlighting education, skills, courses and projects even with limited work experience.",
      pt: "Um modelo pensado para quem está começando a carreira, valorizando formação, habilidades, cursos e projetos mesmo com pouca experiência profissional.",
    },
    bestFor: {
      en: "Students, internships, first jobs, young professionals and recent graduates",
      pt: "Estudantes, estágios, primeiro emprego, jovens profissionais e recém-formados",
    },
    idealFor: {
      en: ["students", "internships", "first jobs", "young professionals", "recent graduates"],
      pt: ["estudantes", "estágios", "primeiro emprego", "jovens profissionais", "recém-formados"],
    },
  },
  {
    key: "international",
    name: "International",
    icon: "globe",
    category: "International",
    categories: {
      en: "International / Remote",
      pt: "Internacional / Remoto",
    },
    access: "pro",
    previewDescriptions: {
      en: "A globally readable template with a refined profile area, language visibility and clean structure for cross-border applications.",
      pt: "Um modelo de leitura global, com perfil refinado, idiomas visiveis e estrutura limpa para candidaturas internacionais.",
    },
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
    categories: {
      en: "Classic / Formal",
      pt: "Classico / Formal",
    },
    access: "pro",
    previewDescriptions: {
      en: "A sober classic format for conservative applications, with strong readability, centered header and no unnecessary decoration.",
      pt: "Um formato classico e sobrio para candidaturas tradicionais, com alta legibilidade, cabecalho centralizado e sem decoracao excessiva.",
    },
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
    categories: {
      en: "Corporate / Business",
      pt: "Corporativo / Negocios",
    },
    access: "pro",
    previewDescriptions: {
      en: "A polished corporate resume for office, operations, finance and management roles, built to feel serious and business-ready.",
      pt: "Um curriculo corporativo polido para escritorio, operacoes, financas e gestao, com aparencia seria e pronta para empresas.",
    },
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
    categories: {
      en: "Technology / Projects / Product",
      pt: "Tecnologia / Projetos / Produto",
    },
    access: "pro",
    previewDescriptions: {
      en: "Modern Pro template for technology, product, data and digital professionals, with stack, timeline and featured projects.",
      pt: "Modelo Pro moderno para tecnologia, produto, dados e profissionais digitais, com stack, timeline e projetos em destaque.",
    },
    descriptions: {
      en: "A modern technology resume with a SaaS-style layout, strong stack visibility and project-focused hierarchy.",
      pt: "Um currículo moderno de tecnologia, com visual SaaS, stack em destaque e hierarquia focada em projetos.",
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
    category: "ATS",
    categories: {
      en: "ATS / Traditional / Maximum Compatibility",
      pt: "ATS / Tradicional / Compatibilidade Maxima",
    },
    access: "free",
    descriptions: {
      en: "Direct and traditional template designed for maximum compatibility with recruiting systems.",
      pt: "Modelo direto e tradicional, criado para máxima compatibilidade com sistemas de recrutamento.",
    },
    previewDescriptions: {
      en: "An extremely direct and ATS-compatible template, ideal for traditional applications, job platforms and companies using screening systems.",
      pt: "Um modelo extremamente direto e compatível com ATS, ideal para candidaturas tradicionais, plataformas de vagas e empresas que usam sistemas de triagem.",
    },
    bestFor: {
      en: "Traditional applications, large companies, job platforms and ATS-based hiring processes",
      pt: "Candidaturas tradicionais, grandes empresas, plataformas de vagas e processos seletivos com ATS",
    },
    idealFor: {
      en: ["traditional applications", "large companies", "job platforms", "ATS-based hiring processes", "users who want maximum simplicity"],
      pt: ["candidaturas tradicionais", "grandes empresas", "plataformas de vagas", "processos seletivos com ATS", "usuários que querem máxima simplicidade"],
    },
  },
  {
    key: "elegant",
    name: "Elegant",
    icon: "sparkles",
    category: "Elegant",
    categories: {
      en: "Elegant / Premium",
      pt: "Elegante / Premium",
    },
    access: "pro",
    previewDescriptions: {
      en: "Refined and sophisticated template for professionals who want a clean resume with a premium look.",
      pt: "Modelo refinado e sofisticado, ideal para profissionais que querem um currículo limpo com aparência premium.",
    },
    descriptions: {
      en: "Refined and sophisticated template for professionals who want a clean resume with a premium look.",
      pt: "Modelo refinado e sofisticado, ideal para profissionais que querem um currículo limpo com aparência premium.",
    },
    bestFor: {
      en: "Corporate professionals, analysts, coordinators, consultants and administrative roles",
      pt: "Profissionais corporativos, analistas, coordenadores, consultores e áreas administrativas",
    },
    idealFor: {
      en: ["corporate professionals", "analysts", "coordinators", "consultants", "administrative professionals", "users who want elegance without excess"],
      pt: ["profissionais corporativos", "analistas", "coordenadores", "consultores", "áreas administrativas", "profissionais que querem elegância sem exageros"],
    },
  },
  {
    key: "first-job",
    name: "First Job",
    names: {
      en: "First Job",
      pt: "First Job / Primeiro Emprego",
    },
    icon: "pen",
    category: "First Job",
    categories: {
      en: "First job",
      pt: "Primeiro emprego",
    },
    access: "free",
    descriptions: {
      en: "Ideal template for people looking for their first professional opportunity.",
      pt: "Modelo ideal para quem está buscando a primeira oportunidade profissional.",
    },
    previewDescriptions: {
      en: "A template designed for people entering the job market, highlighting career objective, skills, courses and willingness to learn.",
      pt: "Um modelo pensado para quem está entrando no mercado de trabalho, valorizando objetivo profissional, habilidades, cursos e disposição para aprender.",
    },
    bestFor: {
      en: "First job, young apprenticeships, entry-level internships, administrative assistant roles and customer service",
      pt: "Primeiro emprego, jovem aprendiz, estágio inicial, auxiliar administrativo e atendimento",
    },
    idealFor: {
      en: ["first job", "young apprenticeships", "entry-level internships", "administrative assistant roles", "customer service", "users with limited experience"],
      pt: ["primeiro emprego", "jovem aprendiz", "estágio inicial", "auxiliar administrativo", "atendimento", "usuários com pouca experiência"],
    },
  },
];

const ADDITIONAL_RESUME_TEMPLATES = [
  ["professional", "Professional", "Profissional", "Corporate / Professional", "Corporativo / Profissional", "pro", ["pro", "corporate"], "A modern corporate Pro template with a strong contact card, clean timeline and organized sidebar.", "Um modelo Pro corporativo moderno, com card de contato forte, timeline limpa e sidebar organizada.", "Best for corporate, administrative and marketing roles", "Ideal para areas corporativas, administrativas e marketing"],
  ["clean-pro", "Clean Pro", "Clean Pro", "ATS", "ATS", "pro", ["pro", "ats", "corporate"], "A minimal premium layout with generous spacing, refined bullets and discreet skill chips.", "Um layout minimalista premium, com respiro, bullets refinados e chips discretos.", "ATS-focused with premium polish", "Focado em ATS com acabamento premium"],
  ["modern-ats", "Modern ATS", "ATS moderno", "ATS", "ATS", "pro", ["pro", "ats", "technology"], "ATS-safe structure with a sharper modern header and a separated skills band.", "Estrutura segura para ATS, com cabeçalho moderno e faixa de habilidades destacada.", "Online applications and ATS uploads", "Candidaturas online e uploads em ATS"],
  ["senior-executive", "Senior Executive", "Executivo senior", "Executive", "Executivo", "premium", ["premium", "executive", "corporate"], "A signature executive resume with a premium ribbon, strong nameplate, strategic sidebar and polished leadership sections.", "Um currículo executivo premium com faixa de assinatura, nome forte, sidebar estratégica e seções sofisticadas de liderança.", "Senior leaders, managers, coordinators and high-value executive applications", "Lideranças seniores, gerentes, coordenadores e candidaturas executivas de alto valor"],
  ["marketing", "Marketing", "Marketing", "Creative", "Criativo", "pro", ["pro", "creative", "corporate"], "A results-first layout for campaigns, brand and growth profiles.", "Um layout orientado a resultados para campanhas, marca e crescimento.", "For marketing and growth roles", "Para marketing e growth"],
  ["sales", "Sales", "Vendas", "Sales / Commercial / Customer Relations", "Vendas / Comercial / Relacionamento com Cliente", "pro", ["pro", "corporate"], "A modern Pro resume for sales, revenue, account, customer success and commercial relationship roles, with metrics-first hierarchy.", "Um curriculo Pro moderno para vendas, receita, contas, sucesso do cliente e relacionamento comercial, com hierarquia orientada a metricas.", "Best for sales, SDR, BDR, account executive, customer success and client-facing growth roles", "Ideal para vendas, SDR, BDR, account executive, customer success e relacionamento com clientes"],
  ["developer", "Developer", "Desenvolvedor", "Technology", "Tecnologia", "premium", ["premium", "technology", "ats"], "A premium technical resume with stack sidebar, project-first structure and visible engineering links.", "Um currículo técnico premium, com sidebar de stack, projetos em destaque e links de engenharia visíveis.", "For tech and product", "Para tecnologia e produto"],
  ["designer", "Designer", "Designer", "Creative", "Criativo", "premium", ["premium", "creative", "technology"], "A refined visual layout for design, UX and portfolio-driven careers.", "Um layout visual refinado para design, UX e carreiras orientadas a portfólio.", "Creative modern layout", "Visual criativo e moderno"],
  ["healthcare", "Healthcare", "Saude", "Corporate", "Corporativo", "pro", ["pro", "corporate", "ats"], "A trustworthy clinical resume for healthcare and care operations.", "Um curriculo confiavel para saude, clinica e operacoes de cuidado.", "For healthcare professionals", "Para profissionais de saude"],
  ["legal", "Legal", "Juridico", "Corporate", "Corporativo", "pro", ["pro", "corporate", "executive"], "A formal layout for legal, compliance and advisory careers.", "Um layout formal para juridico, compliance e consultoria.", "For legal and compliance roles", "Para juridico e compliance"],
  ["finance", "Finance", "Financas", "Corporate", "Corporativo", "pro", ["pro", "corporate", "executive"], "A precise, numbers-led template for finance and accounting.", "Um modelo preciso e orientado a numeros para financas e contabilidade.", "For finance and accounting", "Para financas e contabilidade"],
  ["academic", "Academic", "Academico", "International", "Internacional", "pro", ["pro", "international", "corporate"], "A structured academic format for education, research and teaching.", "Um formato academico para educacao, pesquisa e docencia.", "For education and research", "Para educacao e pesquisa"],
  ["remote-work", "Remote Work", "Trabalho remoto", "International", "Internacional", "premium", ["premium", "international", "technology"], "A premium global resume for remote, async and distributed teams.", "Um currículo global premium para vagas remotas, assíncronas e times distribuídos.", "International remote applications", "Candidaturas remotas internacionais"],
  ["operations", "Operations", "Operacoes", "Corporate", "Corporativo", "pro", ["pro", "corporate", "ats"], "A process-focused resume for logistics, operations and delivery.", "Um curriculo focado em processos para logistica, operacoes e entrega.", "Best for operations roles", "Ideal para operacoes"],
  ["customer-service", "Customer Service", "Atendimento", "Corporate", "Corporativo", "free", ["free", "corporate", "first-job"], "A clear service resume for support, success and client care.", "Um curriculo claro para suporte, sucesso do cliente e atendimento.", "Best for customer service", "Ideal para atendimento ao cliente"],
  ["graduate", "Graduate", "Recem-formado", "First job", "Primeiro emprego", "free", ["free", "first-job", "ats"], "A confident early-career layout for new graduates.", "Um layout confiante para recem-formados e inicio de carreira.", "Good for first jobs", "Bom para primeiro emprego"],
  ["manager", "Manager", "Gerente", "Executive", "Executivo", "premium", ["premium", "executive", "corporate"], "A premium leadership resume for managers, coordinators and team leads.", "Um currículo premium de liderança para gerentes, coordenadores e líderes.", "For managers and team leads", "Para gerentes e lideranças"],
  ["consultant", "Consultant", "Consultor", "Corporate", "Corporativo", "premium", ["premium", "corporate", "executive"], "A strategic premium consulting resume with specialty cards and project-led hierarchy.", "Um currículo premium de consultoria, com cards de especialidade e hierarquia orientada a projetos.", "For consultants and advisors", "Para consultores e assessores"],
  ["startup", "Startup", "Startup", "Technology", "Tecnologia", "premium", ["premium", "technology", "creative"], "A high-energy premium layout for builders, operators and startup teams.", "Um layout premium dinâmico para builders, operações e times de startup.", "For startup and product roles", "Para startups e produto"],
  ["global", "Global", "Global", "International", "Internacional", "premium", ["premium", "international", "executive"], "A refined premium international profile for global careers and cross-border roles.", "Um perfil internacional premium refinado para carreiras globais e vagas fora do país.", "Global premium applications", "Candidaturas globais premium"],
].map(([key, name, ptName, category, ptCategory, access, filterGroups, enDescription, ptDescription, enBestFor, ptBestFor]) => ({
  key,
  name,
  icon: filterGroups.includes("technology") ? "settings" : filterGroups.includes("creative") ? "sparkles" : filterGroups.includes("international") ? "globe" : filterGroups.includes("executive") ? "layout" : "file",
  category,
  access,
  filterGroups,
  names: { en: name, pt: ptName },
  categories: { en: category, pt: ptCategory },
  descriptions: { en: enDescription, pt: ptDescription },
  bestFor: { en: enBestFor, pt: ptBestFor },
}));

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
let sidebarCollapsed = true;
let sidebarManuallySet = false;
let sidebarAutoCollapsedForBuilder = false;
let sidebarStateBeforeBuilder = false;
let paymentHistoryPage = 1;
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
let autoSaveCommitTimer = null;
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
  sidebarCollapsed = true;
  sidebarAutoCollapsedForBuilder = false;
}

function prepareCollapsedDashboardEntry() {
  sidebarCollapsed = true;
  sidebarManuallySet = false;
  sidebarAutoCollapsedForBuilder = false;
  sidebarStateBeforeBuilder = false;
}

function syncSidebarCollapsedState() {
  const shell = document.querySelector(".app-shell");
  if (shell) shell.classList.toggle("sidebar-collapsed", sidebarCollapsed);
  document.querySelector(".sidebar")?.classList.remove("open");
  document.querySelectorAll("[data-sidebar-collapse]").forEach((control) => {
    control.setAttribute("aria-label", sidebarCollapsed ? t().dashboard.expandSidebar : t().dashboard.collapseSidebar);
    control.setAttribute("title", sidebarCollapsed ? t().dashboard.expandSidebar : t().dashboard.collapseSidebar);
    control.setAttribute("aria-expanded", String(!sidebarCollapsed));
  });
}

function setSidebarCollapsed(nextCollapsed, options = {}) {
  sidebarCollapsed = Boolean(nextCollapsed);
  if (options.manual) {
    sidebarManuallySet = true;
    sidebarAutoCollapsedForBuilder = false;
  }
  syncSidebarCollapsedState();
}

function routeToDashboardEntry(route = "/dashboard") {
  prepareCollapsedDashboardEntry();
  setRoute(route);
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
  /*
  const templateProfile = {
    creative: { layout: "portfolio-left", tone: "creative", accent: "visual" },
    marketing: { layout: "portfolio-left", tone: "marketing", accent: "campaigns" },
    designer: { layout: "portfolio-left", tone: "designer", accent: "portfolio" },
    tech: { layout: "tech-left", tone: "tech", accent: "stack" },
    developer: { layout: "tech-left", tone: "developer", accent: "code" },
    startup: { layout: "tech-left", tone: "startup", accent: "impact" },
    international: { layout: "global-right", tone: "international", accent: "global" },
    "remote-work": { layout: "global-right", tone: "remote", accent: "remote" },
    global: { layout: "global-right", tone: "global", accent: "global" },
    elegant: { layout: "elegant-right", tone: "elegant", accent: "refined" },
    finance: { layout: "precision-right", tone: "finance", accent: "metrics" },
    corporate: { layout: "corporate-rail", tone: "corporate", accent: "business" },
    professional: { layout: "professional-split", tone: "professional", accent: "versatile" },
    sales: { layout: "corporate-rail", tone: "sales", accent: "performance" },
    operations: { layout: "corporate-rail", tone: "operations", accent: "process" },
    healthcare: { layout: "care-rail", tone: "healthcare", accent: "trust" },
    "senior-executive": { layout: "executive-premium", tone: "senior", accent: "leadership" },
    manager: { layout: "executive-premium", tone: "manager", accent: "teams" },
    consultant: { layout: "consultant-premium", tone: "consultant", accent: "strategy" },
    classic: { layout: "formal-flow", tone: "classic", accent: "formal" },
    legal: { layout: "formal-flow", tone: "legal", accent: "law" },
    academic: { layout: "academic-flow", tone: "academic", accent: "research" },
    "clean-pro": { layout: "clean-flow", tone: "clean", accent: "clarity" },
    "modern-ats": { layout: "ats-pro-flow", tone: "modern-ats", accent: "ats" },
    "customer-service": { layout: "service-grid", tone: "service", accent: "support" },
    graduate: { layout: "graduate-grid", tone: "graduate", accent: "growth" },
  }[template] || { layout: "professional-split", tone: "professional", accent: "versatile" };
  const curatedLabels = currentLanguage === "pt"
    ? {
      summary: ["senior-executive", "manager", "consultant"].includes(template) ? "Resumo executivo" : "Perfil profissional",
      experience: "Experiência profissional",
      education: "Formação",
      skills: ["tech", "developer", "startup"].includes(template) ? "Stack e habilidades" : "Competências",
      languages: "Idiomas",
      certifications: "Certificações",
      projects: ["creative", "designer", "marketing", "developer", "startup", "consultant", "academic"].includes(template) ? "Projetos em destaque" : "Projetos",
      links: ["tech", "developer", "designer", "startup"].includes(template) ? "Links profissionais" : "Links",
    }
    : {
      summary: ["senior-executive", "manager", "consultant"].includes(template) ? "Executive Summary" : "Professional Profile",
      experience: "Professional Experience",
      education: "Education",
      skills: ["tech", "developer", "startup"].includes(template) ? "Stack and Skills" : "Core Skills",
      languages: "Languages",
      certifications: "Certifications",
      projects: ["creative", "designer", "marketing", "developer", "startup", "consultant", "academic"].includes(template) ? "Featured Projects" : "Projects",
      links: ["tech", "developer", "designer", "startup"].includes(template) ? "Professional Links" : "Links",
    };
  const curatedHasText = (item) => String(item || "").trim().length > 0;
  const curatedHasList = (items) => normalizeTextList(items).length > 0;
  const curatedOptional = (className, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3>${title}</h3>${body}</section>`;
  const curatedParagraphs = (items, fieldName) => `<div class="curated-text-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`;
  const curatedLines = (items) => normalizeTextList(items).map(escapeHtml).join("<br>");
  const curatedContactItems = [displayLocation, personal.email, personal.phone, normalizeTextList(data.professionalLinks)[0]].filter(Boolean);
  const curatedContact = curatedContactItems.join(" | ") || b.document.header;
  const curatedExperiences = (data.workExperience || []).filter((item) => curatedHasText(item.role) || curatedHasText(item.company) || curatedHasText(item.location) || curatedHasText(item.period) || curatedHasList(item.achievements));
  const curatedPrimaryExperience = curatedExperiences[0] || experience;
  const curatedExperienceEntries = (curatedExperiences.length ? curatedExperiences : [curatedPrimaryExperience]).map((item, index) => `
    <div class="curated-experience-item">
      <div class="curated-entry-head">
        <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
        <span ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</span>
      </div>
      <p class="curated-entry-meta">
        <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${curatedHasText(item.company) && curatedHasText(item.location) ? " - " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
      </p>
      <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
    </div>
  `).join("");
  const curatedEducationItems = (data.education || []).filter((item) => curatedHasText(item.degree) || curatedHasText(item.school) || curatedHasText(item.period));
  const curatedEducationEntries = (curatedEducationItems.length ? curatedEducationItems : [education]).map((item, index) => `
    <p class="curated-compact-item">
      <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
      <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
      ${curatedHasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
    </p>
  `).join("");
  return `
    <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
      <div class="resume-page-scale-wrapper">
        <div class="resume-document professional-preview resume-template-${template} curated-resume curated-layout-${templateProfile.layout} curated-tone-${templateProfile.tone} curated-accent-${templateProfile.accent} ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
          <header class="curated-header">
            <div class="curated-header-mark" aria-hidden="true"></div>
            <div>
              <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
              <strong data-preview-field="title" data-preview-empty="${b.values.professionalTitle}">${display(personal.title, b.values.professionalTitle)}</strong>
            </div>
            <p class="resume-contact-line curated-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(curatedContact, b.document.header)}</p>
          </header>
          ${curatedOptional("curated-summary curated-main-section", curatedLabels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
          ${curatedOptional("curated-experience curated-main-section", curatedLabels.experience, curatedExperienceEntries, curatedExperiences.length > 0)}
          ${curatedOptional("curated-projects curated-main-section", curatedLabels.projects, curatedParagraphs(data.projects, "projects"), curatedHasList(data.projects))}
          ${curatedOptional("curated-skills curated-side-section", curatedLabels.skills, `<div class="resume-skill-list curated-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, curatedHasList(data.skills))}
          ${curatedOptional("curated-education curated-side-section", curatedLabels.education, curatedEducationEntries, curatedEducationItems.length > 0)}
          ${curatedOptional("curated-certifications curated-side-section", curatedLabels.certifications, `<p data-preview-field="certifications" data-preview-empty="">${curatedLines(data.certifications)}</p>`, curatedHasList(data.certifications))}
          ${curatedOptional("curated-languages curated-side-section", curatedLabels.languages, `<p data-preview-field="languages" data-preview-empty="">${curatedLines(data.languages)}</p>`, curatedHasList(data.languages))}
          ${curatedOptional("curated-links curated-side-section", curatedLabels.links, `<div class="resume-link-list curated-link-list" data-preview-field="links" data-preview-empty="">${paragraphList(data.professionalLinks, "")}</div>`, curatedHasList(data.professionalLinks))}
        </div>
      </div>
    </div>
  `;
  return `
    <div class="document-format-switch" data-format-scope="${scope}">
      <strong>${label}</strong>
      <div>
        <button class="${active === "a4" ? "active" : ""}" type="button" data-document-format="a4">${b.a4}</button>
        <button class="${active === "letter" ? "active" : ""}" type="button" data-document-format="letter">${b.usLetter}</button>
      </div>
    </div>
  `;
  */
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

function exitToNewResumeFlow() {
  cancelPendingResumeAutosave();
  currentBuilderResumeId = null;
  builderDraft = null;
  pendingTemplateChangeDraft = null;
  builderSaveState = "saved";
  activeBuilderSectionIndex = 0;
  setRoute("/dashboard/builder");
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
    adminToolLabel: "Admin",
    adminFillTest: "Preencher teste",
    adminReplaceTitle: "Substituir dados do curr\u00edculo?",
    adminReplaceText: "Este curr\u00edculo j\u00e1 possui informa\u00e7\u00f5es preenchidas. Deseja substituir pelos dados de teste?",
    adminReplace: "Substituir",
    adminFilledMessage: "Dados de teste preenchidos. Revise e salve se quiser manter.",
    createFirst: "Criar meu primeiro currículo",
    chooseTemplate: "Escolher modelo",
    emptyTitle: "Você ainda não criou nenhum currículo",
    emptyText: "Escolha um modelo profissional e comece a criar seu currículo em poucos minutos.",
    searchPlaceholder: "Buscar currículos...",
    statusFilter: "Filtrar por status",
    modelFilter: "Filtrar por modelo",
    sortLabel: "Ordenar por",
    allStatuses: "Todos os status",
    allModels: "Todos os modelos",
    sortRecent: "Mais recente",
    sortProgress: "Maior progresso",
    sortAts: "Melhor nota ATS",
    sortName: "Nome",
    statuses: { draft: "Rascunho", review: "Em revisão", ready: "Pronto para exportar", exported: "Exportado" },
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
    adminToolLabel: "Admin",
    adminFillTest: "Fill test data",
    adminReplaceTitle: "Replace resume data?",
    adminReplaceText: "This resume already has filled information. Do you want to replace it with test data?",
    adminReplace: "Replace",
    adminFilledMessage: "Test data filled. Review and save if you want to keep it.",
    createFirst: "Create my first resume",
    chooseTemplate: "Choose template",
    emptyTitle: "You haven\u2019t created any resumes yet",
    emptyText: "Choose a professional template and start building your resume in minutes.",
    searchPlaceholder: "Search resumes...",
    statusFilter: "Filter by status",
    modelFilter: "Filter by template",
    sortLabel: "Sort by",
    allStatuses: "All statuses",
    allModels: "All templates",
    sortRecent: "Most recent",
    sortProgress: "Highest progress",
    sortAts: "Best ATS score",
    sortName: "Name",
    statuses: { draft: "Draft", review: "In review", ready: "Ready to export", exported: "Exported" },
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

const ADMIN_TEST_RESUME_PROFILES = Object.freeze({
  productManager: "productManager",
});

function adminProductManagerTestResume(baseResume = ensureBuilderDraft()) {
  const now = isoNow();
  const base = normalizeResume(baseResume || {});
  const resume = normalizeResume({
    ...base,
    id: base.id || currentBuilderResumeId || newResumeId(),
    title: "Amanda Silva",
    selectedTemplate: base.selectedTemplate || selectedTemplateKey,
    documentFormat: normalizeDocumentFormat(base.documentFormat || selectedDocumentFormat),
    createdAt: base.createdAt || now,
    updatedAt: now,
    personal: {
      ...base.personal,
      firstName: "Amanda",
      lastName: "Silva",
      fullName: "Amanda Silva",
      title: "Product Manager",
      email: "amanda.silva@example.com",
      phone: "+55 11 90000-0000",
      address: "",
      city: "S\u00e3o Paulo",
      state: "SP",
      postalCode: "",
      location: "S\u00e3o Paulo, Brasil",
      links: "linkedin.com/in/amandasilva\namandasilva.com",
    },
    summary: "Product Manager com experi\u00eancia em estrat\u00e9gia de produto, pesquisa com usu\u00e1rios, prioriza\u00e7\u00e3o de roadmap e colabora\u00e7\u00e3o com times de design, engenharia e neg\u00f3cios. Perfil orientado a dados, comunica\u00e7\u00e3o clara e foco em entregar solu\u00e7\u00f5es digitais que melhoram a experi\u00eancia do usu\u00e1rio e geram impacto para o neg\u00f3cio.",
    workExperience: [
      {
        role: "Product Manager",
        company: "NovaTech Digital",
        location: "S\u00e3o Paulo, Brasil",
        period: "Mar 2021 \u2014 Atual",
        achievements: [
          "Liderou a defini\u00e7\u00e3o de roadmap de produto com base em pesquisas, m\u00e9tricas de uso e objetivos de neg\u00f3cio.",
          "Priorizou funcionalidades em colabora\u00e7\u00e3o com design, engenharia, marketing e atendimento ao cliente.",
          "Acompanhou indicadores de ado\u00e7\u00e3o, reten\u00e7\u00e3o e satisfa\u00e7\u00e3o para orientar melhorias cont\u00ednuas.",
          "Coordenou entregas em ciclos \u00e1geis, garantindo alinhamento entre stakeholders e equipe t\u00e9cnica.",
        ],
      },
      {
        role: "Analista de Produto",
        company: "BrightApps Solutions",
        location: "Campinas, Brasil",
        period: "Jun 2018 \u2014 Fev 2021",
        achievements: [
          "Analisou feedbacks de usu\u00e1rios e dados de comportamento para identificar oportunidades de melhoria.",
          "Criou documenta\u00e7\u00e3o de requisitos, hist\u00f3rias de usu\u00e1rio e crit\u00e9rios de aceite para novas funcionalidades.",
          "Apoiou testes de usabilidade e valida\u00e7\u00e3o de hip\u00f3teses com clientes reais.",
          "Colaborou com times de desenvolvimento para melhorar fluxos digitais e reduzir fric\u00e7\u00f5es no produto.",
        ],
      },
      {
        role: "Assistente de Projetos Digitais",
        company: "StartHub Brasil",
        location: "S\u00e3o Paulo, Brasil",
        period: "Jan 2016 \u2014 Mai 2018",
        achievements: [
          "Apoiou o acompanhamento de projetos digitais, cronogramas e entregas internas.",
          "Organizou reuni\u00f5es, atas, documentos de escopo e comunica\u00e7\u00e3o entre \u00e1reas.",
          "Auxiliou na an\u00e1lise de requisitos e acompanhamento de demandas de clientes.",
          "Contribuiu para melhoria de processos internos e organiza\u00e7\u00e3o das prioridades do time.",
        ],
      },
    ],
    education: [
      {
        degree: "Administra\u00e7\u00e3o de Empresas",
        school: "Universidade de S\u00e3o Paulo",
        location: "S\u00e3o Paulo, Brasil",
        period: "2012 \u2014 2016",
        description: "\u00canfase em estrat\u00e9gia, gest\u00e3o de neg\u00f3cios, marketing e an\u00e1lise organizacional.",
      },
      {
        degree: "MBA em Gest\u00e3o de Produtos Digitais",
        school: "FIAP",
        location: "S\u00e3o Paulo, Brasil",
        period: "2020 \u2014 2021",
        description: "Forma\u00e7\u00e3o voltada para estrat\u00e9gia de produto, m\u00e9tricas, experi\u00eancia do usu\u00e1rio e inova\u00e7\u00e3o digital.",
      },
    ],
    skills: [
      "Gest\u00e3o de Produto",
      "Roadmap",
      "Pesquisa com Usu\u00e1rios",
      "An\u00e1lise de M\u00e9tricas",
      "Prioriza\u00e7\u00e3o",
      "Metodologias \u00c1geis",
      "Scrum",
      "Kanban",
      "UX Research",
      "Product Discovery",
      "Product Delivery",
      "Comunica\u00e7\u00e3o Estrat\u00e9gica",
      "Lideran\u00e7a",
      "Resolu\u00e7\u00e3o de Problemas",
      "Figma",
      "Jira",
      "Notion",
      "Google Analytics",
      "SQL b\u00e1sico",
      "Power BI",
    ],
    languages: ["Portugu\u00eas \u2014 Nativo", "Ingl\u00eas \u2014 Avan\u00e7ado", "Espanhol \u2014 Intermedi\u00e1rio"],
    certifications: [
      "Product Management Professional \u2014 Product School \u2014 2023",
      "Scrum Foundation Professional Certificate \u2014 CertiProf \u2014 2022",
      "UX Research Basics \u2014 Google \u2014 2021",
      "Data Analytics for Business \u2014 Coursera \u2014 2020",
    ],
    projects: [
      "Redesign do Onboarding de Usu\u00e1rios - Liderou estudo de comportamento e redesenho do fluxo inicial do produto para reduzir fric\u00e7\u00f5es e melhorar a ativa\u00e7\u00e3o de novos usu\u00e1rios. 2023 - amandasilva.com/onboarding",
      "Dashboard de M\u00e9tricas de Produto - Criou estrutura de indicadores para acompanhar ado\u00e7\u00e3o, reten\u00e7\u00e3o, convers\u00e3o e satisfa\u00e7\u00e3o dos usu\u00e1rios em tempo real. 2022 - amandasilva.com/dashboard",
      "Pesquisa de Necessidades do Cliente - Conduziu entrevistas, an\u00e1lise de feedbacks e prioriza\u00e7\u00e3o de oportunidades para orientar decis\u00f5es de produto. 2021 - amandasilva.com/research",
    ],
    professionalLinks: ["linkedin.com/in/amandasilva", "amandasilva.com"],
  });
  resume.completion = calculateCompletion(resume);
  return resume;
}

function adminTestResume(profile = ADMIN_TEST_RESUME_PROFILES.productManager, baseResume = ensureBuilderDraft()) {
  if (profile === ADMIN_TEST_RESUME_PROFILES.productManager) return adminProductManagerTestResume(baseResume);
  return adminProductManagerTestResume(baseResume);
}

function resumeHasFilledContent(resume = ensureBuilderDraft()) {
  const normalized = normalizeResume(resume);
  const personal = normalized.personal || {};
  const hasPersonal = [
    personal.firstName,
    personal.lastName,
    personal.fullName,
    personal.title,
    personal.email,
    personal.phone,
    personal.address,
    personal.city,
    personal.state,
    personal.postalCode,
    personal.location,
    personal.links,
  ].some((item) => String(item || "").trim());
  const hasExperience = (normalized.workExperience || []).some((item) => [
    item.role,
    item.company,
    item.location,
    item.period,
    ...(item.achievements || []),
  ].some((value) => String(value || "").trim()));
  const hasEducation = (normalized.education || []).some((item) => [
    item.school,
    item.degree,
    item.location,
    item.period,
    item.description,
  ].some((value) => String(value || "").trim()));
  return Boolean(
    hasPersonal
    || String(normalized.summary || "").trim()
    || hasExperience
    || hasEducation
    || normalized.skills.length
    || normalized.languages.length
    || normalized.certifications.length
    || normalized.projects.length
    || normalized.professionalLinks.length
  );
}

function loadResumes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(userScopedStorageKey(RESUMES_STORAGE_KEY)) || "[]");
    if (!Array.isArray(parsed)) return [];
    const normalized = parsed.map(normalizeResume);
    const deduped = dedupeResumes(normalized);
    if (deduped.length !== normalized.length) {
      localStorage.setItem(userScopedStorageKey(RESUMES_STORAGE_KEY), JSON.stringify(deduped));
    }
    return deduped;
  } catch (error) {
    return [];
  }
}

function dedupeResumes(resumes = []) {
  const byId = new Map();
  resumes.forEach((resume) => {
    const normalized = normalizeResume(resume);
    const existing = byId.get(normalized.id);
    if (!existing || new Date(normalized.updatedAt || 0) >= new Date(existing.updatedAt || 0)) {
      byId.set(normalized.id, normalized);
    }
  });
  const uniqueResumes = Array.from(byId.values());
  const hasFilledResume = uniqueResumes.some((resume) => resumeHasFilledContent(resume));
  const resumesToKeep = hasFilledResume ? uniqueResumes.filter((resume) => resumeHasFilledContent(resume)) : uniqueResumes;
  const bySignature = new Map();
  resumesToKeep
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    .forEach((resume) => {
      const signature = [
        String(resume.title || "").trim().toLowerCase(),
        resume.selectedTemplate,
        resume.documentFormat,
        String(resume.personal?.fullName || "").trim().toLowerCase(),
        String(resume.personal?.email || "").trim().toLowerCase(),
        String(resume.summary || "").trim().toLowerCase(),
        JSON.stringify(resume.workExperience || []),
        JSON.stringify(resume.education || []),
        JSON.stringify(resume.skills || []),
        JSON.stringify(resume.languages || []),
        JSON.stringify(resume.certifications || []),
        JSON.stringify(resume.projects || []),
        JSON.stringify(resume.professionalLinks || []),
      ].join("|");
      if (!bySignature.has(signature)) bySignature.set(signature, resume);
    });
  return Array.from(bySignature.values());
}

function storeResumes(resumes) {
  try {
    localStorage.setItem(userScopedStorageKey(RESUMES_STORAGE_KEY), JSON.stringify(dedupeResumes(resumes)));
  } catch (error) {
    // The UI still works for the current session if storage is blocked.
  }
}

function findResume(id) {
  return loadResumes().find((resume) => resume.id === id) || null;
}

function upsertResume(resume) {
  const normalized = normalizeResume(resume);
  const resumes = dedupeResumes(loadResumes());
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
  if (!canUseFeature("cover_letters_unlimited") && loadCoverLetters().length >= 1) {
    openFeatureLockModal("cover_letters_unlimited");
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

function resumeStatusKey(resume = {}) {
  if (resume.exportedAt) return "exported";
  const completion = Number(resume.completion || 0);
  if (completion >= 90) return "ready";
  if (completion >= 45) return "review";
  return "draft";
}

function resumeStatusLabel(resume = {}) {
  return resumeLabels().statuses[resumeStatusKey(resume)] || resumeLabels().statuses.draft;
}

function resumeSearchText(resume = {}) {
  const template = getTemplateByKey(resume.selectedTemplate);
  return [
    resume.title,
    resume.personal?.title,
    resume.personal?.fullName,
    template.name,
    template.category,
    resumeStatusLabel(resume),
  ].filter(Boolean).join(" ").toLowerCase();
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

function collectBuilderExperiences(draft = ensureBuilderDraft()) {
  const rows = Array.from(document.querySelectorAll("[data-resume-experience-item]"));
  if (!rows.length) {
    const firstExperience = draft.workExperience?.[0] || {};
    const extraExperience = Array.isArray(draft.workExperience) ? draft.workExperience.slice(1) : [];
    return [{
      ...firstExperience,
      company: fieldValue("experienceCompany", firstExperience.company || ""),
      role: fieldValue("experienceRole", firstExperience.role || ""),
      period: fieldValue("experiencePeriod", firstExperience.period || ""),
      location: fieldValue("experienceLocation", firstExperience.location || ""),
      achievements: linesFromValue(fieldValue("experience", (firstExperience.achievements || []).join("\n"))),
    }, ...extraExperience];
  }
  const experiences = rows.map((row, index) => {
    const current = draft.workExperience?.[index] || {};
    const value = (fieldName, fallback = "") => {
      const field = row.querySelector(`[data-resume-experience-field="${fieldName}"]`);
      return field ? field.value.trim() : fallback || "";
    };
    return {
      ...current,
      company: value("company", current.company || ""),
      role: value("role", current.role || ""),
      period: value("period", current.period || ""),
      location: value("location", current.location || ""),
      achievements: linesFromValue(value("achievements", (current.achievements || []).join("\n"))),
    };
  });
  return experiences.length ? experiences : [{ company: "", role: "", period: "", location: "", achievements: [] }];
}

function collectBuilderEducation(draft = ensureBuilderDraft()) {
  const rows = Array.from(document.querySelectorAll("[data-resume-education-item]"));
  if (!rows.length) {
    const firstEducation = draft.education?.[0] || {};
    const extraEducation = Array.isArray(draft.education) ? draft.education.slice(1) : [];
    return [{
      ...firstEducation,
      school: fieldValue("educationSchool", firstEducation.school || ""),
      degree: fieldValue("educationDegree", firstEducation.degree || ""),
    }, ...extraEducation];
  }
  const educationItems = rows.map((row, index) => {
    const current = draft.education?.[index] || {};
    const value = (fieldName, fallback = "") => {
      const field = row.querySelector(`[data-resume-education-field="${fieldName}"]`);
      return field ? field.value.trim() : fallback || "";
    };
    return {
      ...current,
      school: value("school", current.school || ""),
      degree: value("degree", current.degree || ""),
      location: value("location", current.location || ""),
      period: value("period", current.period || ""),
      description: value("description", current.description || ""),
    };
  });
  return educationItems.length ? educationItems : [{ school: "", degree: "", location: "", period: "", description: "" }];
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
    workExperience: collectBuilderExperiences(draft),
    education: collectBuilderEducation(draft),
    skills: normalizeTextList(fieldValue("skills", (draft.skills || []).join(", "))),
    languages: normalizeTextList(fieldValue("languages", (draft.languages || []).join("\n"))),
    certifications: normalizeTextList(fieldValue("certifications", (draft.certifications || []).join("\n"))),
    projects: linesFromValue(fieldValue("projects", (draft.projects || []).join("\n"))),
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

function showResumeSaveButtonFeedback(button) {
  if (!button) return;
  const labels = t().builder;
  button.dataset.defaultHtml ||= button.innerHTML;
  button.classList.remove("is-saving");
  button.classList.add("is-saved");
  button.disabled = false;
  button.innerHTML = `${icon("check")} ${labels.saved}`;
  window.setTimeout(() => {
    if (!button.isConnected) return;
    button.classList.remove("is-saved");
    button.innerHTML = button.dataset.defaultHtml || `${icon("check")} ${labels.save}`;
  }, 2600);
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

function isBuilderRouteActive() {
  return getRoute() === "/dashboard/builder" && Boolean(document.querySelector(".builder-page"));
}

function scheduleAutoSave() {
  setSaveState("unsaved");
  if (autoSaveTimer) window.clearTimeout(autoSaveTimer);
  if (autoSaveCommitTimer) window.clearTimeout(autoSaveCommitTimer);
  autoSaveTimer = window.setTimeout(() => {
    autoSaveTimer = null;
    if (!isBuilderRouteActive()) return;
    setSaveState("saving");
    autoSaveCommitTimer = window.setTimeout(() => {
      autoSaveCommitTimer = null;
      if (!isBuilderRouteActive()) return;
      saveCurrentResume(false);
    }, 350);
  }, 900);
}

function cancelPendingResumeAutosave() {
  if (autoSaveTimer) {
    window.clearTimeout(autoSaveTimer);
    autoSaveTimer = null;
  }
  if (autoSaveCommitTimer) {
    window.clearTimeout(autoSaveCommitTimer);
    autoSaveCommitTimer = null;
  }
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

function resetResumeShellPageVars(shell, format = selectedDocumentFormat) {
  if (!shell) return documentPageSpec(format);
  const normalizedFormat = normalizeDocumentFormat(format);
  const spec = documentPageSpec(normalizedFormat);
  applyDocumentFormatClass(shell, normalizedFormat);
  applyPdfPageVariables(shell, normalizedFormat);
  shell.dataset.previewScaled = "true";
  shell.style.setProperty("--resume-page-width", `${spec.widthPx}px`);
  shell.style.setProperty("--resume-page-height", `${spec.heightPx}px`);
  shell.style.setProperty("--preview-scale", "1");
  shell.style.setProperty("--scaled-page-width", `${spec.widthPx}px`);
  shell.style.setProperty("--scaled-page-height", `${spec.heightPx}px`);
  const documentNode = shell.querySelector(".resume-document");
  if (documentNode) {
    applyDocumentFormatClass(documentNode, normalizedFormat);
    applyPdfPageVariables(documentNode, normalizedFormat);
    documentNode.style.removeProperty("--resume-page-width");
    documentNode.style.removeProperty("--resume-page-height");
  }
  return spec;
}

function applyResumeShellPreviewScale(shell, options = {}) {
  if (!shell) return;
  const format = normalizeDocumentFormat(options.format || shell.getAttribute("data-document-format-current") || selectedDocumentFormat);
  const spec = resetResumeShellPageVars(shell, format);
  const documentNode = shell.querySelector(".resume-document");
  if (!documentNode) return;
  const contentWidth = Math.max(spec.widthPx, documentNode.scrollWidth || spec.widthPx);
  const contentHeight = Math.max(spec.heightPx, documentNode.scrollHeight || spec.heightPx);
  const maxScale = Number.isFinite(options.maxScale) ? options.maxScale : 1;
  const availableWidth = Math.max(1, options.availableWidth || spec.widthPx);
  const availableHeight = Math.max(1, options.availableHeight || spec.heightPx);
  const scale = Math.max(0.035, Math.min(maxScale, availableWidth / contentWidth, availableHeight / contentHeight));
  shell.style.setProperty("--resume-page-width", `${contentWidth}px`);
  shell.style.setProperty("--resume-page-height", `${contentHeight}px`);
  shell.style.setProperty("--preview-scale", scale.toFixed(4));
  shell.style.setProperty("--scaled-page-width", `${(contentWidth * scale).toFixed(2)}px`);
  shell.style.setProperty("--scaled-page-height", `${(contentHeight * scale).toFixed(2)}px`);
}

function updateResumePreviewScales(root = document) {
  root.querySelectorAll(".resume-document-shell").forEach((shell) => {
    const format = shell.getAttribute("data-document-format-current") || selectedDocumentFormat;
    const pageHeight = pageHeightForFormat(format);
    const container = shell.closest(".resume-thumbnail, .builder-preview-frame, .template-preview-content") || shell.parentElement;
    if (!container) return;
    const styles = window.getComputedStyle(container);
    const horizontalPadding = parseFloat(styles.paddingLeft || "0") + parseFloat(styles.paddingRight || "0");
    const verticalPadding = parseFloat(styles.paddingTop || "0") + parseFloat(styles.paddingBottom || "0");
    const isBuilderFrame = container.classList.contains("builder-preview-frame");
    const isThumbnail = container.classList.contains("resume-thumbnail");
    const isTemplatePreview = container.classList.contains("template-preview-content");
    const isResumeOnlyPreview = Boolean(container.closest(".template-preview-resume-only-dialog"));
    const scrollbarAllowance = 0;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width || container.clientWidth;
    const containerHeight = containerRect.height || container.clientHeight;
    const availableWidth = Math.max(1, containerWidth - horizontalPadding - scrollbarAllowance);
    const availableHeight = Math.max(1, containerHeight - verticalPadding);
    const frameZoomsToFit = !isBuilderFrame || container.classList.contains("zoom-fit");
    const maxScale = container.classList.contains("zoom-out") ? 0.72 : isTemplatePreview ? 0.98 : 1;
    const heightTarget = (isThumbnail || isTemplatePreview || isResumeOnlyPreview || frameZoomsToFit)
      ? availableHeight * (isResumeOnlyPreview ? 0.995 : isTemplatePreview ? 0.985 : 1)
      : pageHeight;
    applyResumeShellPreviewScale(shell, {
      format,
      availableWidth,
      availableHeight: heightTarget,
      maxScale,
    });
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

function fillAdminTestResume() {
  if (!isAdminAccount()) return;
  cancelPendingResumeAutosave();
  const filled = adminTestResume(ADMIN_TEST_RESUME_PROFILES.productManager, ensureBuilderDraft());
  builderDraft = filled;
  currentBuilderResumeId = filled.id;
  selectedTemplateKey = filled.selectedTemplate;
  selectedDocumentFormat = filled.documentFormat;
  activeBuilderSectionIndex = 0;
  routes["/dashboard/builder"]();
  setSaveState("unsaved", resumeLabels().adminFilledMessage);
}

function openAdminTestResumeConfirmModal() {
  if (!isAdminAccount()) return;
  const labels = resumeLabels();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal admin-test-resume-modal";
  modal.innerHTML = `
    <section class="template-preview-dialog admin-test-resume-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(labels.adminReplaceTitle)}">
      <div class="template-preview-header">
        <div>
          <span class="eyebrow">${escapeHtml(labels.adminToolLabel)}</span>
          <h2>${escapeHtml(labels.adminReplaceTitle)}</h2>
          <p>${escapeHtml(labels.adminReplaceText)}</p>
        </div>
        <button class="icon-button" type="button" data-admin-test-cancel aria-label="${escapeHtml(labels.cancel)}">${icon("close")}</button>
      </div>
      <div class="admin-dialog-actions admin-test-resume-actions">
        <button class="secondary-button" type="button" data-admin-test-cancel>${escapeHtml(labels.cancel)}</button>
        <button class="primary-button" type="button" data-admin-test-confirm>${escapeHtml(labels.adminReplace)}</button>
      </div>
    </section>
  `;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-admin-test-cancel]")) close();
  });
  modal.querySelector("[data-admin-test-confirm]")?.addEventListener("click", () => {
    close();
    fillAdminTestResume();
  });
}

function requestAdminTestResumeFill() {
  if (!isAdminAccount()) return;
  const currentResume = collectBuilderResume();
  if (resumeHasFilledContent(currentResume)) {
    openAdminTestResumeConfirmModal();
    return;
  }
  fillAdminTestResume();
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

function resumeTemplates(options = {}) {
  const localizedNames = {
    pt: {
      modern: "Moderno",
      minimal: "Minimal ATS",
      executive: "Executivo",
      creative: "Criativo",
      student: "Estudante",
      international: "Internacional",
      classic: "Clássico",
      corporate: "Corporativo",
      tech: "Tech",
      "simple-ats": "Simple ATS",
      elegant: "Elegante",
      "first-job": "Primeiro emprego",
    },
  };
  const localizedCategories = {
    pt: {
      Modern: "Moderno",
      Minimal: "Minimal ATS",
      ATS: "ATS",
      Executive: "Executivo",
      Creative: "Criativo",
      Student: "Primeiro emprego",
      International: "Internacional",
      Classic: "Corporativo",
      Corporate: "Corporativo",
      Tech: "Tecnologia",
      "Simple ATS": "ATS",
      Elegant: "Executivo",
      "First Job": "Primeiro emprego",
    },
  };
  const templates = allResumeTemplateDefinitions().map((template) => ({
    ...template,
    name: template.names?.[currentLanguage] || localizedNames[currentLanguage]?.[template.key] || template.name,
    category: template.categories?.[currentLanguage] || localizedCategories[currentLanguage]?.[template.category] || template.category,
    description: template.descriptions[currentLanguage],
    previewDescription: template.previewDescriptions?.[currentLanguage] || template.descriptions[currentLanguage],
    bestForText: template.bestFor[currentLanguage],
    idealForText: template.idealFor?.[currentLanguage] || [],
    filterGroups: Array.from(new Set([...(template.filterGroups || []), ...templateFilterGroups(template)])),
  }));
  return options.includeInactive ? templates : templates.filter(isTemplateActive);
}

function getTemplateByKey(key) {
  const templates = resumeTemplates({ includeInactive: true });
  return templates.find((template) => template.key === key) || resumeTemplates()[0] || templates[0];
}

function allResumeTemplateDefinitions() {
  return [...RESUME_TEMPLATES, ...ADDITIONAL_RESUME_TEMPLATES].map((template) => ({
    ...template,
    status: template.status || templateStatus(template.key),
  }));
}

function templateFilterGroups(template = {}) {
  const key = String(template.key || "").toLowerCase();
  const category = String(template.category || "").toLowerCase();
  const groups = new Set([template.access || "pro"]);
  if (key.includes("ats") || category.includes("ats") || key === "minimal") groups.add("ats");
  if (key.includes("executive") || ["manager", "consultant", "elegant"].includes(key) || category.includes("executive")) groups.add("executive");
  if (["creative", "designer", "marketing", "startup"].includes(key) || category.includes("creative")) groups.add("creative");
  if (["student", "first-job", "graduate", "customer-service"].includes(key)) groups.add("first-job");
  if (["tech", "developer", "startup", "remote-work", "modern-ats"].includes(key) || category.includes("tech") || category.includes("technology")) groups.add("technology");
  if (["international", "remote-work", "academic", "global"].includes(key) || category.includes("international")) groups.add("international");
  if (["corporate", "classic", "professional", "sales", "operations", "legal", "finance", "healthcare", "consultant"].includes(key) || category.includes("corporate")) groups.add("corporate");
  if (["healthcare"].includes(key) || category.includes("health")) groups.add("healthcare");
  if (["legal"].includes(key) || category.includes("legal")) groups.add("legal");
  if (["finance"].includes(key) || category.includes("finance")) groups.add("finance");
  if (["academic"].includes(key) || category.includes("academic")) groups.add("academic");
  return Array.from(groups);
}

function templateFilterOptions() {
  const options = currentLanguage === "pt"
    ? [["all", "Todos"], ["free", "Gratuitos"], ["pro", "Pro"], ["premium", "Premium"], ["ats", "ATS"], ["executive", "Executivo"], ["creative", "Criativo"], ["technology", "Tecnologia"], ["international", "Internacional"], ["first-job", "Primeiro emprego"], ["corporate", "Corporativo"], ["healthcare", "Saúde"], ["legal", "Jurídico"], ["finance", "Finanças"], ["academic", "Acadêmico"]]
    : [["all", "All"], ["free", "Free"], ["pro", "Pro"], ["premium", "Premium"], ["ats", "ATS"], ["executive", "Executive"], ["creative", "Creative"], ["technology", "Technology"], ["international", "International"], ["first-job", "First job"], ["corporate", "Corporate"], ["healthcare", "Healthcare"], ["legal", "Legal"], ["finance", "Finance"], ["academic", "Academic"]];
  const activeGroups = new Set();
  resumeTemplates().forEach((template) => {
    activeGroups.add(template.access || "pro");
    (template.filterGroups || []).forEach((group) => activeGroups.add(group));
  });
  return options.filter(([key]) => key === "all" || activeGroups.has(key));
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

function modernSampleResume() {
  if (currentLanguage === "pt") {
    return createBlankResume({
      selectedTemplate: "modern",
      personal: {
        fullName: "Patrick Justino",
        title: "Supervisor Administrativo",
        email: "patrick@email.com",
        phone: "+55 27 99999-9999",
        city: "Serra",
        state: "ES",
      },
      summary: "Supervisor administrativo com experiência em rotinas corporativas, acompanhamento de indicadores, organização de processos e apoio a equipes. Perfil orientado a produtividade, comunicação clara e melhoria contínua em ambientes dinâmicos.",
      workExperience: [
        {
          role: "Supervisor Administrativo",
          company: "Empresa Exemplo",
          location: "Serra, ES",
          period: "Jan 2023 - Atual",
          achievements: [
            "Coordenei rotinas administrativas e acompanhei indicadores internos.",
            "Organizei processos para melhorar produtividade e controle.",
            "Apoiei equipes na comunicação entre áreas e resolução de demandas.",
          ],
        },
        {
          role: "Assistente Administrativo",
          company: "Grupo Corporativo",
          location: "Vitoria, ES",
          period: "2019 - 2022",
          achievements: [
            "Padronizei controles de documentos e reduzi retrabalho operacional.",
            "Atendi clientes internos e externos com foco em prazos e qualidade.",
          ],
        },
      ],
      education: [{ degree: "Administração", school: "Universidade Exemplo", period: "2020 - 2024" }],
      skills: ["Liderança", "Organização", "Comunicação", "Gestão de processos", "Pacote Office", "Atendimento ao cliente"],
      languages: ["Português - Nativo", "Inglês - Intermediário"],
      certifications: ["Excel para Gestão Administrativa - 2024", "Fundamentos de Liderança - 2023"],
      projects: ["Projeto de melhoria de controles internos - Reorganização de planilhas e fluxos para acompanhamento de demandas administrativas."],
      professionalLinks: ["LinkedIn"],
    });
  }
  return createBlankResume({
    selectedTemplate: "modern",
    personal: {
      fullName: "Patrick Justino",
      title: "Administrative Supervisor",
      email: "patrick@email.com",
      phone: "+55 27 99999-9999",
      city: "Serra",
      state: "ES",
    },
    summary: "Administrative supervisor experienced in corporate routines, KPI tracking, process organization and team support. Practical profile focused on productivity, clear communication and continuous improvement in fast-moving environments.",
    workExperience: [
      {
        role: "Administrative Supervisor",
        company: "Example Company",
        location: "Serra, ES",
        period: "Jan 2023 - Present",
        achievements: [
          "Coordinated administrative routines and tracked internal indicators.",
          "Organized processes to improve productivity and operational control.",
          "Supported teams with cross-functional communication and issue resolution.",
        ],
      },
      {
        role: "Administrative Assistant",
        company: "Corporate Group",
        location: "Vitoria, ES",
        period: "2019 - 2022",
        achievements: [
          "Standardized document controls and reduced operational rework.",
          "Supported internal and external customers with focus on deadlines and quality.",
        ],
      },
    ],
    education: [{ degree: "Business Administration", school: "Example University", period: "2020 - 2024" }],
    skills: ["Leadership", "Organization", "Communication", "Process management", "Microsoft Office", "Customer service"],
    languages: ["Portuguese - Native", "English - Intermediate"],
    certifications: ["Excel for Administrative Management - 2024", "Leadership Fundamentals - 2023"],
    projects: ["Internal controls improvement project - Reorganized spreadsheets and workflows for administrative demand tracking."],
    professionalLinks: ["LinkedIn"],
  });
}

function executiveSampleResume() {
  if (currentLanguage === "pt") {
    return createBlankResume({
      selectedTemplate: "executive",
      personal: {
        fullName: "Patrick Justino",
        title: "Supervisor Administrativo",
        email: "patrick@email.com",
        phone: "+55 27 99999-9999",
        city: "Serra",
        state: "ES",
      },
      summary: "Profissional com experiência em liderança de equipes, organização de processos, acompanhamento de indicadores e melhoria de rotinas operacionais. Perfil orientado a resultados, comunicação clara e tomada de decisão prática em ambientes corporativos.",
      workExperience: [
        {
          role: "Supervisor Administrativo",
          company: "Empresa Exemplo",
          location: "Serra, ES",
          period: "Jan 2022 - Atual",
          achievements: [
            "Coordenei rotinas administrativas e acompanhei indicadores de produtividade.",
            "Liderei equipe em processos internos, distribuição de demandas e controle operacional.",
            "Implementei melhorias para reduzir retrabalho e aumentar a organização das atividades.",
            "Apoiei a comunicação entre setores e tomada de decisões operacionais.",
          ],
        },
        {
          role: "Assistente Administrativo Senior",
          company: "Grupo Corporativo",
          location: "Vitoria, ES",
          period: "2018 - 2021",
          achievements: [
            "Padronizei controles internos e fortaleci a rotina de acompanhamento de prazos.",
            "Apoiei lideranças na organização de equipes, documentos e fluxos administrativos.",
          ],
        },
      ],
      education: [{ degree: "Administração de Empresas", school: "Universidade Exemplo", period: "2016 - 2020" }],
      skills: ["Liderança de equipes", "Gestão de processos", "Indicadores de desempenho", "Comunicação corporativa", "Organização operacional", "Tomada de decisão"],
      languages: ["Português - Nativo", "Inglês - Intermediário"],
      certifications: ["Gestão de Pessoas - Instituição Exemplo, 2024", "Excel para Gestão Administrativa - 2023"],
      projects: ["Revisão de processos internos - Padronização de rotinas administrativas para reduzir retrabalho e melhorar o acompanhamento de demandas."],
      professionalLinks: ["LinkedIn", "linkedin.com/in/patrickjustino"],
    });
  }
  return createBlankResume({
    selectedTemplate: "executive",
    personal: {
      fullName: "Patrick Justino",
      title: "Administrative Supervisor",
      email: "patrick@email.com",
      phone: "+55 27 99999-9999",
      city: "Serra",
      state: "ES",
    },
    summary: "Professional experienced in team leadership, process organization, indicator tracking and operational routine improvement. Results-oriented profile with clear communication and practical decision making in corporate environments.",
    workExperience: [
      {
        role: "Administrative Supervisor",
        company: "Example Company",
        location: "Serra, ES",
        period: "Jan 2022 - Present",
        achievements: [
          "Coordinated administrative routines and tracked productivity indicators.",
          "Led internal processes, demand distribution and operational control.",
          "Implemented improvements to reduce rework and increase activity organization.",
          "Supported cross-department communication and operational decision making.",
        ],
      },
      {
        role: "Senior Administrative Assistant",
        company: "Corporate Group",
        location: "Vitoria, ES",
        period: "2018 - 2021",
        achievements: [
          "Standardized internal controls and strengthened deadline follow-up routines.",
          "Supported leadership with team organization, documents and administrative workflows.",
        ],
      },
    ],
    education: [{ degree: "Business Administration", school: "Example University", period: "2016 - 2020" }],
    skills: ["Team leadership", "Process management", "Performance indicators", "Corporate communication", "Operational organization", "Decision making"],
    languages: ["Portuguese - Native", "English - Intermediate"],
    certifications: ["People Management - Example Institution, 2024", "Excel for Administrative Management - 2023"],
    projects: ["Internal process review - Standardized administrative routines to reduce rework and improve demand tracking."],
    professionalLinks: ["LinkedIn", "linkedin.com/in/patrickjustino"],
  });
}

function minimalAtsSampleResume() {
  if (currentLanguage === "pt") {
    return createBlankResume({
      selectedTemplate: "minimal",
      personal: {
        fullName: "Patrick Justino",
        title: "Supervisor Administrativo",
        email: "patrick@email.com",
        phone: "+55 27 99999-9999",
        city: "Serra",
        state: "ES",
      },
      summary: "Supervisor Administrativo com experiência em rotinas operacionais, organização de processos, atendimento a demandas internas e acompanhamento de indicadores. Perfil prático, comunicativo e orientado a controle, produtividade e melhoria contínua.",
      workExperience: [{
        role: "Supervisor de Operações",
        company: "Empresa Exemplo",
        location: "Serra, ES",
        period: "Jan 2023 - Atual",
        achievements: [
          "Coordenei rotinas operacionais e acompanhei indicadores de desempenho.",
          "Organizei processos internos para melhorar produtividade e controle.",
          "Apoiei equipes na resolução de problemas e atendimento a demandas diárias.",
        ],
      }],
      education: [{ degree: "Administração", school: "Universidade Exemplo" }],
      skills: ["Liderança", "Comunicação", "Organização", "Gestão de equipes", "Controle de processos", "Atendimento ao cliente"],
      languages: ["Português - Nativo", "Inglês - Intermediário"],
      certifications: ["Gestão de Pessoas - Instituição Exemplo, 2024"],
      projects: ["Padronização de processos internos - Estruturou fluxos de acompanhamento para reduzir retrabalho e melhorar a comunicação entre áreas."],
      professionalLinks: ["linkedin.com/in/patrickjustino"],
    });
  }
  return createBlankResume({
    selectedTemplate: "minimal",
    personal: {
      fullName: "Patrick Justino",
      title: "Administrative Supervisor",
      email: "patrick@email.com",
      phone: "+55 27 99999-9999",
      city: "Serra",
      state: "ES",
    },
    summary: "Administrative Supervisor experienced in operational routines, process organization, internal support and performance tracking. Practical, communicative and focused on control, productivity and continuous improvement.",
    workExperience: [{
      role: "Operations Supervisor",
      company: "Example Company",
      location: "Serra, ES",
      period: "Jan 2023 - Present",
      achievements: [
        "Coordinated operational routines and monitored performance indicators.",
        "Organized internal processes to improve productivity and control.",
        "Supported teams with problem solving and daily business requests.",
      ],
    }],
    education: [{ degree: "Business Administration", school: "Example University" }],
    skills: ["Leadership", "Communication", "Organization", "Team management", "Process control", "Customer service"],
    languages: ["Portuguese - Native", "English - Intermediate"],
    certifications: ["People Management - Example Institution, 2024"],
    projects: ["Internal process standardization - Structured follow-up flows to reduce rework and improve communication between teams."],
    professionalLinks: ["linkedin.com/in/patrickjustino"],
  });
}

function studentSampleResume() {
  if (currentLanguage === "pt") {
    return createBlankResume({
      selectedTemplate: "student",
      personal: {
        fullName: "Patrick Justino",
        title: "Estudante de Administração | Buscando estágio",
        email: "patrick@email.com",
        phone: "+55 27 99999-9999",
        city: "Serra",
        state: "ES",
      },
      summary: "Estudante em busca de oportunidade para desenvolver habilidades profissionais, contribuir com organização, atendimento e aprendizado rápido em ambiente corporativo.",
      workExperience: [{
        role: "Auxiliar Administrativo",
        company: "Empresa Exemplo",
        location: "Serra, ES",
        period: "Jan 2024 - Jun 2024",
        achievements: [
          "Apoiei rotinas administrativas e organização de documentos.",
          "Realizei atendimento básico e controle de informações.",
          "Colaborei com a equipe em tarefas operacionais.",
        ],
      }],
      education: [{ degree: "Administração - 2022 a 2026", school: "Universidade Exemplo" }],
      skills: ["Comunicação", "Organização", "Trabalho em equipe", "Pacote Office", "Atendimento ao cliente", "Aprendizado rápido"],
      languages: ["Português - Nativo", "Inglês - Básico"],
      certifications: ["Excel Básico ao Intermediário - Instituição Exemplo, 2024", "Atendimento ao Cliente - Curso Online, 2023"],
      projects: ["Projeto de Pesquisa em Gestão - Universidade Exemplo - Desenvolvi análise sobre organização de processos administrativos, com foco em produtividade e comunicação interna."],
      professionalLinks: ["LinkedIn", "Portfólio acadêmico"],
    });
  }
  return createBlankResume({
    selectedTemplate: "student",
    personal: {
      fullName: "Patrick Justino",
      title: "Business Student | Seeking an internship",
      email: "patrick@email.com",
      phone: "+55 27 99999-9999",
      city: "Serra",
      state: "ES",
    },
    summary: "Student seeking an opportunity to develop professional skills, contribute with organization, customer service and fast learning in a corporate environment.",
    workExperience: [{
      role: "Administrative Assistant",
      company: "Example Company",
      location: "Serra, ES",
      period: "Jan 2024 - Jun 2024",
      achievements: [
        "Supported administrative routines and document organization.",
        "Handled basic service tasks and information control.",
        "Collaborated with the team on daily operational activities.",
      ],
    }],
    education: [{ degree: "Business Administration - 2022 to 2026", school: "Example University" }],
    skills: ["Communication", "Organization", "Teamwork", "Microsoft Office", "Customer Service", "Fast learning"],
    languages: ["Portuguese - Native", "English - Basic"],
    certifications: ["Basic to Intermediate Excel - Example Institution, 2024", "Customer Service - Online Course, 2023"],
    projects: ["Management Research Project - Example University - Developed an analysis of administrative processes focused on productivity and internal communication."],
    professionalLinks: ["LinkedIn", "Academic portfolio"],
  });
}

function firstJobSampleResume() {
  if (currentLanguage === "pt") {
    return createBlankResume({
      selectedTemplate: "first-job",
      personal: {
        fullName: "Patrick Justino",
        title: "Buscando primeira oportunidade como Auxiliar Administrativo",
        email: "patrick@email.com",
        phone: "+55 27 99999-9999",
        city: "Serra",
        state: "ES",
      },
      summary: "Busco minha primeira oportunidade profissional para desenvolver habilidades, aprender com a equipe e contribuir com responsabilidade, organização e disposição para crescer.",
      initialProfile: "Pessoa comunicativa, organizada e com facilidade para aprender. Interesse em atuar em ambiente profissional, apoiar rotinas da equipe e desenvolver novas competências.",
      workExperience: [{
        role: "Atendimento informal em comércio familiar",
        company: "Loja familiar",
        location: "Serra, ES",
        period: "2023 - 2024",
        achievements: [
          "Apoiei no atendimento a clientes e organização de produtos.",
          "Auxiliei em tarefas simples de controle e rotina diária.",
          "Desenvolvi responsabilidade, comunicação e pontualidade.",
        ],
      }],
      education: [{ degree: "Ensino Médio Completo", school: "Escola Exemplo - Concluído em 2024" }],
      skills: ["Comunicação", "Organização", "Pontualidade", "Trabalho em equipe", "Facilidade de aprendizagem", "Atendimento ao cliente", "Pacote Office básico", "Responsabilidade"],
      languages: ["Português - Nativo", "Inglês - Básico"],
      certifications: ["Informática Básica - Instituição Exemplo, 2024", "Atendimento ao Cliente - Instituição Exemplo, 2024"],
      projects: ["Projeto escolar de empreendedorismo - Desenvolvi, com colegas, uma apresentação sobre organização financeira e atendimento ao cliente."],
      professionalLinks: ["linkedin.com/in/patrickjustino"],
    });
  }
  return createBlankResume({
    selectedTemplate: "first-job",
    personal: {
      fullName: "Patrick Justino",
      title: "Seeking a first opportunity as an Administrative Assistant",
      email: "patrick@email.com",
      phone: "+55 27 99999-9999",
      city: "Serra",
      state: "ES",
    },
    summary: "I am seeking my first professional opportunity to develop skills, learn from the team and contribute with responsibility, organization and willingness to grow.",
    initialProfile: "Communicative, organized and quick to learn. Interested in joining a professional environment, supporting team routines and developing new competencies.",
    workExperience: [{
      role: "Informal customer service in a family business",
      company: "Family store",
      location: "Serra, ES",
      period: "2023 - 2024",
      achievements: [
        "Supported customer service and product organization.",
        "Helped with simple control tasks and daily routines.",
        "Developed responsibility, communication and punctuality.",
      ],
    }],
    education: [{ degree: "High School Diploma", school: "Example School - Completed in 2024" }],
    skills: ["Communication", "Organization", "Punctuality", "Teamwork", "Fast learning", "Customer service", "Basic Microsoft Office", "Responsibility"],
    languages: ["Portuguese - Native", "English - Basic"],
    certifications: ["Basic Computer Skills - Example Institution, 2024", "Customer Service - Example Institution, 2024"],
    projects: ["School entrepreneurship project - Worked with classmates on a presentation about financial organization and customer service."],
    professionalLinks: ["linkedin.com/in/patrickjustino"],
  });
}

function simpleAtsSampleResume() {
  if (currentLanguage === "pt") {
    return createBlankResume({
      selectedTemplate: "simple-ats",
      personal: {
        fullName: "Patrick Justino",
        title: "Supervisor Administrativo",
        email: "patrick.justino@email.com",
        phone: "(11) 91234-5678",
        location: "Sao Paulo, SP",
      },
      summary: "Profissional com experiência em rotinas administrativas, organização de processos, atendimento a demandas internas e acompanhamento de indicadores. Perfil comunicativo, prático e focado em eficiência operacional.",
      workExperience: [{
        role: "Supervisor Administrativo",
        company: "Empresa Exemplo Ltda.",
        location: "Sao Paulo, SP",
        period: "Jan 2022 - Atual",
        achievements: [
          "Organizei rotinas administrativas e acompanhei indicadores internos.",
          "Apoiei equipes na distribuição de demandas e controle de processos.",
          "Realizei atendimento interno e comunicação entre áreas.",
        ],
      },
      {
        role: "Analista Administrativo",
        company: "Solucoes Corporativas S.A.",
        location: "Sao Paulo, SP",
        period: "Out 2019 - Dez 2021",
        achievements: [
          "Controlei documentos, planilhas e relatorios gerenciais.",
          "Realizei atendimento interno e suporte as areas operacionais.",
          "Elaborei apresentacoes e acompanhei prazos.",
        ],
      },
      {
        role: "Assistente Administrativo",
        company: "Servicos Integrados Ltda.",
        location: "Sao Paulo, SP",
        period: "Mar 2017 - Set 2019",
        achievements: [
          "Apoiei rotinas administrativas e financeiras.",
          "Organizei arquivos e cadastros de clientes e fornecedores.",
          "Emiti relatorios e apoiei processos de compras.",
        ],
      }],
      education: [{ degree: "Administração - 2020 a 2024", school: "Universidade Exemplo" }],
      skills: ["Liderança", "Comunicação", "Organização", "Pacote Office", "Atendimento ao cliente", "Gestão de processos"],
      languages: ["Português - Nativo", "Inglês - Intermediário"],
      certifications: ["Excel Intermediário - Instituição Exemplo, 2024"],
      projects: ["Padronização de processos internos - Estruturei fluxos de acompanhamento para reduzir retrabalho e melhorar a comunicação entre áreas."],
      professionalLinks: ["LinkedIn: linkedin.com/in/patrickjustino"],
      summary: "Profissional com experiencia em rotinas administrativas, organizacao de processos, atendimento e relacionamento interno e acompanhamento de indicadores. Perfil comunicativo, pratico e focado em eficiencia operacional.",
      education: [{ degree: "Administracao", school: "Universidade Exemplo - Sao Paulo, SP", period: "Concluido em 2020" }],
      skills: ["Comunicacao", "Organizacao", "Pacote Office", "Atendimento ao cliente", "Gestao de processos", "Analise de dados", "Planejamento"],
      languages: ["Portugues - Nativo", "Ingles - Intermediario"],
      certifications: ["Excel Intermediario - Fundacao Bradesco - 2021", "Gestao de Processos - Sebrae - 2020"],
      projects: ["Otimizacao de processos internos - Mapeei e propus melhorias no fluxo de atendimento, reduzindo retrabalho e melhorando a eficiencia operacional. Mar 2023 - Jul 2023"],
      professionalLinks: ["portfoliopatrick.com.br", "github.com/patrickjustino", "linkedin.com/in/patrickjustino"],
    });
  }
  return createBlankResume({
    selectedTemplate: "simple-ats",
    personal: {
      fullName: "Patrick Justino",
      title: "Administrative Supervisor",
      email: "patrick.justino@email.com",
      phone: "+55 11 91234-5678",
      location: "Sao Paulo, Brazil",
    },
    summary: "Professional with experience in administrative routines, process organization, internal request support and performance tracking. Communicative, practical and focused on operational efficiency.",
    workExperience: [{
      role: "Administrative Supervisor",
      company: "Example Company Ltd.",
      location: "Sao Paulo, Brazil",
      period: "Jan 2022 - Present",
      achievements: [
        "Organized administrative routines and monitored internal indicators.",
        "Supported teams with task distribution and process control.",
        "Handled internal service requests and communication between departments.",
      ],
    },
    {
      role: "Administrative Analyst",
      company: "Corporate Solutions S.A.",
      location: "Sao Paulo, Brazil",
      period: "Oct 2019 - Dec 2021",
      achievements: [
        "Controlled documents, spreadsheets and management reports.",
        "Handled internal support for operational departments.",
        "Prepared presentations and monitored deadlines.",
      ],
    },
    {
      role: "Administrative Assistant",
      company: "Integrated Services Ltd.",
      location: "Sao Paulo, Brazil",
      period: "Mar 2017 - Sep 2019",
      achievements: [
        "Supported administrative and financial routines.",
        "Organized files and customer and supplier records.",
        "Issued reports and supported purchasing processes.",
      ],
    }],
    education: [{ degree: "Business Administration - 2020 to 2024", school: "Example University" }],
    skills: ["Leadership", "Communication", "Organization", "Microsoft Office", "Customer service", "Process management"],
    languages: ["Portuguese - Native", "English - Intermediate"],
    certifications: ["Intermediate Excel - Example Institution, 2024"],
    projects: ["Internal process standardization - Structured follow-up flows to reduce rework and improve communication between departments."],
    professionalLinks: ["LinkedIn: linkedin.com/in/patrickjustino"],
    education: [{ degree: "Business Administration", school: "Example University - Sao Paulo, Brazil", period: "Completed in 2020" }],
    skills: ["Communication", "Organization", "Microsoft Office", "Customer Service", "Process Management", "Data Analysis", "Planning"],
    languages: ["Portuguese - Native", "English - Intermediate"],
    certifications: ["Intermediate Excel - Bradesco Foundation - 2021", "Process Management - Sebrae - 2020"],
    projects: ["Internal process optimization - Mapped and proposed improvements in the service workflow, reducing rework and improving operational efficiency. Mar 2023 - Jul 2023"],
    professionalLinks: ["patrickportfolio.com", "github.com/patrickjustino", "linkedin.com/in/patrickjustino"],
  });
}

function icon(name, cls = "") {
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${iconPaths[name] || iconPaths.file}"></path></svg>`;
}

function brazilFlagIcon() {
  return `<svg class="br-flag-icon" viewBox="0 0 32 22" aria-hidden="true" focusable="false"><rect x="1" y="1" width="30" height="20" rx="4" fill="#159447"></rect><path d="M16 4.2 27 11 16 17.8 5 11 16 4.2Z" fill="#f7d342"></path><circle cx="16" cy="11" r="5" fill="#194a9f"></circle><path d="M11.7 9.7c3.2-.6 6.4-.2 9.2 1.3" fill="none" stroke="#fff" stroke-width="1.25" stroke-linecap="round"></path><rect x="1" y="1" width="30" height="20" rx="4" fill="none" stroke="rgba(0,0,0,.14)"></rect></svg>`;
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

function assetPath(path) {
  const normalized = String(path || "").replace(/^\/+/, "");
  if (window.location.protocol === "file:") {
    const currentPath = (window.location.pathname || "").replace(/\\/g, "/");
    const nestedLocalePage = /\/(?:pt|en)\/index\.html$/i.test(currentPath);
    return `${nestedLocalePage ? "../" : "./"}${normalized}`;
  }
  return `/${normalized}`;
}

function brandLogo(tag = "a", href = "#/", route = "/") {
  const attrs = tag === "a" ? `href="${href}" data-route="${route}" aria-label="Succeedora home"` : "";
  return `<${tag} class="brand" ${attrs}><span class="brand-mark" aria-hidden="true"><img class="brand-logo-image" src="${assetPath("assets/brand/succeedora-logo-premium.png")}" alt="" decoding="async" /></span><span class="brand-word">Succeedora</span></${tag}>`;
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
  if (path !== "/dashboard/builder") {
    const builderIsOpen = Boolean(document.querySelector(".builder-page"));
    const editingSavedResume = currentBuilderResumeId && findResume(currentBuilderResumeId);
    if (builderIsOpen && builderDraft && editingSavedResume) saveCurrentResume(false);
    cancelPendingResumeAutosave();
  }
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
  const hash = window.location.hash.replace("#", "").split("?")[0];
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
  window.requestAnimationFrame(() => updateResumePreviewScales(document.getElementById("app")));
  window.scrollTo({ top: 0, behavior: "auto" });
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

const PLAN_TYPES = ["free", "pro", "premium"];
const PLAN_STATUSES = ["active", "expired", "cancelled", "manual", "trial"];
const PLAN_SOURCES = ["admin", "stripe", "pix", "manual", "system"];

function normalizePlanType(value) {
  const text = typeof value === "object" ? value?.type : value;
  return PLAN_TYPES.includes(String(text || "").toLowerCase()) ? String(text).toLowerCase() : "free";
}

function legacyPlanType(raw = {}) {
  if (typeof raw === "string") return normalizePlanType(raw);
  if (!raw || typeof raw !== "object") return "free";
  if (raw.isPremium || raw.hasPremiumAccess || raw.premiumUnlocked || raw.allFeaturesUnlocked) return "premium";
  if (raw.isPro || raw.hasPro || raw.proUnlocked) return "pro";
  return normalizePlanType(raw.type || raw.plan || raw.currentPlan);
}

function normalizePlanState(raw = {}, fallbackType = "free") {
  const now = isoNow();
  const object = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const type = normalizePlanType(object.type || legacyPlanType(raw) || fallbackType);
  const status = PLAN_STATUSES.includes(object.status) ? object.status : "active";
  const source = PLAN_SOURCES.includes(object.source) ? object.source : (type === "free" ? "system" : "manual");
  return {
    type,
    status: type === "free" ? "active" : status,
    startedAt: object.startedAt || object.planStartedAt || (type === "free" ? "" : now),
    expiresAt: type === "free" ? null : (object.expiresAt || object.planExpiresAt || null),
    updatedAt: object.updatedAt || object.manualPlanUpdatedAt || now,
    source,
    durationLabel: object.durationLabel || object.planDurationLabel || "",
    stripeCustomerId: String(object.stripeCustomerId || ""),
    stripeSubscriptionId: String(object.stripeSubscriptionId || ""),
    currentPeriodEnd: object.currentPeriodEnd || object.expiresAt || object.planExpiresAt || null,
  };
}

function planIsExpired(planState) {
  const plan = normalizePlanState(planState);
  if (plan.type === "free" || !plan.expiresAt) return false;
  const expiresAt = Date.parse(plan.expiresAt);
  return Number.isFinite(expiresAt) && expiresAt <= Date.now();
}

function planIsActive(planState) {
  const plan = normalizePlanState(planState);
  return plan.type !== "free" && ["active", "manual", "trial"].includes(plan.status) && !planIsExpired(plan);
}

function freePlanState(source = "system") {
  return {
    type: "free",
    status: "active",
    startedAt: "",
    expiresAt: null,
    updatedAt: isoNow(),
    source,
    durationLabel: "",
  };
}

function getEffectivePlan(account = currentAccount(), options = {}) {
  const access = options.access || null;
  const accountPlan = normalizePlanState(account?.plan || account?.currentPlan || account?.planType || account?.legacyPlan || "free");
  const accessPlan = normalizePlanState(access?.planState || access?.plan || "free");
  const hasAccountPlan = Boolean(account && Object.prototype.hasOwnProperty.call(account, "plan"));
  const sourcePlan = hasAccountPlan ? accountPlan : accessPlan;
  const effective = planIsActive(sourcePlan) ? sourcePlan : freePlanState(planIsExpired(sourcePlan) ? "system" : sourcePlan.source || "system");
  if (options.persist && account?.id) {
    const normalizedAccountPlan = normalizePlanState(account.plan || account.planType || "free");
    if (normalizedAccountPlan.type !== effective.type || normalizedAccountPlan.expiresAt !== effective.expiresAt || normalizedAccountPlan.status !== effective.status) {
      updateAccount(account.id, (current) => ({ ...current, plan: effective, manualPlanUpdatedAt: effective.updatedAt, manualPlanUpdatedBy: effective.source }));
    }
  }
  return effective;
}

function planDurationOptions() {
  return [
    ["none", currentLanguage === "pt" ? "Sem expiração" : "No expiration"],
    ["7d", currentLanguage === "pt" ? "7 dias" : "7 days"],
    ["30d", currentLanguage === "pt" ? "30 dias" : "30 days"],
    ["90d", currentLanguage === "pt" ? "90 dias" : "90 days"],
    ["1y", currentLanguage === "pt" ? "1 ano" : "1 year"],
    ["custom", currentLanguage === "pt" ? "Data personalizada" : "Custom date"],
  ];
}

function planExpiresAtForDuration(duration = "none", customDate = "") {
  if (duration === "custom" && customDate) {
    const custom = new Date(`${customDate}T23:59:59`);
    return Number.isNaN(custom.getTime()) ? null : custom.toISOString();
  }
  const days = { "7d": 7, "30d": 30, "90d": 90, "1y": 365 }[duration];
  if (!days) return null;
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  return expires.toISOString();
}

function formatPlanExpiry(value) {
  if (!value) return "";
  try {
    const date = new Date(value);
    const formatted = new Intl.DateTimeFormat(currentLanguage === "pt" ? "pt-BR" : "en-US", { dateStyle: "medium" }).format(date);
    return currentLanguage === "pt" ? `Válido até ${formatted}` : `Valid until ${formatted}`;
  } catch (error) {
    return "";
  }
}

function loadAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNTS_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.map((account) => {
      const legacyType = legacyPlanType(account);
      const hasStructuredPlan = account.plan && typeof account.plan === "object" && !Array.isArray(account.plan);
      const planSource = hasStructuredPlan ? account.plan : (legacyType !== "free" ? legacyType : (account.plan || account.currentPlan || account.planType || "free"));
      const plan = normalizePlanState(planSource);
      return {
        id: String(account.id || `user_${Date.now()}`),
        email: normalizeEmail(account.email),
        password: String(account.password || ""),
        plan,
        status: account.status === "blocked" ? "blocked" : "active",
        emailVerified: account.emailVerified === false ? false : true,
        verificationCode: String(account.verificationCode || ""),
        verificationCodeExpiresAt: account.verificationCodeExpiresAt || "",
        verificationCodeSentAt: account.verificationCodeSentAt || "",
        createdAt: account.createdAt || isoNow(),
        manualPlanUpdatedAt: account.manualPlanUpdatedAt || plan.updatedAt || "",
        manualPlanUpdatedBy: normalizeEmail(account.manualPlanUpdatedBy || ""),
        profile: {
          fullName: String(account.profile?.fullName || account.fullName || "").trim(),
          email: normalizeEmail(account.profile?.email || account.email),
          phone: String(account.profile?.phone || "").trim(),
          location: String(account.profile?.location || "").trim(),
          title: String(account.profile?.title || "").trim(),
          preferredLanguage: account.profile?.preferredLanguage === "pt" ? "pt" : "en",
        },
      };
    }).filter((account) => account.email) : [];
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
    const parsed = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem(SESSION_STORAGE_KEY) || "{}");
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

function isAdminAccount(account = currentAccount()) {
  return ADMIN_EMAILS.includes(normalizeEmail(account?.email || ""));
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
  return formatPixKeyValue(paymentConfig.pixKey);
}

function pixPayloadKey(value = paymentConfig.pixKey, keyType = paymentConfig.pixKeyType) {
  const key = String(value || "").trim();
  return ["CPF", "CNPJ", "PHONE", "TELEFONE"].includes(String(keyType || "").toUpperCase()) ? key.replace(/\D/g, "") : key;
}

function formatPixKeyValue(value = paymentConfig.pixKey) {
  const key = String(value || "").replace(/\D/g, "");
  if (key.length !== 14) return String(value || "");
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
  const knownStatuses = ["pending_payment", "pending_manual_confirmation", "approved", "rejected", "cancelled", "paid", "pending", "failed", "refunded"];
  const status = knownStatuses.includes(request.status || request.paymentStatus) ? (request.status || request.paymentStatus) : "pending_payment";
  return {
    id: String(request.id || `pay_${Date.now().toString(36)}`),
    userId: String(request.userId || ""),
    userName: String(request.userName || request.accountName || "").trim(),
    userEmail: normalizeEmail(request.userEmail || ""),
    payerName: String(request.payerName || request.userName || request.accountName || "").trim(),
    payerEmail: normalizeEmail(request.payerEmail || request.userEmail || ""),
    payerTaxId: String(request.payerTaxId || request.taxId || "").trim(),
    payerNote: String(request.payerNote || request.note || "").trim(),
    productType: String(request.productType || ""),
    productName: String(request.productName || ""),
    amount: Number(request.amount || 0),
    currency: request.currency || paymentConfig.currency,
    paymentMethod: request.paymentMethod === "stripe" ? "stripe" : "pix",
    pixKey: String(request.pixKey || paymentConfig.pixKey),
    pixKeyType: String(request.pixKeyType || paymentConfig.pixKeyType),
    pixPayload: String(request.pixPayload || ""),
    resumeId: String(request.resumeId || request.targetResumeId || ""),
    templateKey: String(request.templateKey || ""),
    creditAmount: Math.max(0, Number(request.creditAmount || 0)),
    planExpiresAt: request.planExpiresAt || "",
    planDurationDays: Math.max(0, Number(request.planDurationDays || 0)),
    status,
    paymentStatus: status,
    createdAt: request.createdAt || isoNow(),
    confirmedByUserAt: request.confirmedByUserAt || "",
    approvedAt: request.approvedAt || "",
    approvedBy: normalizeEmail(request.approvedBy || ""),
    rejectedAt: request.rejectedAt || "",
    rejectedBy: normalizeEmail(request.rejectedBy || ""),
    rejectionReason: String(request.rejectionReason || ""),
    stripeSessionId: String(request.stripeSessionId || ""),
    stripePaymentIntentId: String(request.stripePaymentIntentId || ""),
    stripeCustomerId: String(request.stripeCustomerId || ""),
    stripeSubscriptionId: String(request.stripeSubscriptionId || ""),
    receiptUrl: String(request.receiptUrl || ""),
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
    paid: labels.paid || labels.approved,
    pending: labels.waitingPayment,
    failed: labels.failed || labels.rejected,
    refunded: labels.refunded || labels.cancelled,
    rejected: labels.rejected,
    cancelled: labels.cancelled,
  };
  return map[status] || labels.waitingPayment;
}

function loadUserAccess(account) {
  const stored = normalizeAccessState(readJsonStorage(userScopedStorageKey(ACCESS_STORAGE_KEY, account), {}));
  const effectivePlan = getEffectivePlan(account, { access: stored });
  return { ...stored, plan: effectivePlan.type, planState: effectivePlan };
}

function saveUserAccess(account, access) {
  return writeJsonStorage(userScopedStorageKey(ACCESS_STORAGE_KEY, account), normalizeAccessState(access));
}

function loadUserPayments(account) {
  const requests = readJsonStorage(paymentStorageKey(account), []);
  return Array.isArray(requests) ? requests.map((request) => normalizePaymentRequest({ ...request, userId: request.userId || account.id, userName: request.userName || account.profile?.fullName || account.email, userEmail: request.userEmail || account.email })) : [];
}

function saveUserPayments(account, requests) {
  return writeJsonStorage(paymentStorageKey(account), requests.map(normalizePaymentRequest));
}

function loadAdminAuditLog() {
  const records = readJsonStorage(ADMIN_AUDIT_LOG_STORAGE_KEY, []);
  return Array.isArray(records) ? records : [];
}

function saveAdminAuditLog(entry) {
  const admin = currentAccount();
  const records = loadAdminAuditLog();
  records.unshift({
    id: `audit_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    adminEmail: normalizeEmail(entry.adminEmail || admin?.email || ""),
    action: String(entry.action || ""),
    targetUserEmail: normalizeEmail(entry.targetUserEmail || ""),
    paymentId: String(entry.paymentId || ""),
    oldValue: entry.oldValue ?? "",
    newValue: entry.newValue ?? "",
    oldPlan: entry.oldPlan ?? "",
    newPlan: entry.newPlan ?? "",
    oldExpiresAt: entry.oldExpiresAt ?? "",
    newExpiresAt: entry.newExpiresAt ?? "",
    reason: String(entry.reason || ""),
    createdAt: isoNow(),
  });
  writeJsonStorage(ADMIN_AUDIT_LOG_STORAGE_KEY, records.slice(0, 250));
}

function loadAdminDataset() {
  const accounts = loadAccounts();
  const aiUsage = loadAiUsageLog();
  const users = accounts.map((account) => {
    const resumes = readJsonStorage(userScopedStorageKey(RESUMES_STORAGE_KEY, account), []);
    const letters = readJsonStorage(userScopedStorageKey(COVER_LETTERS_STORAGE_KEY, account), []);
    const access = loadUserAccess(account);
    const payments = loadUserPayments(account).map((payment) => ({ ...payment, accountId: account.id, accountEmail: account.email, accountName: account.profile?.fullName || account.email }));
    return {
      account,
      access,
      payments,
      resumes: Array.isArray(resumes) ? resumes : [],
      letters: Array.isArray(letters) ? letters : [],
      aiUsage: aiUsage.filter((record) => record.userId === account.id || normalizeEmail(record.email) === account.email),
    };
  });
  const payments = users.flatMap((user) => user.payments).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const oneTimePurchases = payments.filter((payment) => ["remove_watermark", "premium_pdf", "premium_template", "career_pack", "online_resume_link", ...AI_CREDIT_PRODUCT_TYPES].includes(payment.productType));
  return { users, payments, oneTimePurchases, aiUsage, auditLog: loadAdminAuditLog() };
}

const SUPPORT_CATEGORY_KEYS = ["account", "resume", "cover_letter", "payment", "plans", "ai", "pdf_export", "technical_issue", "website_issue", "suggestion", "other"];
const SUPPORT_FORM_CATEGORY_KEYS = ["account", "resume", "cover_letter", "payment", "plans", "ai", "pdf_export", "technical_issue", "other"];
const SUPPORT_PRIORITY_KEYS = ["low", "medium", "high"];
const SUPPORT_STATUS_KEYS = ["open", "in_progress", "answered", "closed"];

function supportTicketId() {
  if (window.crypto && crypto.randomUUID) return `ticket_${crypto.randomUUID()}`;
  return `ticket_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeSupportTicket(ticket = {}) {
  const status = SUPPORT_STATUS_KEYS.includes(ticket.status) ? ticket.status : "open";
  const rawCategory = ticket.category === "website_issue" ? "technical_issue" : ticket.category;
  const category = SUPPORT_CATEGORY_KEYS.includes(rawCategory) ? rawCategory : "other";
  const priority = SUPPORT_PRIORITY_KEYS.includes(ticket.priority) ? ticket.priority : "medium";
  const createdAt = ticket.createdAt || isoNow();
  const history = Array.isArray(ticket.history) ? ticket.history : [{ type: "created", status: "open", createdAt }];
  return {
    id: String(ticket.id || supportTicketId()),
    userId: String(ticket.userId || ""),
    userName: String(ticket.userName || "").trim(),
    userEmail: normalizeEmail(ticket.userEmail || ""),
    subject: String(ticket.subject || "").trim(),
    category,
    priority,
    message: String(ticket.message || "").trim(),
    status,
    createdAt,
    updatedAt: ticket.updatedAt || createdAt,
    adminReply: String(ticket.adminReply || "").trim(),
    adminEmail: normalizeEmail(ticket.adminEmail || ""),
    repliedAt: ticket.repliedAt || "",
    closedAt: ticket.closedAt || "",
    userReadAt: ticket.userReadAt || "",
    history,
  };
}

function loadSupportTickets() {
  const tickets = readJsonStorage(SUPPORT_TICKETS_STORAGE_KEY, []);
  return Array.isArray(tickets) ? tickets.map(normalizeSupportTicket).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];
}

function saveSupportTickets(tickets) {
  return writeJsonStorage(SUPPORT_TICKETS_STORAGE_KEY, tickets.map(normalizeSupportTicket));
}

function upsertSupportTicket(ticket) {
  const normalized = normalizeSupportTicket(ticket);
  const tickets = loadSupportTickets();
  const index = tickets.findIndex((item) => item.id === normalized.id);
  if (index >= 0) tickets[index] = normalized;
  else tickets.unshift(normalized);
  saveSupportTickets(tickets);
  return normalized;
}

function loadCurrentUserSupportTickets(account = currentAccount()) {
  if (!account?.id) return [];
  return loadSupportTickets().filter((ticket) => ticket.userId === account.id);
}

function supportCategoryLabel(category) {
  const normalized = category === "website_issue" ? "technical_issue" : category;
  return t().support.categories[normalized] || t().support.categories[category] || t().support.categories.other;
}

function supportPriorityLabel(priority) {
  return t().support.priorities[priority] || t().support.priorities.medium;
}

function supportStatusLabel(status) {
  return t().support.status[status] || t().support.status.open;
}

function supportStatusBadge(status) {
  return `<span class="support-badge support-status-${escapeHtml(status)}">${escapeHtml(supportStatusLabel(status))}</span>`;
}

function supportPriorityBadge(priority) {
  return `<span class="support-badge support-priority-${escapeHtml(priority)}">${escapeHtml(supportPriorityLabel(priority))}</span>`;
}

function supportMetricCards(tickets = []) {
  const labels = t().support.metrics;
  const openCount = tickets.filter((ticket) => ticket.status !== "closed").length;
  const lastReply = tickets.filter((ticket) => ticket.repliedAt).sort((a, b) => new Date(b.repliedAt) - new Date(a.repliedAt))[0];
  const items = [
    ["mail", labels.open, String(openCount)],
    ["check", labels.lastReply, lastReply ? formatPaymentDate(lastReply.repliedAt) : labels.noReply],
    ["target", labels.responseTime, labels.upTo24h],
    ["shield", labels.supportStatus, labels.available],
  ];
  return items.map(([iconName, label, value]) => `
    <article class="support-metric-card">
      <div>${icon(iconName)}</div>
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `).join("");
}

function supportHeroBadges() {
  const labels = t().support;
  return [labels.responseWindow, labels.secureChannel, labels.centralizedHistory, labels.organizedSupport]
    .map((item) => `<span>${icon("check")} ${escapeHtml(item)}</span>`)
    .join("");
}

function supportHelpCards() {
  const labels = t().support;
  return labels.helpCards.map(([iconName, title, description]) => `
    <article class="support-help-card">
      <div>${icon(iconName)}</div>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(description)}</span>
    </article>
  `).join("");
}

function supportMessageBubble(role, text, date = "") {
  const labels = t().support;
  const isTeam = role === "team";
  return `
    <article class="support-thread-message ${isTeam ? "team-message" : "user-message"}">
      <div class="support-thread-avatar">${isTeam ? "S" : escapeHtml(profileInitials(loadProfile()).slice(0, 1) || "U")}</div>
      <div>
        <div class="support-thread-meta"><strong>${escapeHtml(isTeam ? labels.team : labels.you)}</strong>${date ? `<span>${escapeHtml(formatPaymentDate(date))}</span>` : ""}</div>
        <p>${escapeHtml(text)}</p>
      </div>
    </article>
  `;
}

function supportAdminThread(ticket) {
  const support = t().support;
  return `
    <div class="support-ticket-thread admin-support-thread">
      <article class="support-thread-message user-message">
        <div class="support-thread-avatar">${escapeHtml((ticket.userName || ticket.userEmail || "U").trim().slice(0, 1).toUpperCase())}</div>
        <div>
          <div class="support-thread-meta"><strong>${escapeHtml(ticket.userName || support.you)}</strong><span>${escapeHtml(formatPaymentDate(ticket.createdAt))}</span></div>
          <p>${escapeHtml(ticket.message || "-")}</p>
        </div>
      </article>
      ${ticket.adminReply ? `
        <article class="support-thread-message team-message">
          <div class="support-thread-avatar">S</div>
          <div>
            <div class="support-thread-meta"><strong>${escapeHtml(support.team)}</strong><span>${escapeHtml(formatPaymentDate(ticket.repliedAt))}</span></div>
            <p>${escapeHtml(ticket.adminReply)}</p>
          </div>
        </article>
      ` : `<div class="support-reply-box"><strong>${escapeHtml(support.adminReply)}</strong><span>${escapeHtml(support.noReply)}</span></div>`}
    </div>
  `;
}

function sendSupportTicketCreatedEmail(ticket) {
  // Future Resend hook: send an internal notification when a support ticket is created.
  return { ok: false, skipped: true, ticketId: ticket?.id || "" };
}

function sendSupportReplyEmail(ticket) {
  // Future Resend hook: notify the user by email when admin replies are enabled.
  return { ok: false, skipped: true, ticketId: ticket?.id || "" };
}

function createSupportTicket(values) {
  const account = currentAccount();
  if (!account?.id) return null;
  const profile = loadProfile();
  const now = isoNow();
  const ticket = normalizeSupportTicket({
    userId: account.id,
    userName: profile.fullName || account.profile?.fullName || account.email,
    userEmail: account.email,
    subject: values.subject,
    category: values.category,
    priority: values.priority,
    message: values.message,
    status: "open",
    createdAt: now,
    updatedAt: now,
    history: [{ type: "created", status: "open", createdAt: now }],
  });
  upsertSupportTicket(ticket);
  sendSupportTicketCreatedEmail(ticket);
  return ticket;
}

function updateSupportTicketAsAdmin(ticketId, updater, action = "support_update") {
  if (!isAdminAccount()) return null;
  const admin = currentAccount();
  const tickets = loadSupportTickets();
  const index = tickets.findIndex((ticket) => ticket.id === ticketId);
  if (index < 0) return null;
  const before = tickets[index];
  const next = normalizeSupportTicket(updater(before));
  tickets[index] = next;
  saveSupportTickets(tickets);
  saveAdminAuditLog({
    action,
    targetUserEmail: next.userEmail,
    paymentId: next.id,
    oldValue: before.status,
    newValue: next.status,
    adminEmail: admin?.email || "",
  });
  return next;
}

function adminMarkSupportTicketInProgress(ticketId) {
  const now = isoNow();
  return updateSupportTicketAsAdmin(ticketId, (ticket) => ({
    ...ticket,
    status: "in_progress",
    updatedAt: now,
    history: [...ticket.history, { type: "in_progress", status: "in_progress", adminEmail: currentAccount()?.email || "", createdAt: now }],
  }), "support_in_progress");
}

function adminReplySupportTicket(ticketId, reply) {
  const now = isoNow();
  const admin = currentAccount();
  const updated = updateSupportTicketAsAdmin(ticketId, (ticket) => ({
    ...ticket,
    status: "answered",
    adminReply: String(reply || "").trim(),
    adminEmail: admin?.email || "",
    repliedAt: now,
    updatedAt: now,
    userReadAt: "",
    history: [...ticket.history, { type: "answered", status: "answered", adminEmail: admin?.email || "", createdAt: now }],
  }), "support_replied");
  if (updated) sendSupportReplyEmail(updated);
  return updated;
}

function adminCloseSupportTicket(ticketId) {
  const now = isoNow();
  return updateSupportTicketAsAdmin(ticketId, (ticket) => ({
    ...ticket,
    status: "closed",
    closedAt: now,
    updatedAt: now,
    history: [...ticket.history, { type: "closed", status: "closed", adminEmail: currentAccount()?.email || "", createdAt: now }],
  }), "support_close");
}

function hasUnreadSupportReply(account = currentAccount()) {
  return loadCurrentUserSupportTickets(account).some((ticket) => ticket.repliedAt && (!ticket.userReadAt || new Date(ticket.userReadAt) < new Date(ticket.repliedAt)));
}

function markSupportRepliesSeen(account = currentAccount()) {
  if (!account?.id) return;
  const now = isoNow();
  const tickets = loadSupportTickets().map((ticket) => {
    if (ticket.userId !== account.id || !ticket.repliedAt) return ticket;
    if (ticket.userReadAt && new Date(ticket.userReadAt) >= new Date(ticket.repliedAt)) return ticket;
    return { ...ticket, userReadAt: now };
  });
  saveSupportTickets(tickets);
}

function adminPaymentLabel(payment) {
  const product = PIX_ONE_TIME_PRODUCTS[payment.productType];
  const planProducts = currentLanguage === "pt"
    ? { plan_pro: "Plano Pro", plan_premium: "Plano Premium" }
    : { plan_pro: "Pro plan", plan_premium: "Premium plan" };
  return payment.productName || product?.names?.[currentLanguage] || product?.names?.en || planProducts[payment.productType] || payment.productType || "-";
}

function adminSetFlash(message) {
  window.succeedoraAdminFlash = message;
}

function adminTakeFlash() {
  const message = window.succeedoraAdminFlash || "";
  window.succeedoraAdminFlash = "";
  return message;
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

function generatePixPayload({ amount, description, orderId, merchantName = paymentConfig.merchantName, merchantCity = paymentConfig.merchantCity, pixKey = paymentConfig.pixKey, pixKeyType = paymentConfig.pixKeyType }) {
  const txid = pixSafeText(orderId, 12).replace(/\s/g, "") || "***";
  const merchantAccount = emvField("00", "br.gov.bcb.pix") + emvField("01", pixPayloadKey(pixKey, pixKeyType));
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

function generatePixPaymentCode({ amount, productName = "", description = "", orderId = "", pixKey = paymentConfig.pixKey, pixKeyType = paymentConfig.pixKeyType, merchantName = paymentConfig.merchantName, merchantCity = paymentConfig.merchantCity }) {
  const pixPayload = generatePixPayload({
    amount,
    description: description || productName,
    orderId,
    merchantName,
    merchantCity,
    pixKey,
    pixKeyType,
  });
  return {
    pixPayload,
    qrCodeSvg: qrSvg(pixPayload),
  };
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
  let result = new Array(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;
  for (let i = 0; i < degree; i += 1) {
    for (let j = 0; j < result.length; j += 1) {
      result[j] = qrGfMul(result[j], root);
      if (j + 1 < result.length) result[j] ^= result[j + 1];
    }
    root = qrGfMul(root, 2);
  }
  return result;
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

function deleteAccount(accountId) {
  const accounts = loadAccounts();
  const nextAccounts = accounts.filter((account) => account.id !== accountId);
  return nextAccounts.length !== accounts.length && saveAccounts(nextAccounts);
}

function setSession(account, remember = true) {
  try {
    const sessionPayload = JSON.stringify({ userId: account.id, email: account.email, signedInAt: isoNow() });
    const primaryStorage = remember ? localStorage : sessionStorage;
    const secondaryStorage = remember ? sessionStorage : localStorage;
    primaryStorage.setItem(SESSION_STORAGE_KEY, sessionPayload);
    secondaryStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.setItem(AUTH_REMEMBER_STORAGE_KEY, remember ? "true" : "false");
    localStorage.setItem(AUTH_VERIFIED_STORAGE_KEY, account.emailVerified === false ? "false" : "true");
    if (remember) rememberAuthEmail(account.email);
    else forgetAuthCredentials();
    migrateLegacyDataToUser(account);
  } catch (error) {
    // Prototype auth state is local only.
  }
}

function signOut() {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
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
    plan: freePlanState(),
    status: "active",
    emailVerified: false,
    verificationCode: "",
    verificationCodeExpiresAt: "",
    verificationCodeSentAt: "",
    createdAt: isoNow(),
    manualPlanUpdatedAt: "",
    manualPlanUpdatedBy: "",
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

function generateVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function verificationExpired(account = currentAccount()) {
  const expiresAt = Date.parse(account?.verificationCodeExpiresAt || "");
  return !expiresAt || Date.now() > expiresAt;
}

function verificationResendSecondsLeft(account = currentAccount()) {
  const sentAt = Date.parse(account?.verificationCodeSentAt || "");
  if (!sentAt) return 0;
  return Math.max(0, Math.ceil((VERIFICATION_RESEND_COOLDOWN_MS - (Date.now() - sentAt)) / 1000));
}

function setAccountVerificationCode(accountId, code = generateVerificationCode()) {
  const now = Date.now();
  try {
    localStorage.setItem("succeedora.verifyAttempts", "0");
  } catch (error) {
    // Verification attempts are local UI state.
  }
  return updateAccount(accountId, (account) => ({
    ...account,
    emailVerified: false,
    verificationCode: code,
    verificationCodeExpiresAt: new Date(now + VERIFICATION_CODE_TTL_MS).toISOString(),
    verificationCodeSentAt: new Date(now).toISOString(),
  }));
}

async function sendVerificationEmail(account, code) {
  if (!account?.email || !/^\d{6}$/.test(code || "")) return { ok: false, reason: "invalid" };
  const controller = typeof AbortController === "undefined" ? null : new AbortController();
  const timeout = controller ? window.setTimeout(() => controller.abort(), VERIFICATION_EMAIL_TIMEOUT_MS) : null;
  try {
    const response = await fetch("/api/auth/send-verification-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller?.signal,
      body: JSON.stringify({
        email: account.email,
        name: account.profile?.fullName || account.email,
        code,
        language: currentLanguage,
      }),
    });
    const payload = await response.json().catch(() => ({}));
    return response.ok && payload.ok !== false ? { ok: true, id: payload.id || "" } : { ok: false, reason: payload.error || "send_failed" };
  } catch (error) {
    return { ok: false, reason: error?.name === "AbortError" ? "timeout" : "network" };
  } finally {
    if (timeout) window.clearTimeout(timeout);
  }
}

async function issueVerificationCode(account, { force = false } = {}) {
  const current = findAccountById(account?.id);
  if (!current) return { ok: false, reason: "missing_account" };
  if (!force && current.verificationCode && !verificationExpired(current)) return { ok: true, sent: false, account: current };
  if (force) {
    const secondsLeft = verificationResendSecondsLeft(current);
    if (secondsLeft > 0) return { ok: false, reason: "cooldown", secondsLeft };
  }
  const code = generateVerificationCode();
  const updated = setAccountVerificationCode(current.id, code);
  if (!updated) return { ok: false, reason: "storage" };
  const result = await sendVerificationEmail(updated, code);
  return result.ok ? { ok: true, sent: true, account: updated } : result;
}

function clearAccountVerification(accountId) {
  return updateAccount(accountId, (account) => ({
    ...account,
    emailVerified: true,
    verificationCode: "",
    verificationCodeExpiresAt: "",
    verificationCodeSentAt: "",
  }));
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
  const account = currentAccount();
  if (account) return account.emailVerified !== false;
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
    const account = currentAccount();
    if (account && value) clearAccountVerification(account.id);
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

function rememberAuthPassword(password) {
  try {
    localStorage.setItem(AUTH_PASSWORD_STORAGE_KEY, String(password || ""));
  } catch (error) {
    // Prototype auth state is local only.
  }
}

function forgetAuthEmail() {
  try {
    localStorage.removeItem(AUTH_EMAIL_STORAGE_KEY);
  } catch (error) {
    // Prototype auth state is local only.
  }
}

function forgetAuthPassword() {
  try {
    localStorage.removeItem(AUTH_PASSWORD_STORAGE_KEY);
  } catch (error) {
    // Prototype auth state is local only.
  }
}

function forgetAuthCredentials() {
  forgetAuthEmail();
  forgetAuthPassword();
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
    planState: freePlanState(),
    aiCredits: 0,
    creditHistory: [],
    adminEntitlements: [],
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
  const legacyType = legacyPlanType(raw);
  const planSource = legacyType !== "free" ? legacyType : (raw.planState || raw.plan || raw.currentPlan || "free");
  const planState = normalizePlanState(planSource);
  const plan = planState.type;
  const oneTime = { ...base.oneTime, ...(raw.oneTime && typeof raw.oneTime === "object" ? raw.oneTime : {}) };
  Object.keys(oneTime).forEach((key) => {
    oneTime[key] = Array.isArray(oneTime[key]) ? oneTime[key].map(String) : [];
  });
  const creditHistory = Array.isArray(raw.creditHistory) ? raw.creditHistory.map((item) => ({
    amount: Number(item.amount || 0),
    reason: String(item.reason || ""),
    adminEmail: normalizeEmail(item.adminEmail || ""),
    createdAt: item.createdAt || isoNow(),
  })) : [];
  const adminEntitlements = Array.isArray(raw.adminEntitlements) ? raw.adminEntitlements.map((item) => ({
    productType: String(item.productType || ""),
    targetId: String(item.targetId || ""),
    paymentId: String(item.paymentId || ""),
    grantedBy: normalizeEmail(item.grantedBy || ""),
    grantedAt: item.grantedAt || isoNow(),
  })) : [];
  return {
    plan,
    planState,
    aiCredits: Math.max(0, Number(raw.aiCredits) || 0),
    creditHistory,
    adminEntitlements,
    oneTime,
  };
}

function getUserAccess() {
  try {
    const account = currentAccount();
    const stored = normalizeAccessState(JSON.parse(localStorage.getItem(userScopedStorageKey(ACCESS_STORAGE_KEY, account)) || "{}"));
    const effectivePlan = getEffectivePlan(account, { access: stored, persist: true });
    const access = { ...stored, plan: effectivePlan.type, planState: effectivePlan };
    const savedPlan = normalizePlanState(stored.planState || stored.plan);
    if (account?.id && (savedPlan.type !== effectivePlan.type || savedPlan.expiresAt !== effectivePlan.expiresAt || savedPlan.status !== effectivePlan.status)) {
      saveUserAccess(account, access);
    }
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
  const values = (access.oneTime?.[type] || []).map(String);
  return values.includes(String(id)) || values.includes("__global__");
}

function accessPlanLabel(access = getUserAccess()) {
  const copy = t().dashboard;
  if (access.plan === "premium") return copy.premium;
  if (access.plan === "pro") return copy.pro;
  return copy.free;
}

function accessPlanExpiryLabel(access = getUserAccess()) {
  return access.plan === "free" ? "" : formatPlanExpiry(access.planState?.expiresAt);
}

function currentResumeAccessId() {
  return builderDraft?.id || currentBuilderResumeId || "";
}

const FEATURE_RULES = {
  unlimited_resumes: { plan: "pro" },
  premium_templates: { plan: "pro", oneTime: "premiumTemplates", productType: "premium_template", target: "templateKey" },
  premium_template_library: { plan: "premium", oneTime: "premiumTemplates", productType: "premium_template", target: "templateKey" },
  watermark_free_pdf: { plan: "pro", oneTime: ["watermarkRemoval", "premiumPdf", "careerPack"], productType: "remove_watermark", target: "resumeId" },
  cover_letters_unlimited: { plan: "pro" },
  ai_resume_improvement: { plan: "pro", credits: true, productType: "ai_credits" },
  ai_cover_letter: { plan: "pro", credits: true, productType: "ai_credits" },
  ats_basic: { plan: "free" },
  ats_advanced: { plan: "premium" },
  resume_translation: { plan: "pro", credits: true, productType: "ai_credits" },
  job_tailoring: { plan: "premium" },
  online_resume_link: { plan: "premium", oneTime: ["onlineLinks", "careerPack"], productType: "online_resume_link", target: "resumeId" },
  premium_pdf: { plan: "pro", oneTime: ["premiumPdf", "careerPack"], productType: "premium_pdf", target: "resumeId" },
  remove_watermark: { plan: "pro", oneTime: ["watermarkRemoval", "premiumPdf", "careerPack"], productType: "remove_watermark", target: "resumeId" },
  ai_credits: { credits: true, productType: "ai_credits" },
  basic_edit: { plan: "free" },
  branded_export: { plan: "free" },
  preview: { plan: "free" },
};

const LEGACY_FEATURE_KEYS = {
  "brand-free-export": "watermark_free_pdf",
  "cover-letter": "ai_cover_letter",
  "translation": "resume_translation",
  "basic-ats": "ats_basic",
  "job-suggestions": "ai_resume_improvement",
  "ats-analysis": "ats_advanced",
  "job-tailoring": "job_tailoring",
  "advanced-career": "ats_advanced",
  "online-link": "online_resume_link",
  "free-template": "preview",
  "branded-export": "branded_export",
  "basic-edit": "basic_edit",
};

function normalizeFeatureKey(featureKey = "") {
  return LEGACY_FEATURE_KEYS[featureKey] || featureKey;
}

function planRank(plan = "free") {
  return { free: 0, pro: 1, premium: 2 }[plan] ?? 0;
}

function featureTargetId(rule = {}, context = {}) {
  if (rule.target === "templateKey") return context.templateKey || context.id || "";
  return context.resumeId || context.id || currentResumeAccessId();
}

function hasFeatureOneTime(rule = {}, context = {}, access = getUserAccess()) {
  const types = Array.isArray(rule.oneTime) ? rule.oneTime : (rule.oneTime ? [rule.oneTime] : []);
  if (!types.length) return false;
  const targetId = featureTargetId(rule, context);
  return types.some((type) => hasOneTime(type, targetId, access));
}

function canExportWithoutBranding(resumeId = currentResumeAccessId(), access = getUserAccess()) {
  return canUseFeature("watermark_free_pdf", { resumeId, access });
}

function canUseTemplate(templateKey, access = getUserAccess()) {
  const template = getTemplateByKey(templateKey);
  if (!template || !isTemplateActive(template)) return false;
  if (template.access === "free") return true;
  if (isAdminAccount()) return true;
  if (hasOneTime("premiumTemplates", templateKey, access)) return true;
  if (template.access === "premium") return planRank(access.plan) >= planRank("premium");
  return planRank(access.plan) >= planRank("pro");
}

function templateAccessLabel(template = {}) {
  const copy = t().dashboard;
  if (template.access === "premium") return copy.premium || "Premium";
  if (template.access === "pro") return copy.pro || "Pro";
  return copy.free || "Free";
}

function templateAccessClass(template = {}) {
  return template.access === "premium" ? "premium" : template.access === "free" ? "free" : "pro";
}

function templateLockFeature(template = {}) {
  return template.access === "premium" ? "premium_template_library" : "premium_templates";
}

function availableTemplateKey(preferred = selectedTemplateKey) {
  if (canUseTemplate(preferred)) return preferred;
  return resumeTemplates().find((template) => template.access === "free" && canUseTemplate(template.key))?.key || "simple-ats";
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

function canUseFeature(featureKey, context = {}, maybeAccess) {
  const normalized = normalizeFeatureKey(featureKey);
  if (typeof context === "string") context = { resumeId: context };
  const access = maybeAccess || context.access || getUserAccess();
  const rule = FEATURE_RULES[normalized];
  if (!rule) return false;
  if (isAdminAccount()) return true;
  if (rule.plan && planRank(access.plan) >= planRank(rule.plan)) return true;
  if (hasFeatureOneTime(rule, context, access)) return true;
  if (rule.credits && Number(access.aiCredits || 0) > 0) return true;
  return false;
}

function featureAccessCopy() {
  return currentLanguage === "pt" ? {
    pro: "Pro",
    premium: "Premium",
    oneTime: "Compra única",
    aiCredits: "Créditos de IA",
    locked: "Bloqueado",
    availablePro: "Disponível no Pro",
    availablePremium: "Disponível no Premium",
    availableOneTime: "Disponível como compra única",
    requiresCredits: "Requer créditos de IA",
    unlockTitle: "Desbloqueie este recurso",
    unlockText: "Este recurso está disponível no plano Pro, Premium ou como compra avulsa, dependendo da opção escolhida.",
    viewPlans: "Ver planos",
    buyOneTime: "Comprar opção avulsa",
    buyCredits: "Comprar créditos",
    continueFree: "Continuar grátis",
    benefitsTitle: "O que você desbloqueia",
    resumeLimitText: "Seu plano gratuito permite criar 1 currículo. Faça upgrade para criar mais versões.",
    watermarkText: "PDF sem marca está disponível no Pro ou como compra única.",
    templateText: "Este modelo está disponível no Pro ou como compra única.",
    premiumTemplateText: "Este modelo Premium está disponível no Premium ou como compra única.",
    aiCreditsText: "Você precisa de créditos de IA para usar esta ação.",
    aiFeatureText: "Este recurso está disponível no Pro, Premium ou com créditos de IA.",
    atsPremiumText: "Análise ATS avançada está disponível no Premium.",
    coverLetterText: "Cartas adicionais estão disponíveis no Pro.",
    featureNames: {
      unlimited_resumes: "Currículos ilimitados",
      premium_templates: "Modelo premium",
      premium_template_library: "Modelo Premium",
      watermark_free_pdf: "PDF sem marca",
      cover_letters_unlimited: "Cartas de apresentação",
      ai_resume_improvement: "Melhorias com IA",
      ai_cover_letter: "Carta com IA",
      ats_advanced: "Análise ATS avançada",
      resume_translation: "Tradução de currículo",
      job_tailoring: "Adaptação para vaga",
      online_resume_link: "Link online do currículo",
      premium_pdf: "PDF premium",
      remove_watermark: "Remover marca d'água",
      ai_credits: "Créditos de IA",
    },
  } : {
    pro: "Pro",
    premium: "Premium",
    oneTime: "One-time",
    aiCredits: "AI credits",
    locked: "Locked",
    availablePro: "Available with Pro",
    availablePremium: "Available with Premium",
    availableOneTime: "Available as one-time purchase",
    requiresCredits: "Requires AI credits",
    unlockTitle: "Unlock this feature",
    unlockText: "This feature is available with Pro, Premium or as a one-time purchase, depending on the option selected.",
    viewPlans: "View plans",
    buyOneTime: "Buy one-time option",
    buyCredits: "Buy credits",
    continueFree: "Continue free",
    benefitsTitle: "What you unlock",
    resumeLimitText: "Your free plan allows 1 resume. Upgrade to create more versions.",
    watermarkText: "Watermark-free PDF is available with Pro or as a one-time purchase.",
    templateText: "This template is available with Pro or as a one-time purchase.",
    premiumTemplateText: "This Premium template is available with Premium or as a one-time purchase.",
    aiCreditsText: "You need AI credits to use this action.",
    aiFeatureText: "This feature is available with Pro, Premium or AI credits.",
    atsPremiumText: "Advanced ATS analysis is available with Premium.",
    coverLetterText: "Additional cover letters are available with Pro.",
    featureNames: {
      unlimited_resumes: "Unlimited resumes",
      premium_templates: "Premium template",
      premium_template_library: "Premium template",
      watermark_free_pdf: "Watermark-free PDF",
      cover_letters_unlimited: "Cover letters",
      ai_resume_improvement: "AI improvements",
      ai_cover_letter: "AI cover letter",
      ats_advanced: "Advanced ATS analysis",
      resume_translation: "Resume translation",
      job_tailoring: "Job tailoring",
      online_resume_link: "Online resume link",
      premium_pdf: "Premium PDF",
      remove_watermark: "Remove watermark",
      ai_credits: "AI credits",
    },
  };
}

function featureRule(featureKey) {
  return FEATURE_RULES[normalizeFeatureKey(featureKey)] || {};
}

function featureRequirementLabel(featureKey) {
  const copy = featureAccessCopy();
  const rule = featureRule(featureKey);
  if (rule.credits && !rule.plan) return copy.requiresCredits;
  if (rule.plan === "premium") return copy.availablePremium;
  if (rule.plan === "pro") return copy.availablePro;
  if (rule.oneTime) return copy.availableOneTime;
  return copy.locked;
}

function lockedBadge(featureKey, extraClass = "") {
  return `<span class="locked-badge ${extraClass}">${icon("lock")} ${escapeHtml(featureRequirementLabel(featureKey))}</span>`;
}

function lockChip(label = featureAccessCopy().locked) {
  return `<span class="feature-lock">${icon("lock")} ${escapeHtml(label)}</span>`;
}

function featureModalText(featureKey) {
  const copy = featureAccessCopy();
  const normalized = normalizeFeatureKey(featureKey);
  if (normalized === "unlimited_resumes") return copy.resumeLimitText;
  if (normalized === "watermark_free_pdf" || normalized === "premium_pdf" || normalized === "remove_watermark") return copy.watermarkText;
  if (normalized === "premium_templates") return copy.templateText;
  if (normalized === "premium_template_library") return copy.premiumTemplateText;
  if (normalized === "ai_credits") return copy.aiCreditsText;
  if (normalized.startsWith("ai_") || normalized === "resume_translation") return copy.aiFeatureText;
  if (normalized === "ats_advanced" || normalized === "job_tailoring") return copy.atsPremiumText;
  if (normalized === "cover_letters_unlimited") return copy.coverLetterText;
  return copy.unlockText;
}

function featureBenefits(featureKey) {
  const copy = currentLanguage === "pt"
    ? {
        premium_templates: ["Modelos mais sofisticados", "Visual mais profissional", "Mais opções para vagas internacionais"],
        premium_template_library: ["Layouts Premium exclusivos", "Estrutura mais sofisticada", "Maior valor visual para candidaturas importantes"],
        watermark_free_pdf: ["PDF sem marca da Succeedora", "Arquivo mais profissional", "Opção de upgrade ou compra única"],
        premium_pdf: ["PDF sem marca da Succeedora", "Arquivo mais profissional", "Opção de upgrade ou compra única"],
        remove_watermark: ["PDF sem marca da Succeedora", "Arquivo mais profissional", "Opção de upgrade ou compra única"],
        unlimited_resumes: ["Crie versões para diferentes vagas", "Organize mais candidaturas", "Mantenha históricos separados"],
        ai_credits: ["Use ações inteligentes sob demanda", "Gere textos e sugestões", "Compre créditos sem assinatura"],
        ai_resume_improvement: ["Melhore resumo e experiências", "Receba sugestões mais fortes", "Otimize seu perfil"],
        ai_cover_letter: ["Gere cartas para vagas", "Use seu perfil como base", "Economize tempo na candidatura"],
        resume_translation: ["Traduza seu currículo", "Prepare versões internacionais", "Mantenha consistência de linguagem"],
        job_tailoring: ["Adapte para a descrição da vaga", "Priorize palavras-chave", "Aumente alinhamento com recrutadores"],
        ats_advanced: ["Análise mais detalhada", "Sugestões avançadas", "Comparação melhor com a vaga"],
        cover_letters_unlimited: ["Crie cartas para várias vagas", "Salve versões diferentes", "Use o gerador com IA"],
        online_resume_link: ["Compartilhe um link profissional", "Facilite acesso ao perfil", "Use em candidaturas online"],
      }
    : {
        premium_templates: ["More polished templates", "More professional presentation", "More options for global roles"],
        premium_template_library: ["Exclusive Premium layouts", "More sophisticated structure", "Higher visual value for important applications"],
        watermark_free_pdf: ["PDF without Succeedora branding", "More professional file", "Upgrade or one-time unlock"],
        premium_pdf: ["PDF without Succeedora branding", "More professional file", "Upgrade or one-time unlock"],
        remove_watermark: ["PDF without Succeedora branding", "More professional file", "Upgrade or one-time unlock"],
        unlimited_resumes: ["Create versions for different roles", "Organize more applications", "Keep separate histories"],
        ai_credits: ["Use smart actions on demand", "Generate text and suggestions", "Buy credits without a subscription"],
        ai_resume_improvement: ["Improve summaries and experience", "Get stronger suggestions", "Optimize your profile"],
        ai_cover_letter: ["Generate letters for roles", "Use your profile as context", "Save time applying"],
        resume_translation: ["Translate your resume", "Prepare international versions", "Keep language consistent"],
        job_tailoring: ["Tailor to the job description", "Prioritize keywords", "Improve recruiter alignment"],
        ats_advanced: ["More detailed analysis", "Advanced suggestions", "Better job comparison"],
        cover_letters_unlimited: ["Create letters for multiple roles", "Save different versions", "Use AI generation"],
        online_resume_link: ["Share a professional link", "Make your profile easier to access", "Use it in online applications"],
      };
  const normalized = normalizeFeatureKey(featureKey);
  return copy[normalized] || copy.ai_credits;
}

function openFeatureLockModal(featureKey, context = {}) {
  const copy = featureAccessCopy();
  const normalized = normalizeFeatureKey(featureKey);
  const rule = featureRule(normalized);
  const featureName = context.featureName || copy.featureNames[normalized] || copy.locked;
  const actions = [];
  actions.push({ label: copy.viewPlans, onClick: () => setRoute("/dashboard/billing") });
  if (rule.productType && rule.productType !== "ai_credits") {
    actions.push({ label: copy.buyOneTime, className: "secondary-button", onClick: () => openPixPaymentModal(rule.productType, context) });
  }
  if (rule.productType === "ai_credits" || rule.credits) {
    actions.push({ label: copy.buyCredits, className: "secondary-button", onClick: () => openPixPaymentModal("ai_credits", context) });
  }
  actions.push({ label: copy.continueFree, className: "ghost-button" });
  const modernTemplateLockText = ["modern", "executive"].includes(context.templateKey) && normalized === "premium_templates"
    ? (currentLanguage === "pt" ? "Este modelo está disponível no plano Pro." : "This template is available with the Pro plan.")
    : "";
  openAccessModal({
    title: copy.unlockTitle,
    text: modernTemplateLockText || featureModalText(normalized),
    featureName,
    requirement: featureRequirementLabel(normalized),
    benefits: featureBenefits(normalized),
    detail: null,
    actions,
  });
}

function adminFindAccount(userId) {
  return loadAccounts().find((account) => account.id === userId) || null;
}

function adminUpdatePlan(userId, planType, options = {}) {
  const plan = normalizePlanType(planType);
  if (!isAdminAccount() || !PLAN_TYPES.includes(plan)) return false;
  const admin = currentAccount();
  const account = adminFindAccount(userId);
  if (!account) return false;
  const oldPlanState = normalizePlanState(account.plan);
  const duration = options.duration || "none";
  const now = isoNow();
  const expiresAt = plan === "free" ? null : planExpiresAtForDuration(duration, options.customDate || "");
  const nextPlanState = plan === "free" ? freePlanState("admin") : {
    type: plan,
    status: "active",
    startedAt: now,
    expiresAt,
    updatedAt: now,
    source: "admin",
    durationLabel: planDurationOptions().find(([value]) => value === duration)?.[1] || "",
  };
  updateAccount(userId, (current) => ({
    ...current,
    plan: nextPlanState,
    manualPlanUpdatedAt: now,
    manualPlanUpdatedBy: admin.email,
  }));
  const access = loadUserAccess(account);
  saveUserAccess(account, { ...access, plan, planState: nextPlanState });
  saveAdminAuditLog({
    action: "plan_changed",
    targetUserEmail: account.email,
    oldValue: oldPlanState.type,
    newValue: plan,
    oldPlan: oldPlanState.type,
    newPlan: plan,
    oldExpiresAt: oldPlanState.expiresAt || "",
    newExpiresAt: nextPlanState.expiresAt || "",
    reason: options.reason || "",
  });
  adminSetFlash(t().admin.messages.planUpdated);
  return true;
}

function adminUpdateCredits(userId, amount, reason = "") {
  if (!isAdminAccount()) return false;
  const account = adminFindAccount(userId);
  const admin = currentAccount();
  const delta = Number(amount) || 0;
  if (!account || delta === 0) return false;
  const access = loadUserAccess(account);
  const nextCredits = Math.max(0, Number(access.aiCredits || 0) + delta);
  const history = [...(access.creditHistory || []), { amount: delta, reason, adminEmail: admin.email, createdAt: isoNow() }];
  saveUserAccess(account, { ...access, aiCredits: nextCredits, creditHistory: history });
  saveAdminAuditLog({ action: delta > 0 ? "credits_added" : "credits_removed", targetUserEmail: account.email, oldValue: access.aiCredits, newValue: nextCredits, reason });
  adminSetFlash(delta > 0 ? t().admin.messages.creditsAdded : t().admin.messages.creditsRemoved);
  return true;
}

function adminSetUserStatus(userId, status) {
  if (!isAdminAccount() || !["active", "blocked"].includes(status)) return false;
  const account = adminFindAccount(userId);
  if (!account) return false;
  updateAccount(userId, (current) => ({ ...current, status }));
  saveAdminAuditLog({ action: status === "blocked" ? "user_blocked" : "user_unblocked", targetUserEmail: account.email, oldValue: account.status, newValue: status });
  adminSetFlash(status === "blocked" ? t().admin.messages.userBlocked : t().admin.messages.userUnblocked);
  return true;
}

function adminPaymentCredits(payment) {
  return Math.max(1, Number(payment.creditAmount || 0) || 10);
}

function adminAddUnique(list = [], value) {
  const text = String(value || "");
  return text && !list.map(String).includes(text) ? [...list, text] : list;
}

function adminGrantPaymentFeature(account, payment) {
  if (!account) return;
  const admin = currentAccount();
  const access = loadUserAccess(account);
  const targetId = payment.resumeId || payment.templateKey || "__global__";
  const oneTime = { ...access.oneTime };
  let nextAccess = { ...access, oneTime };
  if (payment.productType === "remove_watermark") oneTime.watermarkRemoval = adminAddUnique(oneTime.watermarkRemoval, targetId);
  if (payment.productType === "premium_pdf") oneTime.premiumPdf = adminAddUnique(oneTime.premiumPdf, targetId);
  if (payment.productType === "premium_template") oneTime.premiumTemplates = adminAddUnique(oneTime.premiumTemplates, targetId);
  if (payment.productType === "career_pack") oneTime.careerPack = adminAddUnique(oneTime.careerPack, targetId);
  if (payment.productType === "online_resume_link") oneTime.onlineLinks = adminAddUnique(oneTime.onlineLinks, targetId);
  if (AI_CREDIT_PRODUCT_TYPES.includes(payment.productType)) {
    const credits = adminPaymentCredits(payment);
    nextAccess = {
      ...nextAccess,
      aiCredits: Math.max(0, Number(nextAccess.aiCredits || 0) + credits),
      creditHistory: [...(nextAccess.creditHistory || []), { amount: credits, reason: payment.id, adminEmail: admin.email, createdAt: isoNow() }],
    };
  }
  if (payment.productType === "plan_pro" || payment.productType === "plan_premium") {
    const plan = payment.productType === "plan_premium" ? "premium" : "pro";
    const startedAt = isoNow();
    let expiresAt = payment.planExpiresAt || null;
    if (!expiresAt && payment.planDurationDays) {
      const date = new Date();
      date.setDate(date.getDate() + Number(payment.planDurationDays));
      expiresAt = date.toISOString();
    }
    const planState = {
      type: plan,
      status: "active",
      startedAt,
      expiresAt,
      updatedAt: startedAt,
      source: "pix",
      durationLabel: payment.planDurationDays ? `${payment.planDurationDays} days` : "",
    };
    updateAccount(account.id, (current) => ({ ...current, plan: planState, manualPlanUpdatedAt: planState.updatedAt, manualPlanUpdatedBy: admin.email }));
    nextAccess.plan = plan;
    nextAccess.planState = planState;
  }
  nextAccess.adminEntitlements = [
    ...(nextAccess.adminEntitlements || []),
    { productType: payment.productType, targetId, paymentId: payment.id, grantedBy: admin.email, grantedAt: isoNow() },
  ];
  saveUserAccess(account, nextAccess);
}

function adminUpdatePayment(userId, paymentId, updater) {
  const account = adminFindAccount(userId);
  if (!account) return null;
  const requests = loadUserPayments(account);
  const index = requests.findIndex((payment) => payment.id === paymentId);
  if (index < 0) return null;
  const previous = requests[index];
  const updated = normalizePaymentRequest(updater(previous));
  requests[index] = updated;
  saveUserPayments(account, requests);
  return { account, payment: updated, previous };
}

function adminApprovePayment(userId, paymentId) {
  if (!isAdminAccount()) return false;
  const admin = currentAccount();
  const account = adminFindAccount(userId);
  const existing = account ? loadUserPayments(account).find((payment) => payment.id === paymentId) : null;
  if (!account || !isPendingAdminPayment(existing)) return false;
  const result = adminUpdatePayment(userId, paymentId, (payment) => ({ ...payment, status: "approved", paymentStatus: "approved", approvedAt: isoNow(), approvedBy: admin.email }));
  if (!result) return false;
  adminGrantPaymentFeature(result.account, result.payment);
  saveAdminAuditLog({ action: "payment_approved", targetUserEmail: result.account.email, paymentId, oldValue: result.previous.status, newValue: "approved" });
  adminSetFlash(t().admin.messages.paymentApproved);
  return true;
}

function adminRejectPayment(userId, paymentId, reason = "") {
  if (!isAdminAccount()) return false;
  const admin = currentAccount();
  const account = adminFindAccount(userId);
  const existing = account ? loadUserPayments(account).find((payment) => payment.id === paymentId) : null;
  if (!account || !isPendingAdminPayment(existing)) return false;
  const rejectionReason = String(reason || t().admin.rejectReasons?.[0] || "Payment rejected").trim();
  const result = adminUpdatePayment(userId, paymentId, (payment) => ({ ...payment, status: "rejected", paymentStatus: "rejected", rejectedAt: isoNow(), rejectedBy: admin.email, rejectionReason }));
  if (!result) return false;
  saveAdminAuditLog({ action: "payment_rejected", targetUserEmail: result.account.email, paymentId, oldValue: result.previous.status, newValue: rejectionReason, reason: rejectionReason });
  adminSetFlash(t().admin.messages.paymentRejected);
  return true;
}

function requiresAiCredits(action = "ai") {
  const access = getUserAccess();
  return !isPaidPlan(access) && access.aiCredits <= 0 && ["improve-summary", "rewrite-experience", "cover-letter", "translation", "job-tailoring", "job-analysis", "ats-keywords"].includes(action);
}

function aiActionFeature(action = "ai") {
  const map = {
    "improve-summary": "ai_resume_improvement",
    "rewrite-experience": "ai_resume_improvement",
    "cover-letter": "ai_cover_letter",
    translation: "resume_translation",
    "job-tailoring": "job_tailoring",
    "job-analysis": "ats_advanced",
    "ats-keywords": "ats_advanced",
    ai: "ai_resume_improvement",
  };
  return map[action] || "ai_resume_improvement";
}

function aiTaskFeature(taskType = "ai") {
  const map = {
    generate_professional_summary: "ai_resume_improvement",
    improve_professional_summary: "ai_resume_improvement",
    rewrite_experience: "ai_resume_improvement",
    suggest_skills: "ai_resume_improvement",
    improve_project_description: "ai_resume_improvement",
    generate_cover_letter: "ai_cover_letter",
    improve_cover_letter: "ai_cover_letter",
    tailor_cover_letter_to_job: "ai_cover_letter",
    formal_cover_letter: "ai_cover_letter",
    direct_cover_letter: "ai_cover_letter",
    confident_cover_letter: "ai_cover_letter",
    translate_resume: "resume_translation",
    analyze_resume_ats: "ats_advanced",
    analyze_job_description: "ats_advanced",
    ats_keyword_suggestions: "ats_advanced",
    suggest_ats_keywords: "ats_advanced",
    tailor_resume_to_job: "job_tailoring",
    recommend_resume_template: "ai_resume_improvement",
    assistant_chat: "ai_resume_improvement",
  };
  return map[taskType] || "ai_resume_improvement";
}

function aiCopy() {
  return currentLanguage === "pt" ? {
    generateSummary: "Gerar com IA",
    improveSummary: "Melhorar com IA",
    improveExperience: "Melhorar descrição com IA",
    suggestSkills: "Sugerir habilidades",
    improveProject: "Melhorar projetos",
    generateLetter: "Gerar carta com IA",
    improveLetter: "Melhorar carta",
    tailorLetter: "Adaptar para vaga",
    formalLetter: "Mais formal",
    directLetter: "Mais direta",
    confidentLetter: "Mais confiante",
    translateResume: "Traduzir currículo",
    tailorJob: "Adaptar para esta vaga",
    generating: "Gerando com IA...",
    analyzing: "Analisando vaga...",
    improving: "Melhorando texto...",
    translating: "Traduzindo currÃ­culo...",
    suggesting: "Sugerindo habilidades...",
    fallbackError: "Não foi possível gerar a resposta agora. Tente novamente em instantes.",
    noCredits: "Você não tem créditos de IA suficientes para esta ação.",
    apply: "Aplicar",
    discard: "Descartar",
    editBeforeApply: "Revise e edite antes de aplicar.",
    suggestionTitle: "Sugestão da IA",
    atsDisclaimer: "A nota ATS é uma estimativa baseada no conteúdo do currículo e na descrição da vaga.",
    creditsUsed: "Créditos usados",
    usageHistory: "Histórico de uso de IA",
    action: "Ação",
  } : {
    generateSummary: "Generate with AI",
    improveSummary: "Improve with AI",
    improveExperience: "Improve description with AI",
    suggestSkills: "Suggest skills",
    improveProject: "Improve projects",
    generateLetter: "Generate letter with AI",
    improveLetter: "Improve letter",
    tailorLetter: "Tailor to job",
    formalLetter: "More formal",
    directLetter: "More direct",
    confidentLetter: "More confident",
    translateResume: "Translate resume",
    tailorJob: "Tailor to this job",
    generating: "Generating with AI...",
    analyzing: "Analyzing job...",
    improving: "Improving text...",
    translating: "Translating resume...",
    suggesting: "Suggesting skills...",
    fallbackError: "Could not generate the response right now. Please try again shortly.",
    noCredits: "You do not have enough AI credits for this action.",
    apply: "Apply",
    discard: "Discard",
    editBeforeApply: "Review and edit before applying.",
    suggestionTitle: "AI suggestion",
    atsDisclaimer: "The ATS score is an estimate based on the resume content and job description.",
    creditsUsed: "Credits used",
    usageHistory: "AI usage history",
    action: "Action",
  };
}

function aiErrorMessage(error) {
  const code = typeof error === "string" ? error : error?.message || "";
  const messages = currentLanguage === "pt" ? {
    missing_openai_api_key: "IA sem chave configurada. Adicione OPENAI_API_KEY nas variáveis de ambiente da Vercel e faça um novo deploy.",
    openai_error: "A OpenAI recusou a chamada. Verifique se a chave, o modelo OPENAI_MODEL e a cobrança da conta estão ativos.",
    ai_generation_failed: "A IA não respondeu agora. Verifique se o endpoint /api/ai/generate está publicado e tente novamente.",
    unsupported_task: "Esta ação de IA ainda não está suportada pelo backend.",
    unsafe_input: "O texto enviado parece conter instruções inseguras. Remova comandos como ignorar regras ou revelar prompts e tente novamente.",
    payload_too_large: "O texto enviado é grande demais para esta ação. Reduza o conteúdo e tente novamente.",
    rate_limited: "Muitas chamadas de IA em pouco tempo. Aguarde um minuto e tente novamente.",
    insufficient_credits: aiCopy().noCredits,
    network_error: "Não foi possível conectar ao endpoint de IA. Abra pelo domínio publicado ou rode com as funções da Vercel, não apenas pelo arquivo HTML.",
  } : {
    missing_openai_api_key: "AI key is not configured. Add OPENAI_API_KEY to Vercel environment variables and redeploy.",
    openai_error: "OpenAI rejected the request. Check your API key, OPENAI_MODEL, and account billing.",
    ai_generation_failed: "AI did not respond right now. Check that /api/ai/generate is deployed and try again.",
    unsupported_task: "This AI action is not supported by the backend yet.",
    unsafe_input: "The submitted text appears to contain unsafe instructions. Remove commands like ignoring rules or revealing prompts and try again.",
    payload_too_large: "The submitted text is too large for this action. Shorten it and try again.",
    rate_limited: "Too many AI requests in a short time. Wait a minute and try again.",
    insufficient_credits: aiCopy().noCredits,
    network_error: "Could not connect to the AI endpoint. Open the deployed domain or run with Vercel functions, not just the HTML file.",
  };
  return messages[code] || aiCopy().fallbackError;
}

function aiTaskCredits(taskType) {
  return AI_TASK_CREDITS[taskType] || 1;
}

function canUseAiTask(taskType) {
  if (isAdminAccount()) return true;
  const access = getUserAccess();
  const featureKey = aiTaskFeature(taskType);
  const rule = featureRule(featureKey);
  if (rule.plan && planRank(access.plan) >= planRank(rule.plan)) return true;
  if (hasFeatureOneTime(rule, {}, access)) return true;
  if (featureKey === "ats_advanced" || featureKey === "job_tailoring") return false;
  return Boolean(rule.credits) && Number(access.aiCredits || 0) >= aiTaskCredits(taskType);
}

function consumeAiCredits(taskType) {
  if (isAdminAccount()) return 0;
  const account = currentAccount();
  const credits = aiTaskCredits(taskType);
  const access = getUserAccess();
  if (isPaidPlan(access)) return 0;
  saveUserAccess(account, { ...access, aiCredits: Math.max(0, Number(access.aiCredits || 0) - credits) });
  return credits;
}

function loadAiUsageLog() {
  const records = readJsonStorage(AI_USAGE_STORAGE_KEY, []);
  return Array.isArray(records) ? records : [];
}

function recordAiUsage(taskType, creditsUsed = aiTaskCredits(taskType), status = "success", error = "") {
  const account = currentAccount();
  const records = loadAiUsageLog();
  records.unshift({
    id: `ai_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    userId: account?.id || "",
    email: normalizeEmail(account?.email || ""),
    taskType,
    creditsUsed: Number(creditsUsed || 0),
    status,
    error: String(error || "").slice(0, 160),
    createdAt: isoNow(),
  });
  writeJsonStorage(AI_USAGE_STORAGE_KEY, records.slice(0, 500));
}

async function requestAiGeneration(taskType, data = {}) {
  if (!canUseAiTask(taskType)) {
    openFeatureLockModal(aiTaskFeature(taskType));
    throw new Error("insufficient_credits");
  }
  let response;
  try {
    response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskType,
        language: currentLanguage,
        data,
        user: {
          id: currentAccount()?.id || "",
          email: normalizeEmail(currentAccount()?.email || ""),
        },
      }),
    });
  } catch (error) {
    recordAiUsage(taskType, 0, "error", "network_error");
    throw new Error("network_error");
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || !payload.success) {
    recordAiUsage(taskType, 0, "error", payload.error || "ai_generation_failed");
    throw new Error(payload.error || "ai_generation_failed");
  }
  const used = consumeAiCredits(taskType);
  recordAiUsage(taskType, used || aiTaskCredits(taskType), "success");
  return payload.result || {};
}

function setButtonLoading(button, label) {
  if (!button) return () => {};
  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `${icon("sparkles")} ${escapeHtml(label)}`;
  return () => {
    button.disabled = false;
    button.innerHTML = original;
  };
}

function openAiSuggestionModal({ title = aiCopy().suggestionTitle, text = "", onApply }) {
  const copy = aiCopy();
  document.querySelectorAll(".ai-suggestion-modal").forEach((modal) => modal.remove());
  const modal = document.createElement("div");
  modal.className = "template-preview-modal ai-suggestion-modal";
  modal.innerHTML = `
    <section class="template-preview-dialog ai-suggestion-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <header class="template-preview-header">
        <div><span class="eyebrow">Succeedora AI</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy.editBeforeApply)}</p></div>
        <button class="icon-button" type="button" data-ai-suggestion-close aria-label="${escapeHtml(copy.discard)}">${icon("close")}</button>
      </header>
      <div class="template-preview-content">
        <textarea class="ai-suggestion-textarea" data-ai-suggestion-text>${escapeHtml(text)}</textarea>
      </div>
      <footer class="template-preview-footer">
        <button class="secondary-button" type="button" data-ai-suggestion-close>${escapeHtml(copy.discard)}</button>
        <button class="primary-button" type="button" data-ai-suggestion-apply>${escapeHtml(copy.apply)}</button>
      </footer>
    </section>
  `;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-ai-suggestion-close]")) close();
    if (event.target.closest("[data-ai-suggestion-apply]")) {
      const value = modal.querySelector("[data-ai-suggestion-text]")?.value || "";
      if (typeof onApply === "function") onApply(value);
      close();
    }
  });
}

function showAiInlineMessage(message, type = "error") {
  const existing = document.querySelector("[data-ai-inline-message]");
  if (existing) {
    existing.textContent = message;
    existing.hidden = false;
    return;
  }
  const target = document.querySelector(".builder-form") || document.querySelector("[data-letter-builder]") || document.querySelector(".ai-input-panel");
  if (!target) return;
  const note = document.createElement("p");
  note.className = type === "error" ? "auth-error" : "settings-message";
  note.setAttribute("data-ai-inline-message", "");
  note.textContent = message;
  target.prepend(note);
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
    if (account.status === "blocked") return a.errors.login;
    return "";
  }
  if (mode === "forgot") return "";
  if (mode === "signup") {
    if (findAccountByEmail(email)) return a.errors.duplicate;
    if (!validName(form.fullName?.value)) return a.errors.name;
    if (!strongPassword(form.password?.value)) return a.errors.password;
    if (form.password?.value !== form.confirmPassword?.value) return a.errors.confirm;
    if (!form.acceptLegal?.checked) return a.errors.legal;
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
  if (purpose === "verify") {
    const account = currentAccount();
    return Boolean(account?.verificationCode) && account.verificationCode === input;
  }
  try {
    return localStorage.getItem(`succeedora.${purpose}Code`) === input;
  } catch (error) {
    return false;
  }
}

function codeStillValid(purpose) {
  if (purpose === "verify") {
    const account = currentAccount();
    return Boolean(account?.verificationCode) && !verificationExpired(account);
  }
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
  if (PRIVATE_ROUTES.has(route) && !isVerifiedUser()) {
    rememberIntendedRoute(route);
    setRoute("/verify-email");
    return;
  }
  if (route.startsWith("/admin") && !isAdminAccount()) {
    renderRestrictedAdmin();
    return;
  }
  if (route.startsWith("/blog/")) {
    renderBlogArticlePage(route.replace("/blog/", ""));
    return;
  }
  routes[route]();
}

function bindAdminInteractions() {
  const applyFilters = () => {
    const query = String(document.querySelector("[data-admin-filter]")?.value || "").trim().toLowerCase();
    const status = document.querySelector("[data-admin-status-filter]")?.value || "";
    const category = document.querySelector("[data-admin-category-filter]")?.value || "";
    const priority = document.querySelector("[data-admin-priority-filter]")?.value || "";
    document.querySelectorAll("[data-admin-row]").forEach((row) => {
      const matchesQuery = !query || String(row.getAttribute("data-search") || "").includes(query);
      const matchesStatus = !status || row.getAttribute("data-status") === status;
      const matchesCategory = !category || row.getAttribute("data-category") === category;
      const matchesPriority = !priority || row.getAttribute("data-priority") === priority;
      row.hidden = !(matchesQuery && matchesStatus && matchesCategory && matchesPriority);
    });
  };
  document.querySelector("[data-admin-filter]")?.addEventListener("input", applyFilters);
  document.querySelector("[data-admin-status-filter]")?.addEventListener("change", applyFilters);
  document.querySelector("[data-admin-category-filter]")?.addEventListener("change", applyFilters);
  document.querySelector("[data-admin-priority-filter]")?.addEventListener("change", applyFilters);
  document.querySelectorAll("[data-admin-view-user]").forEach((button) => {
    button.addEventListener("click", () => openAdminUserDetails(button.getAttribute("data-admin-view-user")));
  });
  document.querySelectorAll("[data-admin-plan-user]").forEach((button) => {
    button.addEventListener("click", () => openAdminPlanModal(button.getAttribute("data-admin-plan-user")));
  });
  document.querySelectorAll("[data-admin-credits-user]").forEach((button) => {
    button.addEventListener("click", () => openAdminCreditsModal(button.getAttribute("data-admin-credits-user"), button.getAttribute("data-admin-credit-mode") || "add"));
  });
  document.querySelectorAll("[data-admin-user-status]").forEach((button) => {
    button.addEventListener("click", () => {
      adminSetUserStatus(button.getAttribute("data-admin-user-status"), button.getAttribute("data-admin-next-status"));
      render();
    });
  });
  document.querySelectorAll("[data-admin-approve-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      adminApprovePayment(button.getAttribute("data-admin-payment-user"), button.getAttribute("data-admin-approve-payment"));
      render();
    });
  });
  document.querySelectorAll("[data-admin-reject-payment]").forEach((button) => {
    button.addEventListener("click", () => openAdminRejectModal(button.getAttribute("data-admin-payment-user"), button.getAttribute("data-admin-reject-payment")));
  });
  document.querySelectorAll("[data-admin-view-payment]").forEach((button) => {
    button.addEventListener("click", () => openAdminPaymentDetails(button.getAttribute("data-admin-payment-user"), button.getAttribute("data-admin-view-payment")));
  });
  document.querySelectorAll("[data-admin-view-support]").forEach((button) => {
    button.addEventListener("click", () => openAdminSupportTicket(button.getAttribute("data-admin-view-support")));
  });
  document.querySelectorAll("[data-admin-support-progress]").forEach((button) => {
    button.addEventListener("click", () => {
      adminMarkSupportTicketInProgress(button.getAttribute("data-admin-support-progress"));
      render();
    });
  });
  document.querySelectorAll("[data-admin-support-close]").forEach((button) => {
    button.addEventListener("click", () => {
      adminCloseSupportTicket(button.getAttribute("data-admin-support-close"));
      adminSetFlash(t().admin.messages.ticketClosed);
      render();
    });
  });
}

function bindInteractions() {
  bindAdminInteractions();
  document.querySelectorAll("[data-auth-form]").forEach((form) => {
    const termsCheck = form.querySelector("[data-terms-check]");
    if (termsCheck) {
      termsCheck.addEventListener("change", () => {
        if (termsCheck.checked) {
          const visibleError = form.querySelector("[data-auth-error]");
          if (visibleError && visibleError.textContent === t().auth.errors.legal) {
            visibleError.textContent = "";
            visibleError.hidden = true;
          }
        }
      });
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.dataset.submitting === "true") return;
      const visibleError = form.querySelector("[data-auth-error]");
      if (visibleError) {
        visibleError.textContent = "";
        visibleError.hidden = true;
      }
      const mode = form.getAttribute("data-auth-form");
      if (mode === "signup" && !form.acceptLegal?.checked) {
        showFormError(form, t().auth.errors.legal);
        form.acceptLegal?.focus();
        return;
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const validationError = validateAuthForm(form, mode);
      if (validationError) {
        showFormError(form, validationError);
        return;
      }
      const button = form.querySelector("[data-auth-submit]");
      const restoreSubmitButton = () => {
        form.dataset.submitting = "false";
        if (!button) return;
        button.disabled = false;
        if (mode === "signin") button.textContent = t().auth.signInButton;
        else if (mode === "signup") button.textContent = t().auth.signUpButton;
        else if (mode === "forgot") button.textContent = t().auth.sendCode;
        else if (mode === "verify") button.textContent = t().auth.verifyButton;
        else if (mode === "reset") button.textContent = t().auth.updatePassword;
      };
      form.dataset.submitting = "true";
      if (button) {
        button.disabled = true;
        const loadingLabels = { signin: t().auth.signingIn, signup: t().auth.creatingAccount, forgot: t().auth.sendingCode, verify: t().auth.confirming, reset: t().auth.updatingPassword };
        button.textContent = loadingLabels[mode] || button.textContent;
      }
      window.setTimeout(async () => {
        if (mode === "signin") {
          const account = findAccountByEmail(form.email.value);
          if (account) {
            prepareCollapsedDashboardEntry();
            const remember = form.rememberUser?.checked !== false;
            setSession(account, remember);
            if (remember) rememberAuthPassword(form.password.value);
            else forgetAuthPassword();
            if (account.emailVerified === false) {
              const result = await issueVerificationCode(account);
              if (result.ok) setRoute("/verify-email");
              else {
                showFormError(form, result.reason === "cooldown" ? t().auth.codeHelp : t().auth.verificationSendError);
                restoreSubmitButton();
              }
            } else {
              routeToDashboardEntry(consumeIntendedRoute());
            }
          }
        } else if (mode === "signup") {
          const account = createAccount({
            fullName: form.fullName.value,
            email: form.email.value,
            password: form.password.value,
          });
          if (account) {
            prepareCollapsedDashboardEntry();
            const result = await issueVerificationCode(account);
            if (!result.ok) {
              deleteAccount(account.id);
              signOut();
              showFormError(form, t().auth.verificationSendError);
              restoreSubmitButton();
              return;
            }
            setSession(account);
            writeJsonStorage(userScopedStorageKey(PROFILE_STORAGE_KEY, account), account.profile);
            setRoute("/verify-email");
          }
        } else if (mode === "forgot") {
          const message = form.querySelector("[data-auth-message]");
          if (message) {
            message.textContent = t().auth.resetPrepared;
            message.hidden = false;
          }
          restoreSubmitButton();
          return;
        } else if (mode === "verify") {
          setVerifiedUser(true);
          routeToDashboardEntry(consumeIntendedRoute());
        } else if (mode === "reset") {
          setRoute("/signin");
        }
      }, 450);
    });
  });

  document.querySelectorAll("[data-password-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.closest(".password-input-wrap")?.querySelector("input");
      if (!input) return;
      const isVisible = input.type === "text";
      const nextVisible = !isVisible;
      input.type = nextVisible ? "text" : "password";
      const label = nextVisible ? t().auth.hidePassword : t().auth.showPassword;
      button.setAttribute("aria-label", label);
      button.setAttribute("aria-pressed", String(nextVisible));
      button.setAttribute("title", label);
      button.innerHTML = icon(nextVisible ? "eyeOff" : "eye");
      input.focus();
    });
  });

  document.querySelectorAll("[data-new-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      cancelPendingResumeAutosave();
      if (!canUseFeature("unlimited_resumes") && loadResumes().length >= 1) {
        event.preventDefault();
        event.stopImmediatePropagation();
        openFeatureLockModal("unlimited_resumes");
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
      cancelPendingResumeAutosave();
      loadResumeIntoBuilder(button.getAttribute("data-edit-resume"));
      preferCollapsedSidebarForBuilder();
    });
  });

  document.querySelectorAll("[data-preview-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelPendingResumeAutosave();
      openResumePreview(button.getAttribute("data-preview-resume"));
    });
  });

  document.querySelectorAll("[data-duplicate-resume]").forEach((button) => {
    button.addEventListener("click", () => {
      const resume = findResume(button.getAttribute("data-duplicate-resume"));
      if (!resume) return;
      if (!canUseFeature("unlimited_resumes") && loadResumes().length >= 1) {
        openFeatureLockModal("unlimited_resumes");
        return;
      }
      const now = isoNow();
      upsertResume({ ...resume, id: newResumeId(), title: `${resumeLabels().copyPrefix} ${resume.title}`, createdAt: now, updatedAt: now });
      render();
    });
  });

  document.querySelectorAll("[data-delete-resume]").forEach((button) => {
    button.addEventListener("click", () => openDeleteResumeModal(button.getAttribute("data-delete-resume")));
  });

  document.querySelectorAll("[data-pdf-export-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelPendingResumeAutosave();
      exportResumeDataPdf(button.getAttribute("data-pdf-export-resume"), button);
    });
  });

  document.querySelectorAll("[data-save-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelPendingResumeAutosave();
      button.dataset.defaultHtml ||= button.innerHTML;
      button.classList.remove("is-saved");
      button.classList.add("is-saving");
      button.disabled = true;
      setSaveState("saving");
      saveCurrentResume(true);
      showResumeSaveButtonFeedback(button);
    });
  });

  document.querySelectorAll("[data-admin-fill-test-resume]").forEach((button) => {
    button.addEventListener("click", () => {
      requestAdminTestResumeFill();
    });
  });

  document.querySelectorAll("[data-resume-experience-field]").forEach((field) => {
    field.addEventListener("input", () => {
      updateBuilderLivePreview();
      scheduleAutoSave();
      updateBuilderProgress();
      updateBuilderSectionNav();
    });
  });

  document.querySelectorAll("[data-add-experience]").forEach((button) => {
    button.addEventListener("click", () => {
      builderDraft = collectBuilderResume();
      builderDraft.workExperience = [
        ...(builderDraft.workExperience || []),
        { company: "", role: "", period: "", location: "", achievements: [] },
      ];
      builderDraft.updatedAt = isoNow();
      activeBuilderSectionIndex = 2;
      renderBuilder();
      scheduleAutoSave();
      updateBuilderLivePreview();
    });
  });

  document.querySelectorAll("[data-remove-experience]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-remove-experience"));
      builderDraft = collectBuilderResume();
      const experiences = Array.isArray(builderDraft.workExperience) ? [...builderDraft.workExperience] : [];
      if (experiences.length <= 1 || Number.isNaN(index)) return;
      experiences.splice(index, 1);
      builderDraft.workExperience = experiences.length ? experiences : [{ company: "", role: "", period: "", location: "", achievements: [] }];
      builderDraft.updatedAt = isoNow();
      activeBuilderSectionIndex = 2;
      renderBuilder();
      scheduleAutoSave();
      updateBuilderLivePreview();
    });
  });

  document.querySelectorAll("[data-resume-education-field]").forEach((field) => {
    field.addEventListener("input", () => {
      updateBuilderLivePreview();
      scheduleAutoSave();
      updateBuilderProgress();
      updateBuilderSectionNav();
    });
  });

  document.querySelectorAll("[data-add-education]").forEach((button) => {
    button.addEventListener("click", () => {
      builderDraft = collectBuilderResume();
      builderDraft.education = [
        ...(builderDraft.education || []),
        { school: "", degree: "", location: "", period: "", description: "" },
      ];
      builderDraft.updatedAt = isoNow();
      activeBuilderSectionIndex = 3;
      renderBuilder();
      scheduleAutoSave();
      updateBuilderLivePreview();
    });
  });

  document.querySelectorAll("[data-remove-education]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.getAttribute("data-remove-education"));
      builderDraft = collectBuilderResume();
      const educationItems = Array.isArray(builderDraft.education) ? [...builderDraft.education] : [];
      if (educationItems.length <= 1 || Number.isNaN(index)) return;
      educationItems.splice(index, 1);
      builderDraft.education = educationItems.length ? educationItems : [{ school: "", degree: "", location: "", period: "", description: "" }];
      builderDraft.updatedAt = isoNow();
      activeBuilderSectionIndex = 3;
      renderBuilder();
      scheduleAutoSave();
      updateBuilderLivePreview();
    });
  });

  document.querySelectorAll("[data-add-list-line]").forEach((button) => {
    button.addEventListener("click", () => {
      const fieldName = button.getAttribute("data-add-list-line");
      const field = document.querySelector(`[data-resume-field="${fieldName}"]`);
      if (!field) return;
      field.value = `${field.value.replace(/\s+$/g, "")}${field.value.trim() ? "\n" : ""}`;
      field.focus();
      field.selectionStart = field.value.length;
      field.selectionEnd = field.value.length;
      field.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  document.querySelectorAll("[data-route]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      if (el.hasAttribute("data-ai-action")) {
        const featureKey = aiActionFeature(el.getAttribute("data-ai-action") || "ai");
        if (!canUseFeature(featureKey)) {
          event.stopImmediatePropagation();
          openFeatureLockModal(featureKey);
          return;
        }
      }
      if (el.hasAttribute("data-ai-action") && requiresAiCredits(el.getAttribute("data-ai-action") || "ai")) {
        event.stopImmediatePropagation();
        openFeatureLockModal("ai_credits");
        return;
      }
      if (el.hasAttribute("data-sign-out")) {
        signOut();
        setRoute("/");
        return;
      }
      if (el.closest(".sidebar")) setSidebarCollapsed(true, { manual: true });
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

  document.querySelectorAll("[data-support-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const button = form.querySelector(".support-submit-button");
      if (button) {
        button.disabled = true;
        button.innerHTML = `${icon("mail")} ${escapeHtml(t().support.sending)}`;
      }
      createSupportTicket({
        subject: form.subject.value,
        category: form.category.value,
        priority: form.priority.value,
        message: form.message.value,
      });
      renderSupport(t().support.success);
    });
  });

  document.querySelectorAll("[data-support-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = document.querySelector("[data-support-form]");
      form?.scrollIntoView({ behavior: "smooth", block: "center" });
      form?.querySelector("input, select, textarea")?.focus();
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
      setSidebarCollapsed(!sidebarCollapsed, { manual: true });
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
      const panel = document.querySelector(`[data-pricing-panel="${target}"]`);
      (panel || document.querySelector(".monetization"))?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    button.addEventListener("click", exitToNewResumeFlow);
  });

  document.querySelectorAll("[data-cover-letter-new]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!canUseFeature("cover_letters_unlimited") && loadCoverLetters().length >= 1) {
        openFeatureLockModal("cover_letters_unlimited");
        return;
      }
      startNewCoverLetter();
    });
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
    button.addEventListener("click", async () => {
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
      if (!canUseAiTask("generate_cover_letter")) {
        openFeatureLockModal("ai_cover_letter");
        return;
      }
      const restore = setButtonLoading(button, aiCopy().generating);
      try {
        const result = await requestAiGeneration("generate_cover_letter", {
          letter: draft,
          resume: draft.resumeId ? findResume(draft.resumeId) : selectedAiResume(),
        });
        draft.body = result.body || generateCoverLetterBody(draft);
      } catch (error) {
        if (error.message === "insufficient_credits") return;
        draft.body = generateCoverLetterBody(draft);
        coverLetterSaveMessage = aiErrorMessage(error);
      } finally {
        restore();
      }
      coverLetterDraft = draft;
      routes["/dashboard/cover-letters"]();
    });
  });

  document.querySelectorAll("[data-cover-letter-ai]").forEach((button) => {
    button.addEventListener("click", async () => {
      const taskType = button.getAttribute("data-cover-letter-ai") || "improve_cover_letter";
      const draft = updateCoverLetterDraftFromForm();
      const message = document.querySelector("[data-cover-letter-message]");
      if (!draft.body && taskType !== "tailor_cover_letter_to_job") {
        if (message) {
          message.textContent = coverLetterLabels().validationBody;
          message.hidden = false;
        }
        return;
      }
      if (taskType === "tailor_cover_letter_to_job" && !draft.jobDescription) {
        if (message) {
          message.textContent = coverLetterLabels().validationBody;
          message.hidden = false;
        }
        return;
      }
      if (!canUseAiTask(taskType)) {
        openFeatureLockModal("ai_cover_letter");
        return;
      }
      const restore = setButtonLoading(button, taskType === "tailor_cover_letter_to_job" ? aiCopy().analyzing : aiCopy().improving);
      try {
        const result = await requestAiGeneration(taskType, {
          letter: draft,
          resume: draft.resumeId ? findResume(draft.resumeId) : selectedAiResume(),
        });
        draft.body = result.body || draft.body;
        coverLetterSaveMessage = result.suggestions?.length ? result.suggestions.join(" ") : "";
      } catch (error) {
        if (error.message !== "insufficient_credits") coverLetterSaveMessage = aiErrorMessage(error);
      } finally {
        restore();
      }
      coverLetterDraft = draft;
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
      if (!currentCoverLetterId && !canUseFeature("cover_letters_unlimited") && loadCoverLetters().length >= 1) {
        openFeatureLockModal("cover_letters_unlimited");
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
      if (!canUseFeature("cover_letters_unlimited") && loadCoverLetters().length >= 1) {
        openFeatureLockModal("cover_letters_unlimited");
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
    button.addEventListener("click", async () => {
      const form = button.closest("form");
      const error = form?.querySelector("[data-auth-error]");
      const message = form?.querySelector("[data-auth-message]");
      if (error) {
        error.textContent = "";
        error.hidden = true;
      }
      if (message) {
        message.textContent = "";
        message.hidden = true;
      }
      const purpose = getRoute() === "/reset-password" ? "reset" : "verify";
      if (purpose === "verify") {
        const account = currentAccount();
        const result = await issueVerificationCode(account, { force: true });
        if (!result.ok) {
          if (error) {
            error.textContent = result.reason === "cooldown" ? `${t().auth.codeHelp}` : t().auth.verificationSendError;
            error.hidden = false;
          }
          return;
        }
        if (message) {
          message.textContent = t().auth.verificationSent;
          message.hidden = false;
        }
      } else {
        placeholderSendEmailCode(getAuthEmail(), "reset");
      }
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

  const templateSearch = document.querySelector("[data-template-search]");
  const applyTemplateFilters = () => {
    const activeFilter = document.querySelector("[data-template-filter].active")?.getAttribute("data-template-filter") || "all";
    const query = String(templateSearch?.value || "").trim().toLowerCase();
    document.querySelectorAll("[data-template-category]").forEach((card) => {
      const groups = String(card.getAttribute("data-template-groups") || "").split(/\s+/);
      const search = String(card.getAttribute("data-template-search") || "");
      const matchesFilter = activeFilter === "all" || groups.includes(activeFilter) || card.getAttribute("data-template-access") === activeFilter;
      const matchesSearch = !query || search.includes(query);
      card.classList.toggle("is-hidden", !(matchesFilter && matchesSearch));
    });
    window.requestAnimationFrame(() => updateResumePreviewScales());
  };
  document.querySelectorAll("[data-template-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-template-filter]").forEach((item) => item.classList.toggle("active", item === button));
      applyTemplateFilters();
    });
  });
  if (templateSearch) templateSearch.addEventListener("input", applyTemplateFilters);

  const resumeSearch = document.querySelector("[data-resume-search]");
  const resumeStatusFilter = document.querySelector("[data-resume-status-filter]");
  const resumeTemplateFilter = document.querySelector("[data-resume-template-filter]");
  const resumeSort = document.querySelector("[data-resume-sort]");
  const applyResumeLibraryControls = () => {
    const query = String(resumeSearch?.value || "").trim().toLowerCase();
    const status = resumeStatusFilter?.value || "";
    const template = resumeTemplateFilter?.value || "";
    const sort = resumeSort?.value || "recent";
    const cards = Array.from(document.querySelectorAll("[data-resume-card]"));
    cards.forEach((card) => {
      const matchesQuery = !query || String(card.getAttribute("data-resume-search") || "").includes(query);
      const matchesStatus = !status || card.getAttribute("data-resume-status") === status;
      const matchesTemplate = !template || card.getAttribute("data-resume-template") === template;
      card.hidden = !(matchesQuery && matchesStatus && matchesTemplate);
    });
    const grid = document.querySelector(".resume-library");
    if (!grid) return;
    const sorted = cards.sort((a, b) => {
      if (sort === "progress") return Number(b.dataset.resumeProgress || 0) - Number(a.dataset.resumeProgress || 0);
      if (sort === "ats") return Number(b.dataset.resumeAts || 0) - Number(a.dataset.resumeAts || 0);
      if (sort === "name") return String(a.dataset.resumeTitle || "").localeCompare(String(b.dataset.resumeTitle || ""));
      return new Date(b.dataset.resumeUpdated || 0) - new Date(a.dataset.resumeUpdated || 0);
    });
    sorted.forEach((card) => grid.appendChild(card));
    window.requestAnimationFrame(() => updateResumePreviewScales(grid));
  };
  [resumeSearch, resumeStatusFilter, resumeTemplateFilter, resumeSort].forEach((control) => {
    if (!control) return;
    control.addEventListener(control.tagName === "INPUT" ? "input" : "change", applyResumeLibraryControls);
  });

  document.querySelectorAll("[data-resume-template]").forEach((button) => {
    button.addEventListener("click", () => {
      const template = button.getAttribute("data-resume-template");
      if (!canUseTemplate(template)) {
        openFeatureLockModal(templateLockFeature(getTemplateByKey(template)), { templateKey: template });
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
      if (!isTemplateActive(getTemplateByKey(templateKey))) return;
      if (destination === "signup") {
        selectedTemplateKey = templateKey;
        setRoute("/signup");
        return;
      }
      if (!canUseTemplate(templateKey)) {
        openFeatureLockModal(templateLockFeature(getTemplateByKey(templateKey)), { templateKey });
        return;
      }
      if (!pendingTemplateChangeDraft && !canUseFeature("unlimited_resumes") && loadResumes().length >= 1) {
        openFeatureLockModal("unlimited_resumes");
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
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelPendingResumeAutosave();
      exportResumePdf(button);
    });
  });

  document.querySelectorAll("[data-watermark-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const resumeId = loadResumes()[0]?.id || currentResumeAccessId();
      if (canUseFeature("remove_watermark", { resumeId })) {
        setRoute("/dashboard/resumes");
        return;
      }
      openFeatureLockModal("remove_watermark", { resumeId });
    });
  });

  document.querySelectorAll("[data-one-time-purchase], [data-buy-credits]").forEach((button) => {
    button.addEventListener("click", () => openPixPaymentModal(button.getAttribute("data-pix-product") || "premium_pdf"));
  });

  document.querySelectorAll("[data-stripe-checkout]").forEach((button) => {
    button.addEventListener("click", () => startStripeCheckout(button.getAttribute("data-stripe-checkout") || "premium_pdf", {}, button));
  });

  document.querySelectorAll("[data-stripe-portal]").forEach((button) => {
    button.addEventListener("click", () => openStripeCustomerPortal(button));
  });

  document.querySelectorAll("[data-payment-details]").forEach((button) => {
    button.addEventListener("click", () => openPaymentDetailsModal(button.getAttribute("data-payment-details")));
  });

  document.querySelectorAll("[data-payment-history-page]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      paymentHistoryPage = Math.max(1, Number(button.getAttribute("data-payment-history-page")) || 1);
      render();
      window.requestAnimationFrame(() => window.scrollTo({ top: scrollTop, behavior: "auto" }));
    });
  });

  document.querySelectorAll("[data-plan-placeholder]").forEach((button) => {
    button.addEventListener("click", () => openPaymentComingSoonModal());
  });

  document.querySelectorAll("[data-ai-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      const featureKey = aiActionFeature(button.getAttribute("data-ai-action") || "ai");
      if (!canUseFeature(featureKey)) {
        event.preventDefault();
        event.stopPropagation();
        openFeatureLockModal(featureKey);
        return;
      }
      if (requiresAiCredits(button.getAttribute("data-ai-action") || "ai")) {
        event.preventDefault();
        event.stopPropagation();
        openFeatureLockModal("ai_credits");
      }
    });
  });

  document.querySelectorAll("[data-ai-builder-task]").forEach((button) => {
    button.addEventListener("click", async () => {
      const taskType = button.getAttribute("data-ai-builder-task") || "";
      if (!canUseAiTask(taskType)) {
        openFeatureLockModal(aiTaskFeature(taskType));
        return;
      }
      const copy = aiCopy();
      const loadingLabel = taskType === "rewrite_experience" || taskType === "improve_project_description"
        ? copy.improving
        : taskType === "suggest_skills"
          ? copy.suggesting
          : taskType === "translate_resume"
            ? copy.translating
            : copy.generating;
      const restore = setButtonLoading(button, loadingLabel);
      const resume = collectBuilderResume();
      const setField = (name, value) => {
        const field = document.querySelector(`[data-resume-field="${name}"]`)
          || (name === "experience" ? document.querySelector('[data-resume-experience-field="achievements"]') : null);
        if (!field) return;
        field.value = value;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      };
      try {
        const result = await requestAiGeneration(taskType, { resume });
        if (taskType === "generate_professional_summary" || taskType === "improve_professional_summary") {
          const fallback = ruleBasedSummary(resume);
          openAiSuggestionModal({
            title: taskType === "generate_professional_summary" ? copy.generateSummary : copy.improveSummary,
            text: result.summary || fallback,
            onApply: (value) => setField("summary", value),
          });
        } else if (taskType === "rewrite_experience") {
          const bullets = result.bullets?.length ? result.bullets : ruleBasedExperienceBullets(resume);
          openAiSuggestionModal({
            title: copy.improveExperience,
            text: bullets.join("\n"),
            onApply: (value) => setField("experience", value),
          });
        } else if (taskType === "suggest_skills") {
          const groupedSkills = [
            ...(result.technicalSkills || []),
            ...(result.softSkills || []),
            ...(result.tools || []),
            ...(result.atsKeywords || []),
          ];
          const skills = result.skills?.length ? result.skills : groupedSkills.length ? groupedSkills : ruleBasedSkillSuggestions(resume);
          openAiSuggestionModal({
            title: copy.suggestSkills,
            text: skills.join(", "),
            onApply: (value) => setField("skills", value),
          });
        } else if (taskType === "improve_project_description") {
          const projectText = result.description || result.suggestions?.join("\n") || normalizeTextList(resume.projects).join("\n");
          openAiSuggestionModal({
            title: copy.improveProject,
            text: projectText,
            onApply: (value) => setField("projects", value),
          });
        } else if (taskType === "translate_resume") {
          const translated = result.resume && Object.keys(result.resume).length ? result.resume : resume;
          openAiSuggestionModal({
            title: copy.translateResume,
            text: JSON.stringify(translated, null, 2),
            onApply: (value) => {
              try {
                builderDraft = normalizeResume({ ...resume, ...JSON.parse(value) });
                routes["/dashboard/builder"]();
              } catch (error) {
                showAiInlineMessage(copy.fallbackError);
              }
            },
          });
        }
      } catch (error) {
        if (error.message !== "insufficient_credits") {
          if (taskType === "generate_professional_summary" || taskType === "improve_professional_summary") {
            openAiSuggestionModal({ title: copy.suggestionTitle, text: ruleBasedSummary(resume), onApply: (value) => setField("summary", value) });
          } else if (taskType === "rewrite_experience") {
            openAiSuggestionModal({ title: copy.suggestionTitle, text: ruleBasedExperienceBullets(resume).join("\n"), onApply: (value) => setField("experience", value) });
          } else if (taskType === "suggest_skills") {
            openAiSuggestionModal({ title: copy.suggestionTitle, text: ruleBasedSkillSuggestions(resume).join(", "), onApply: (value) => setField("skills", value) });
          } else if (taskType === "improve_project_description") {
            openAiSuggestionModal({ title: copy.suggestionTitle, text: normalizeTextList(resume.projects).join("\n"), onApply: (value) => setField("projects", value) });
          } else {
            showAiInlineMessage(aiErrorMessage(error));
          }
        }
      } finally {
        restore();
      }
    });
  });

  document.querySelectorAll("[data-ai-form]").forEach((form) => {
    form.addEventListener("submit", async (event) => {
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
      if (!canUseAiTask("analyze_job_description")) {
        openFeatureLockModal("ats_advanced");
        aiAssistantState = { ...aiAssistantState, ...nextState, error: aiCopy().noCredits };
        render();
        return;
      }
      aiAssistantState = { ...nextState, result: { state: "loading" } };
      render();
      try {
        const result = await requestAiGeneration("analyze_job_description", { resume, job: nextState });
        aiAssistantState = { ...nextState, result: aiAnalysisResult(result, resume, nextState), error: "" };
        render();
      } catch (error) {
        aiAssistantState = {
          ...nextState,
          result: error.message === "insufficient_credits" ? null : analyzeResumeForJob(resume, nextState),
          error: aiErrorMessage(error),
        };
        render();
      }
    });
  });

  document.querySelectorAll("[data-ai-tailor-job]").forEach((button) => {
    button.addEventListener("click", async () => {
      const form = button.closest("form");
      const getValue = (name) => form?.querySelector(`[data-ai-field="${name}"]`)?.value.trim() || "";
      const values = {
        resumeId: getValue("resumeId"),
        jobTitle: getValue("jobTitle"),
        company: getValue("company"),
        jobDescription: getValue("jobDescription"),
      };
      const resume = findResume(values.resumeId);
      if (!resume || !values.jobDescription) {
        aiAssistantState = { ...aiAssistantState, ...values, error: !resume ? t().ai.selectResumeError : t().ai.jobDescriptionError };
        render();
        return;
      }
      if (!canUseFeature("job_tailoring", { resumeId: resume.id })) {
        openFeatureLockModal("job_tailoring", { resumeId: resume.id });
        return;
      }
      if (!canUseAiTask("tailor_resume_to_job")) {
        openFeatureLockModal("job_tailoring", { resumeId: resume.id });
        return;
      }
      const restore = setButtonLoading(button, aiCopy().improving);
      try {
        const result = await requestAiGeneration("tailor_resume_to_job", { resume, job: values });
        const text = [
          result.summary ? `${t().builder.labels.summary}\n${result.summary}` : "",
          result.experienceBullets?.length ? `${t().builder.labels.achievements}\n${result.experienceBullets.join("\n")}` : "",
          result.keywords?.length ? `${t().ai.missingKeywords}\n${result.keywords.join(", ")}` : "",
          result.suggestions?.length ? `${t().ai.suggestionsTitle}\n${result.suggestions.join("\n")}` : "",
        ].filter(Boolean).join("\n\n");
        openAiSuggestionModal({ title: aiCopy().tailorJob, text: text || aiCopy().fallbackError });
      } catch (error) {
        if (error.message !== "insufficient_credits") showAiInlineMessage(aiErrorMessage(error));
      } finally {
        restore();
      }
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

  function refreshOptionalResumeSections(root = previewRoot()) {
    if (!root) return;
    root.querySelectorAll("[data-optional-section]").forEach((section) => {
      const clone = section.cloneNode(true);
      clone.querySelector("h3")?.remove();
      section.hidden = clone.textContent.replace(/\s+/g, " ").trim().length === 0;
    });
  }

  function updatePreviewPairSeparators(root = previewRoot()) {
    if (!root) return;
    root.querySelectorAll("[data-preview-pair-separator]").forEach((separator) => {
      const [firstField, secondField] = (separator.getAttribute("data-preview-pair-separator") || "").split(":");
      const container = separator.parentElement;
      const first = container?.querySelector(`[data-preview-field="${firstField}"]`)?.textContent.trim();
      const second = container?.querySelector(`[data-preview-field="${secondField}"]`)?.textContent.trim();
      separator.hidden = !(first && second);
    });
  }

  function syncPreviewField(field) {
    const targetName = field.getAttribute("data-preview-target");
    const root = previewRoot();
    const targets = root ? Array.from(root.querySelectorAll(`[data-preview-field="${targetName}"]`)) : [];
    if (!targets.length) return;
      const value = field.value.trim();
    if (root?.classList.contains("sales-pro-resume") && ["summary", "experience", "skills", "certifications", "projects"].includes(targetName)) {
      updateBuilderLivePreview();
      return;
    }
    if (root?.classList.contains("simple-ats-resume") && ["skills", "certifications", "projects", "links", "languages"].includes(targetName)) {
      updateBuilderLivePreview();
      return;
    }
    targets.forEach((target) => {
      const displayValue = value || target.getAttribute("data-preview-empty") || "";
      if (targetName === "skills") {
      const skills = displayValue.split(/,|\n/).map((skill) => skill.trim()).filter(Boolean);
      target.innerHTML = skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
    } else if (targetName === "certifications" && (target.closest(".student-courses") || target.closest(".simple-ats-certifications") || target.closest(".executive-certifications"))) {
      target.innerHTML = displayValue.split(/,|\n/).map((item) => item.trim()).filter(Boolean).map((item) => `<p>${escapeHtml(item)}</p>`).join("");
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
    });
    updatePreviewContactLine();
    updatePreviewPairSeparators(root);
    refreshOptionalResumeSections(root);
  }

  function updatePreviewContactLine() {
    const root = previewRoot();
    const contact = root ? root.querySelector('[data-preview-field="contact"]') : null;
    if (!root) return;
    const getSource = (name) => document.querySelector(`[data-preview-source="${name}"]`)?.value.trim() || "";
    const location = resumeContactLocation({
      address: getSource("address"),
      city: getSource("city"),
      state: getSource("state"),
      postalCode: getSource("postalCode"),
      location: getSource("location"),
    });
    const customContactItems = [
      ["mail", getSource("email")],
      ["headset", getSource("phone")],
      ["globe", location],
      ["link", normalizeTextList(document.querySelector('[data-resume-field="links"]')?.value || "")[0]],
    ].filter((item) => item[1]);
    const customContactMarkup = customContactItems.map(([iconName, value]) => `<p>${icon(iconName)}<span>${escapeHtml(value)}</span></p>`).join("");
    if (root.classList.contains("tech-product-resume")) {
      const list = root.querySelector(".tech-product-contact-list");
      if (list) list.innerHTML = customContactMarkup;
      refreshOptionalResumeSections(root);
      return;
    }
    if (root.classList.contains("professional-pro-resume")) {
      const list = root.querySelector(".professional-pro-contact-list");
      if (list) list.innerHTML = customContactMarkup;
      refreshOptionalResumeSections(root);
      return;
    }
    if (root.classList.contains("sales-pro-resume")) {
      const list = root.querySelector(".sales-contact-list");
      if (list) list.innerHTML = customContactMarkup;
      refreshOptionalResumeSections(root);
      return;
    }
    if (!contact) return;
    const showLinkInContact = root?.classList?.contains("student-resume") || root?.classList?.contains("simple-ats-resume") || root?.classList?.contains("executive-resume");
    const studentLink = showLinkInContact
      ? normalizeTextList(document.querySelector('[data-resume-field="links"]')?.value || "")[0]
      : "";
    const values = [location, getSource("email"), getSource("phone"), studentLink].filter(Boolean);
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
  updatePreviewPairSeparators();

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

function openAccessModal({ title, text, detail = "", featureName = "", requirement = "", benefits = [], actions = [] }) {
  const root = document.body || document.getElementById("app");
  const paymentDetail = detail === null ? "" : (detail || t().dashboard.access.paymentDetail || "");
  const accessCopy = featureAccessCopy();
  closeAccessModal();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal access-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-access-close></div>
    <section class="template-preview-dialog access-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <header class="template-preview-header">
        <div>
          <span class="eyebrow">Succeedora</span>
          <h2>${escapeHtml(title)}</h2>
          ${featureName ? `<div class="access-feature-row"><strong>${escapeHtml(featureName)}</strong>${requirement ? `<span class="locked-badge">${icon("lock")} ${escapeHtml(requirement)}</span>` : ""}</div>` : ""}
          <p>${escapeHtml(text)}</p>
          ${benefits.length ? `<div class="access-benefits-wrap"><strong>${escapeHtml(accessCopy.benefitsTitle)}</strong><ul class="access-benefits">${benefits.map((benefit) => `<li>${escapeHtml(benefit)}</li>`).join("")}</ul></div>` : ""}
          ${paymentDetail ? `<p class="access-payment-detail">${escapeHtml(paymentDetail)}</p>` : ""}
        </div>
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
  const map = {
    ai: "ai_credits",
    template: "premium_templates",
    "resume-limit": "unlimited_resumes",
    "cover-letter": "cover_letters_unlimited",
    "watermark": "watermark_free_pdf",
    "ats": "ats_advanced",
  };
  openFeatureLockModal(map[kind] || "premium_templates");
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

function createPixPaymentRequest(productType, context = {}, payer = {}) {
  const product = localizedPixProduct(productType);
  const account = currentAccount();
  if (!product || !paymentConfig.pixEnabled || !account?.id) return null;
  const payerName = String(payer.payerName || account?.profile?.fullName || account?.email || "").trim();
  const payerEmail = normalizeEmail(payer.payerEmail || account?.email || getAuthEmail());
  const payerTaxId = String(payer.payerTaxId || "").trim();
  const payerNote = String(payer.payerNote || "").trim();
  const id = `pix_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const pixPayment = generatePixPaymentCode({
    amount: product.amount,
    productName: product.productName,
    description: product.description,
    orderId: id.replace(/^pix_/, "").slice(0, 12),
    merchantName: paymentConfig.merchantName,
    merchantCity: paymentConfig.merchantCity,
    pixKey: paymentConfig.pixKey,
    pixKeyType: paymentConfig.pixKeyType,
  });
  return upsertPaymentRequest({
    id,
    userId: account?.id || "",
    userName: account?.profile?.fullName || payerName || account?.email || "",
    userEmail: account?.email || payerEmail || getAuthEmail(),
    payerName,
    payerEmail,
    payerTaxId,
    payerNote,
    productType,
    productName: product.productName,
    amount: product.amount,
    currency: product.currency,
    paymentMethod: "pix",
    pixKey: paymentConfig.pixKey,
    pixKeyType: paymentConfig.pixKeyType,
    pixPayload: pixPayment.pixPayload,
    resumeId: context.resumeId || currentResumeAccessId(),
    templateKey: context.templateKey || "",
    creditAmount: AI_CREDIT_PRODUCT_AMOUNTS[productType] || 0,
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

function pixPaymentInitialData(productType) {
  const product = localizedPixProduct(productType);
  const account = currentAccount();
  return {
    product,
    fullName: account?.profile?.fullName || account?.profile?.name || "",
    email: account?.email || getAuthEmail() || "",
  };
}

function readPixPaymentForm(form, product) {
  return {
    productName: product?.productName || "",
    amount: Number(product?.amount || 0),
    payerName: String(form?.payerName?.value || "").trim(),
    payerEmail: normalizeEmail(form?.payerEmail?.value || ""),
    payerTaxId: String(form?.payerTaxId?.value || "").trim(),
    payerNote: String(form?.payerNote?.value || "").trim(),
  };
}

function validatePixPaymentData(data) {
  return Boolean(data.productName && data.amount > 0 && data.payerName && data.payerEmail && validEmail(data.payerEmail) && data.payerTaxId);
}

function stripeMessage(message, type = "error") {
  const existing = document.querySelector("[data-stripe-message]");
  if (existing) existing.remove();
  const target = document.querySelector(".billing-summary") || document.querySelector(".monetization") || document.querySelector("#app");
  if (!target) return;
  const note = document.createElement("p");
  note.className = type === "error" ? "auth-error" : "settings-message";
  note.setAttribute("data-stripe-message", "");
  note.textContent = message;
  target.appendChild(note);
}

function stripeCheckoutReturnUrl() {
  const route = getRoute();
  if (route === "/payment/success" || route === "/payment/cancel") {
    return `${window.location.origin}${window.location.pathname}#/dashboard/billing`;
  }
  const hash = String(window.location.hash || "");
  if (hash.startsWith("#/")) return `${window.location.origin}${window.location.pathname}${hash}`;
  return `${window.location.origin}${window.location.pathname}#${route || "/dashboard/billing"}`;
}

async function startStripeCheckout(productType, context = {}, button = null) {
  const labels = t().payments;
  if (!isLoggedIn()) {
    rememberIntendedRoute("/dashboard/billing");
    setRoute("/signin");
    return;
  }
  const account = currentAccount();
  const originalText = button?.textContent || "";
  if (button) {
    button.disabled = true;
    button.textContent = labels.redirectingStripe;
  }
  try {
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: account.id,
        userEmail: account.email,
        productType,
        productId: context.productId || "",
        resumeId: context.resumeId || currentResumeAccessId(),
        templateId: context.templateId || selectedTemplateKey || "",
        quantity: context.quantity || 1,
        successUrl: `${window.location.origin}${window.location.pathname}#/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: stripeCheckoutReturnUrl(),
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.success || !payload.checkoutUrl) throw new Error(payload.error || "stripe_checkout_failed");
    const product = localizedPixProduct(productType);
    const planLabels = currentLanguage === "pt" ? { plan_pro: "Plano Pro", plan_premium: "Plano Premium" } : { plan_pro: "Pro plan", plan_premium: "Premium plan" };
    upsertPaymentRequest({
      id: payload.sessionId || `stripe_${Date.now().toString(36)}`,
      userId: account.id,
      userName: account.profile?.fullName || account.email,
      userEmail: account.email,
      productType,
      productName: product?.productName || planLabels[productType] || productType,
      amount: product?.amount || 0,
      currency: paymentConfig.currency,
      paymentMethod: "stripe",
      status: "pending",
      stripeSessionId: payload.sessionId || "",
      resumeId: context.resumeId || currentResumeAccessId(),
      templateKey: context.templateId || selectedTemplateKey || "",
      creditAmount: AI_CREDIT_PRODUCT_AMOUNTS[productType] || 0,
      createdAt: isoNow(),
    });
    window.location.assign(payload.checkoutUrl);
  } catch (error) {
    stripeMessage(labels.stripeUnavailable);
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

async function openStripeCustomerPortal(button = null) {
  const labels = t().payments;
  const account = currentAccount();
  if (!account) {
    setRoute("/signin");
    return;
  }
  const originalText = button?.textContent || "";
  if (button) {
    button.disabled = true;
    button.textContent = labels.redirectingStripe;
  }
  try {
    const access = getUserAccess();
    const response = await fetch("/api/stripe/create-customer-portal-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: account.id,
        userEmail: account.email,
        stripeCustomerId: access.planState?.stripeCustomerId || "",
        returnUrl: `${window.location.origin}${window.location.pathname}#/dashboard/billing`,
      }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.success || !payload.portalUrl) throw new Error(payload.error || "stripe_portal_failed");
    window.location.assign(payload.portalUrl);
  } catch (error) {
    stripeMessage(labels.stripeUnavailable);
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function stripeCheckoutParams() {
  const query = String(window.location.hash || "").split("?")[1] || window.location.search.slice(1);
  return new URLSearchParams(query);
}

function stripePlanLabel(productType, planType) {
  if (productType === "plan_premium" || planType === "premium") return currentLanguage === "pt" ? "Plano Premium" : "Premium plan";
  if (productType === "plan_pro" || planType === "pro") return currentLanguage === "pt" ? "Plano Pro" : "Pro plan";
  return productType || "Stripe";
}

function stripeProductAmount(productType) {
  const product = pixProduct(productType);
  if (product) return product.amount;
  if (productType === "plan_pro") return 5900;
  if (productType === "plan_premium") return 9900;
  return 0;
}

function applyStripeCheckoutEntitlement(session) {
  const account = currentAccount();
  if (!account || !session?.metadata) return false;
  const metadata = session.metadata;
  if (metadata.userId && metadata.userId !== account.id) return false;
  const productType = metadata.productType || "";
  const targetId = metadata.resumeId || metadata.templateId || "__global__";
  const access = loadUserAccess(account);
  const oneTime = { ...access.oneTime };
  let nextAccess = { ...access, oneTime };

  if (session.mode === "subscription") {
    const plan = normalizePlanType(metadata.planType || (productType === "plan_premium" ? "premium" : "pro"));
    const startedAt = isoNow();
    const planState = {
      type: plan,
      status: ["active", "trialing"].includes(session.subscriptionStatus) ? "active" : "active",
      startedAt,
      expiresAt: session.currentPeriodEnd || null,
      updatedAt: startedAt,
      source: "stripe",
      durationLabel: currentLanguage === "pt" ? "Assinatura Stripe" : "Stripe subscription",
      stripeCustomerId: session.stripeCustomerId || "",
      stripeSubscriptionId: session.stripeSubscriptionId || "",
      currentPeriodEnd: session.currentPeriodEnd || null,
    };
    updateAccount(account.id, (current) => ({ ...current, plan: planState, manualPlanUpdatedAt: planState.updatedAt, manualPlanUpdatedBy: "stripe" }));
    nextAccess.plan = plan;
    nextAccess.planState = planState;
  } else {
    if (productType === "remove_watermark") oneTime.watermarkRemoval = adminAddUnique(oneTime.watermarkRemoval, targetId);
    if (productType === "premium_pdf") oneTime.premiumPdf = adminAddUnique(oneTime.premiumPdf, targetId);
    if (productType === "premium_template") oneTime.premiumTemplates = adminAddUnique(oneTime.premiumTemplates, targetId);
    if (productType === "career_pack") oneTime.careerPack = adminAddUnique(oneTime.careerPack, targetId);
    if (productType === "online_resume_link") oneTime.onlineLinks = adminAddUnique(oneTime.onlineLinks, targetId);
    if (AI_CREDIT_PRODUCT_TYPES.includes(productType)) {
      const credits = Math.max(1, Number(metadata.creditsAmount || 10));
      nextAccess = {
        ...nextAccess,
        aiCredits: Math.max(0, Number(nextAccess.aiCredits || 0) + credits),
        creditHistory: [...(nextAccess.creditHistory || []), { amount: credits, reason: session.id, adminEmail: "stripe", createdAt: isoNow() }],
      };
    }
  }

  nextAccess.adminEntitlements = [
    ...(nextAccess.adminEntitlements || []),
    { productType, targetId, paymentId: session.id, grantedBy: "stripe", grantedAt: isoNow() },
  ];
  saveUserAccess(account, nextAccess);
  return true;
}

async function confirmStripeCheckoutFromUrl() {
  const account = currentAccount();
  const params = stripeCheckoutParams();
  const sessionId = params.get("session_id") || "";
  const target = document.querySelector("[data-stripe-confirmation]");
  if (!sessionId || !account || !target) return;
  const labels = t().payments;
  try {
    const response = await fetch(`/api/stripe/checkout-session?session_id=${encodeURIComponent(sessionId)}&user_id=${encodeURIComponent(account.id)}`);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.success || !payload.session) throw new Error(payload.error || "checkout_session_lookup_failed");
    const session = payload.session;
    const paid = session.mode === "subscription"
      ? ["complete", "open"].includes(session.status) && ["paid", "no_payment_required"].includes(session.paymentStatus)
      : session.paymentStatus === "paid";
    if (!paid) throw new Error("payment_not_confirmed");
    applyStripeCheckoutEntitlement(session);
    const productType = session.metadata?.productType || "";
    const product = localizedPixProduct(productType);
    upsertPaymentRequest({
      id: session.id,
      userId: account.id,
      userName: account.profile?.fullName || account.email,
      userEmail: account.email,
      productType,
      productName: product?.productName || stripePlanLabel(productType, session.metadata?.planType),
      amount: stripeProductAmount(productType),
      currency: paymentConfig.currency,
      paymentMethod: "stripe",
      status: "paid",
      stripeSessionId: session.id,
      stripePaymentIntentId: session.stripePaymentIntentId || "",
      stripeCustomerId: session.stripeCustomerId || "",
      stripeSubscriptionId: session.stripeSubscriptionId || "",
      resumeId: session.metadata?.resumeId || "",
      templateKey: session.metadata?.templateId || "",
      creditAmount: AI_CREDIT_PRODUCT_TYPES.includes(productType) ? Math.max(1, Number(session.metadata?.creditsAmount || AI_CREDIT_PRODUCT_AMOUNTS[productType] || 10)) : 0,
      approvedAt: isoNow(),
      createdAt: isoNow(),
    });
    target.textContent = labels.approved || labels.successText;
    target.className = "settings-message";
  } catch (error) {
    target.textContent = labels.stripeUnavailable;
    target.className = "auth-error";
  }
}

function openPixPaymentModal(productType, context = {}) {
  const labels = t().payments;
  if (!isLoggedIn()) {
    rememberIntendedRoute("/dashboard/billing");
    setRoute("/signin");
    return;
  }
  const initialData = pixPaymentInitialData(productType);
  if (!initialData.product || !paymentConfig.pixEnabled) {
    openPaymentComingSoonModal();
    return;
  }
  closeAccessModal();
  const root = document.body || document.getElementById("app");
  const modal = document.createElement("div");
  modal.className = "template-preview-modal access-modal pix-payment-modal";
  root.appendChild(modal);
  let request = null;

  const close = () => {
    closeAccessModal();
    if (getRoute() === "/dashboard/billing") render();
  };
  const cancel = () => {
    if (request?.status === "pending_payment") {
      const updated = upsertPaymentRequest({ ...request, status: "cancelled" });
      request.status = updated.status;
    }
    closeAccessModal();
    if (getRoute() === "/dashboard/billing") render();
  };

  const bindCommon = () => {
    modal.querySelectorAll("[data-access-close]").forEach((item) => item.addEventListener("click", close));
    modal.querySelectorAll("[data-pix-cancel]").forEach((item) => item.addEventListener("click", cancel));
  };

  const renderShell = (content, footer = "", title = labels.dataTitle || labels.title, subtitle = labels.dataSubtitle || labels.intro) => {
    modal.innerHTML = `
      <div class="template-preview-backdrop" data-access-close></div>
      <section class="template-preview-dialog pix-payment-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
        <header class="template-preview-header pix-payment-header">
          <div>
            <span class="eyebrow">${escapeHtml(labels.manualBadge)}</span>
            <h2>${escapeHtml(title)}</h2>
            <p>${escapeHtml(subtitle)}</p>
          </div>
          <button class="icon-button" type="button" data-access-close aria-label="${t().dashboard.close}">${icon("close")}</button>
        </header>
        ${content}
        ${footer}
      </section>
    `;
    bindCommon();
  };

  const renderDataStep = () => {
    const product = initialData.product;
    renderShell(`
      <form class="pix-data-form" data-pix-data-form>
        <div class="pix-summary-grid">
          <div class="pix-summary-card"><span>${escapeHtml(labels.product)}</span><strong>${escapeHtml(product.productName)}</strong></div>
          <div class="pix-summary-card"><span>${escapeHtml(labels.amount)}</span><strong>${escapeHtml(formatCurrencyBRL(product.amount))}</strong></div>
        </div>
        <div class="pix-form-grid">
          <label>${escapeHtml(labels.fullName)}<input name="payerName" value="${escapeHtml(initialData.fullName)}" autocomplete="name" required /></label>
          <label>${escapeHtml(labels.contactEmail)}<input name="payerEmail" type="email" value="${escapeHtml(initialData.email)}" autocomplete="email" required /></label>
          <label>${escapeHtml(labels.taxId)}<input name="payerTaxId" inputmode="numeric" autocomplete="off" required /></label>
        </div>
        <p class="pix-payment-warning">${escapeHtml(labels.dataHelp)}</p>
        <p class="auth-error pix-payment-message" data-pix-error hidden></p>
      </form>
    `, `
      <footer class="template-preview-footer access-actions pix-payment-actions">
        <button class="primary-button" type="button" data-pix-generate>${escapeHtml(labels.generatePix)}</button>
        <button class="ghost-button" type="button" data-pix-cancel>${escapeHtml(labels.cancel)}</button>
      </footer>
    `);
    const form = modal.querySelector("[data-pix-data-form]");
    const submit = () => {
      const data = readPixPaymentForm(form, product);
      const error = modal.querySelector("[data-pix-error]");
      if (!validatePixPaymentData(data)) {
        if (error) {
          error.textContent = labels.requiredError;
          error.hidden = false;
        }
        return;
      }
      request = createPixPaymentRequest(productType, context, data);
      if (!request) {
        openPaymentComingSoonModal();
        return;
      }
      renderQrStep();
    };
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      submit();
    });
    modal.querySelector("[data-pix-generate]")?.addEventListener("click", submit);
  };

  const renderQrStep = () => {
    const qrCodeSvg = qrSvg(request.pixPayload);
    renderShell(`
      <div class="pix-payment-body">
        <div class="pix-qr-card">${qrCodeSvg}</div>
        <div class="pix-payment-details">
          <p class="pix-payment-intro">${escapeHtml(labels.intro)}</p>
          <dl>
            <div><dt>${escapeHtml(labels.orderId)}</dt><dd><code>${escapeHtml(request.id)}</code></dd></div>
            <div><dt>${escapeHtml(labels.product)}</dt><dd>${escapeHtml(request.productName)}</dd></div>
            <div><dt>${escapeHtml(labels.amount)}</dt><dd>${escapeHtml(formatCurrencyBRL(request.amount))}</dd></div>
            <div><dt>${escapeHtml(labels.status)}</dt><dd><span class="payment-status status-${escapeHtml(request.status)}">${escapeHtml(paymentStatusLabel(request.status))}</span></dd></div>
            <div><dt>${escapeHtml(labels.pixKey)}</dt><dd>${escapeHtml(`${request.pixKeyType || paymentConfig.pixKeyType} ${formatPixKeyValue(request.pixKey || paymentConfig.pixKey)}`)}</dd></div>
          </dl>
          <label class="pix-copy-field">
            <span>${escapeHtml(labels.pixCopyPaste)}</span>
            <textarea readonly data-pix-code>${escapeHtml(request.pixPayload)}</textarea>
          </label>
          <p class="pix-payment-warning">${escapeHtml(labels.afterPayInstruction)} ${escapeHtml(labels.warning)}</p>
        </div>
      </div>
    `, `
      <footer class="template-preview-footer access-actions pix-payment-actions">
        <button class="secondary-button" type="button" data-pix-copy>${escapeHtml(labels.copyCode)}</button>
        <button class="primary-button" type="button" data-pix-confirm>${escapeHtml(labels.completed)}</button>
        <button class="ghost-button" type="button" data-pix-cancel>${escapeHtml(labels.cancel)}</button>
      </footer>
    `, labels.title, labels.intro);
    modal.querySelector("[data-pix-copy]")?.addEventListener("click", async (event) => {
      await copyTextToClipboard(request.pixPayload);
      event.currentTarget.textContent = labels.codeCopied;
    });
    modal.querySelector("[data-pix-confirm]")?.addEventListener("click", () => {
      const updated = upsertPaymentRequest({
        ...request,
        status: "pending_manual_confirmation",
        confirmedByUserAt: isoNow(),
        payerName: request.payerName,
        payerEmail: request.payerEmail,
        payerTaxId: request.payerTaxId,
        payerNote: request.payerNote,
        pixPayload: request.pixPayload,
        userId: request.userId,
        userEmail: request.userEmail,
      });
      request = updated;
      renderLoadingStep();
      window.setTimeout(() => renderReviewStep(), 2400);
    });
  };

  const renderLoadingStep = () => {
    renderShell(`
      <div class="pix-loading-state">
        <div class="pix-spinner" aria-hidden="true"></div>
        <h3>${escapeHtml(labels.checkingTitle)}</h3>
        <p>${escapeHtml(labels.checkingText)}</p>
      </div>
    `, "", labels.checkingTitle, labels.checkingText);
  };

  const renderReviewStep = () => {
    renderShell(`
      <div class="pix-review-state">
        <span class="payment-status status-${escapeHtml(request.status)}">${escapeHtml(paymentStatusLabel(request.status))}</span>
        <h3>${escapeHtml(labels.reviewTitle)}</h3>
        <p>${escapeHtml(labels.reviewText)}</p>
        <small>${escapeHtml(labels.reviewNote)}</small>
        <div class="pix-review-card">
          <div><span>${escapeHtml(labels.product)}</span><strong>${escapeHtml(request.productName)}</strong></div>
          <div><span>${escapeHtml(labels.amount)}</span><strong>${escapeHtml(formatCurrencyBRL(request.amount))}</strong></div>
          <div><span>${escapeHtml(labels.orderId)}</span><strong>${escapeHtml(request.id)}</strong></div>
        </div>
      </div>
    `, `
      <footer class="template-preview-footer access-actions pix-payment-actions">
        <button class="primary-button" type="button" data-pix-history>${escapeHtml(labels.viewMyPayments)}</button>
        <button class="secondary-button" type="button" data-pix-dashboard>${escapeHtml(labels.backDashboard)}</button>
      </footer>
    `, labels.reviewTitle, labels.reviewText);
    modal.querySelector("[data-pix-history]")?.addEventListener("click", () => {
      closeAccessModal();
      setRoute("/dashboard/billing");
      window.setTimeout(() => document.querySelector(".payment-history-card")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    });
    modal.querySelector("[data-pix-dashboard]")?.addEventListener("click", () => {
      closeAccessModal();
      setRoute("/dashboard");
    });
  };

  renderDataStep();
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
  modal.querySelector("[data-watermark-paid]")?.addEventListener("click", () => openPixPaymentModal("remove_watermark", { resumeId }));
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
  if (!template || (!isTemplateActive(template) && context !== "builder")) return;
  const root = document.body || document.getElementById("app");
  const existing = document.querySelector(".template-preview-modal");
  if (existing) existing.remove();
  const currentResume = context === "builder" ? document.querySelector(".builder-preview .resume-document-shell") : null;
  const resumeMarkup = currentResume ? currentResume.outerHTML : sampleResumeDocument(template.key, selectedDocumentFormat);
  const previewTitle = template.key === "first-job" && currentLanguage === "pt" ? "Primeiro Emprego" : template.name;
  const modal = document.createElement("div");
  modal.className = "template-preview-modal resume-only-preview-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-modal-close></div>
    <section class="template-preview-dialog template-preview-premium-dialog template-preview-resume-only-dialog" role="dialog" aria-modal="true" aria-label="${previewTitle}">
      <button class="icon-button template-preview-floating-close" type="button" data-modal-close aria-label="${copy.dashboard.close}">${icon("close")}</button>
      <div class="template-preview-content">
        ${resumeMarkup}
      </div>
    </section>
  `;
  root.appendChild(modal);
  updateResumePreviewScales(modal);
  window.requestAnimationFrame(() => updateResumePreviewScales(modal));
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") modal.remove();
  });
  modal.querySelector(".template-preview-floating-close")?.focus();
  modal.querySelectorAll("[data-pdf-export]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelPendingResumeAutosave();
      exportResumePdf(button);
    });
  });
  modal.querySelectorAll("[data-document-format]").forEach((button) => {
    button.addEventListener("click", () => {
      setDocumentFormat(button.getAttribute("data-document-format"));
      document.querySelectorAll("[data-document-format]").forEach((item) => {
        item.classList.toggle("active", normalizeDocumentFormat(item.getAttribute("data-document-format")) === selectedDocumentFormat);
      });
      document.querySelectorAll(".resume-document, .resume-document-shell, .template-paper").forEach((item) => applyDocumentFormatClass(item));
      updateResumePreviewScales();
      window.requestAnimationFrame(() => updateResumePreviewScales(modal));
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
        openFeatureLockModal(templateLockFeature(getTemplateByKey(selectedTemplateKey)), { templateKey: selectedTemplateKey });
        return;
      }
      if (!pendingTemplateChangeDraft && !canUseFeature("unlimited_resumes") && loadResumes().length >= 1) {
        openFeatureLockModal("unlimited_resumes");
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
  const previewFormat = normalizeDocumentFormat(resume.documentFormat);
  const copy = t();
  const root = document.body || document.getElementById("app");
  const existing = document.querySelector(".template-preview-modal");
  if (existing) existing.remove();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal resume-only-preview-modal resume-data-preview-modal";
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-modal-close></div>
    <section class="template-preview-dialog template-preview-premium-dialog template-preview-resume-only-dialog resume-preview-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(resume.title)}">
      <button class="icon-button template-preview-floating-close" type="button" data-modal-close aria-label="${copy.dashboard.close}">${icon("close")}</button>
      <div class="template-preview-content resume-preview-content">${resumeDocument(resume.selectedTemplate, previewFormat, resume)}</div>
      <footer class="resume-preview-floating-actions">
        <span class="pdf-export-status modal-pdf-status" data-pdf-status role="status" aria-live="polite"></span>
        <span class="resume-preview-floating-meta">${escapeHtml(template?.name || "")} · ${previewFormat === "letter" ? copy.builder.usLetter : copy.builder.a4}</span>
        <button class="secondary-button" type="button" data-edit-resume="${resume.id}" data-route="/dashboard/builder">${copy.dashboard.library.actions[0]}</button>
        <button class="secondary-button" type="button" data-pdf-export-resume="${resume.id}">${resumeLabels().downloadPdf}</button>
        <button class="primary-button" type="button" data-modal-close>${copy.builder.continueEditing}</button>
      </footer>
    </section>
  `;
  root.appendChild(modal);
  updateResumePreviewScales(modal);
  window.requestAnimationFrame(() => updateResumePreviewScales(modal));
  modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", () => modal.remove()));
  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") modal.remove();
  });
  modal.querySelector(".template-preview-floating-close")?.focus();
  modal.querySelectorAll("[data-edit-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelPendingResumeAutosave();
      loadResumeIntoBuilder(button.getAttribute("data-edit-resume"));
      preferCollapsedSidebarForBuilder();
      modal.remove();
      setRoute("/dashboard/builder");
    });
  });
  modal.querySelectorAll("[data-pdf-export-resume]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      cancelPendingResumeAutosave();
      exportResumeDataPdf(button.getAttribute("data-pdf-export-resume"), button);
    });
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

function curatedSampleResume(template = "professional") {
  if (template === "tech") {
    return createBlankResume({
      selectedTemplate: template,
      personal: {
        fullName: "Amanda Silva",
        title: "Product Manager",
        email: "amanda.silva@email.com",
        phone: "+55 11 98765-4321",
        location: currentLanguage === "pt" ? "Sao Paulo, Brasil" : "Sao Paulo, Brazil",
      },
      summary: currentLanguage === "pt"
        ? "Product Manager com 6+ anos em produtos digitais, estratégia, pesquisa com usuários, dados e execução ágil."
        : "Product Manager with 6+ years in digital products, strategy, user research, data and agile delivery.",
      workExperience: currentLanguage === "pt"
        ? [
          {
            role: "Senior Product Manager",
            company: "Nexora Labs",
            location: "Sao Paulo, Brasil",
            period: "2021 - Presente",
            achievements: [
              "Liderou plataforma SaaS usada por 50 mil empresas.",
              "Definiu roadmap e elevou NPS de 32 para 62.",
              "Entregou features com design, engenharia e dados.",
            ],
          },
          {
            role: "Product Manager",
            company: "Trackin Inc.",
            location: "Remoto",
            period: "2019 - 2021",
            achievements: [
              "Conduziu discovery e lançamento web/mobile.",
              "Validou soluções com pesquisa e testes.",
              "Reduziu churn em 18% com novo onboarding.",
            ],
          },
          {
            role: "Associate Product Analyst",
            company: "Visiona Tech",
            location: "Sao Paulo, Brasil",
            period: "2017 - 2019",
            achievements: [
              "Analisou dados para definir KPIs.",
              "Criou dashboards de performance.",
            ],
          },
        ]
        : [
          {
            role: "Senior Product Manager",
            company: "Nexora Labs",
            location: "Sao Paulo, Brazil",
            period: "2021 - Present",
            achievements: [
              "Led a SaaS platform used by 50k+ companies.",
              "Defined roadmap and raised NPS from 32 to 62.",
              "Shipped features with design, engineering and data.",
            ],
          },
          {
            role: "Product Manager",
            company: "Trackin Inc.",
            location: "Remote",
            period: "2019 - 2021",
            achievements: [
              "Owned discovery to launch for web/mobile apps.",
              "Validated solutions with research and tests.",
              "Reduced churn by 18% with onboarding updates.",
            ],
          },
          {
            role: "Associate Product Analyst",
            company: "Visiona Tech",
            location: "Sao Paulo, Brazil",
            period: "2017 - 2019",
            achievements: [
              "Analyzed product data and KPIs.",
              "Built performance dashboards.",
            ],
          },
        ],
      education: [
        { degree: currentLanguage === "pt" ? "M.Sc. em Ciencia da Computacao" : "M.Sc. in Computer Science", school: currentLanguage === "pt" ? "Universidade de Sao Paulo (USP)" : "University of Sao Paulo (USP)", period: "2015 - 2017" },
        { degree: currentLanguage === "pt" ? "B.Sc. em Sistemas de Informacao" : "B.Sc. in Information Systems", school: currentLanguage === "pt" ? "Universidade Federal do Rio de Janeiro (UFRJ)" : "Federal University of Rio de Janeiro (UFRJ)", period: "2011 - 2015" },
      ],
      skills: ["Product Strategy", "Analytics", "SQL", "Figma", "Leadership"],
      languages: currentLanguage === "pt" ? ["Portugues - Nativo", "Ingles - Fluente", "Espanhol - Intermediario"] : ["Portuguese - Native", "English - Fluent", "Spanish - Intermediate"],
      certifications: ["PSPO I - Scrum.org, 2022", "Google Analytics 4 - Google, 2021", "Product Management Certificate - Product School, 2020"],
      projects: currentLanguage === "pt"
        ? ["InsightHub Platform - Plataforma analytics para SMBs. Resultado: 40% mais adocao em 3 meses.", "Mobile App Redesign - Nova experiencia baseada em pesquisa. Resultado: 25% mais ativacao.", "Pricing Experiment - Testes de pricing e pacotes. Resultado: 17% mais MRR."]
        : ["InsightHub Platform - Analytics platform for SMBs. Result: 40% more adoption in 3 months.", "Mobile App Redesign - New research-based experience. Result: 25% more activation.", "Pricing Experiment - Pricing and packaging tests. Result: 17% more MRR."],
      professionalLinks: ["linkedin.com/in/amandasilva"],
    });
  }
  if (template === "professional") {
    return createBlankResume({
      selectedTemplate: template,
      personal: {
        fullName: "Carlos Mendes",
        title: currentLanguage === "pt" ? "Analista de Marketing" : "Marketing Analyst",
        email: "carlos.mendes@email.com",
        phone: currentLanguage === "pt" ? "(11) 98765-4321" : "+55 11 98765-4321",
        location: currentLanguage === "pt" ? "Sao Paulo, SP, Brasil" : "Sao Paulo, Brazil",
      },
      summary: currentLanguage === "pt"
        ? "Analista de marketing com 5+ anos em campanhas digitais, analise de metricas, branding e geracao de demanda. Focado em resultados, comunicacao clara e estrategias que conectam marcas ao publico."
        : "Marketing analyst with 5+ years in digital campaigns, metrics analysis, branding and demand generation. Focused on results, clear communication and strategies that connect brands with audiences.",
      workExperience: currentLanguage === "pt"
        ? [
          {
            role: "Analista de Marketing Pleno",
            company: "Agencia Next Level",
            location: "Sao Paulo, SP",
            period: "2021 - Atual",
            achievements: [
              "Desenvolveu estrategias digitais para clientes de tecnologia e servicos.",
              "Analisou campanhas e indicadores para otimizacao continua.",
              "Coordenou times e parceiros para entrega de projetos.",
              "Aumentou em 35% a geracao de leads qualificados.",
            ],
          },
          {
            role: "Analista de Marketing Junior",
            company: "StartGrow",
            location: "Sao Paulo, SP",
            period: "2019 - 2021",
            achievements: [
              "Apoiou campanhas de midia paga e conteudo.",
              "Monitorou KPIs e preparou relatorios de performance.",
              "Contribuiu para aumento de 20% no engajamento organico.",
            ],
          },
          {
            role: "Assistente de Marketing",
            company: "BrandUp",
            location: "Sao Paulo, SP",
            period: "2018 - 2019",
            achievements: [
              "Apoiou eventos, branding e comunicacao interna.",
              "Criou materiais graficos e apresentacoes.",
            ],
          },
        ]
        : [
          {
            role: "Marketing Analyst",
            company: "Next Level Agency",
            location: "Sao Paulo, Brazil",
            period: "2021 - Present",
            achievements: [
              "Developed digital strategies for technology and services clients.",
              "Analyzed campaign performance and KPIs for continuous optimization.",
              "Coordinated internal teams and partners to deliver projects.",
              "Increased qualified lead generation by 35%.",
            ],
          },
          {
            role: "Junior Marketing Analyst",
            company: "StartGrow",
            location: "Sao Paulo, Brazil",
            period: "2019 - 2021",
            achievements: [
              "Supported paid media and content campaigns.",
              "Monitored KPIs and prepared performance reports.",
              "Contributed to a 20% increase in organic engagement.",
            ],
          },
          {
            role: "Marketing Assistant",
            company: "BrandUp",
            location: "Sao Paulo, Brazil",
            period: "2018 - 2019",
            achievements: [
              "Supported events, branding and internal communications.",
              "Created graphic materials and presentations.",
            ],
          },
        ],
      education: [
        { degree: currentLanguage === "pt" ? "Bacharelado em Marketing" : "Bachelor's Degree in Marketing", school: currentLanguage === "pt" ? "Universidade de Sao Paulo (USP)" : "University of Sao Paulo (USP)", period: "2014 - 2017" },
        { degree: currentLanguage === "pt" ? "Tecnico em Administracao" : "Technical Program in Administration", school: currentLanguage === "pt" ? "Etec de Sao Paulo" : "Etec Sao Paulo", period: "2011 - 2013" },
      ],
      skills: currentLanguage === "pt"
        ? ["Marketing Digital", "Midia Paga", "SEO", "Google Analytics", "Inbound Marketing", "CRM", "Redes Sociais", "Excel Avancado", "Copywriting", "Comunicacao", "Analise de Dados"]
        : ["Digital Marketing", "Paid Media", "SEO", "Google Analytics", "Inbound Marketing", "CRM", "Social Media", "Advanced Excel", "Copywriting", "Communication", "Data Analysis"],
      languages: currentLanguage === "pt" ? ["Portugues - Nativo", "Ingles - Avancado"] : ["Portuguese - Native", "English - Advanced"],
      certifications: currentLanguage === "pt"
        ? ["Google Analytics Individual Qualification - Google - 2023", "Meta Blueprint Certified - Meta - 2022", "HubSpot Content Marketing Certification - HubSpot Academy - 2021"]
        : ["Google Analytics Individual Qualification - Google - 2023", "Meta Blueprint Certified - Meta - 2022", "HubSpot Content Marketing Certification - HubSpot Academy - 2021"],
      projects: currentLanguage === "pt"
        ? ["Marketing Digital na Pratica - Rock Content", "Google Analytics para Iniciantes - Google", "Copywriting e Storytelling - Conquer"]
        : ["Practical Digital Marketing - Rock Content", "Google Analytics for Beginners - Google", "Copywriting and Storytelling - Conquer"],
      professionalLinks: ["linkedin.com/in/carlosmendes", "carlosmendes.com.br"],
    });
  }
  if (template === "sales") {
    return createBlankResume({
      selectedTemplate: template,
      personal: {
        fullName: "Amanda Silva",
        title: currentLanguage === "pt" ? "Account Executive" : "Account Executive",
        email: "amanda.silva@email.com",
        phone: "+55 11 98765-4321",
        location: currentLanguage === "pt" ? "Sao Paulo, SP" : "Sao Paulo, Brazil",
      },
      summary: currentLanguage === "pt"
        ? "Profissional de vendas B2B com 6+ anos em gestao de contas estrategicas, prospeccao consultiva, CRM e crescimento de receita. Atua na construcao de relacionamentos de longo prazo, previsibilidade de pipeline e negociacoes orientadas a valor."
        : "B2B sales professional with 6+ years in strategic account management, consultative prospecting, CRM and revenue growth. Strong background building long-term client relationships, pipeline predictability and value-led negotiations.",
      workExperience: currentLanguage === "pt"
        ? [
          {
            role: "Account Executive",
            company: "Tech Solutions SaaS",
            location: "Sao Paulo, SP",
            period: "2021 - Atual",
            achievements: [
              "Gerenciei carteira de clientes estrategicos B2B e negociei renovacoes de alto valor.",
              "Atingi 135% da meta anual em 2023 com expansao de contas e novos contratos.",
              "Influenciei R$ 1,2M em receita com propostas consultivas e gestao ativa de pipeline.",
            ],
          },
          {
            role: "Executiva de Vendas Pleno",
            company: "Solucoes Digitais",
            location: "Sao Paulo, SP",
            period: "2019 - 2021",
            achievements: [
              "Estruturei funil comercial, cadencias de follow-up e demonstracoes para decisores.",
              "Aumentei em 28% a conversao entre oportunidades qualificadas e fechamento.",
              "Gerei +42% em leads qualificados em parceria com marketing e pre-vendas.",
            ],
          },
          {
            role: "Executiva de Vendas Junior",
            company: "StartUp Solucoes",
            location: "Sao Paulo, SP",
            period: "2017 - 2019",
            achievements: [
              "Qualifiquei leads, agendei reunioes e apoiei propostas comerciais.",
              "Superei metas por 6 trimestres consecutivos com prospeccao ativa.",
            ],
          },
        ]
        : [
          {
            role: "Account Executive",
            company: "Tech Solutions SaaS",
            location: "Sao Paulo, Brazil",
            period: "2021 - Present",
            achievements: [
              "Managed a portfolio of strategic B2B accounts and negotiated high-value renewals.",
              "Reached 135% of annual quota in 2023 through account expansion and new contracts.",
              "Influenced R$ 1.2M in revenue with consultative proposals and active pipeline management.",
            ],
          },
          {
            role: "Sales Executive",
            company: "Digital Solutions",
            location: "Sao Paulo, Brazil",
            period: "2019 - 2021",
            achievements: [
              "Structured sales funnel, follow-up cadences and executive demos for decision makers.",
              "Increased conversion from qualified opportunities to closed deals by 28%.",
              "Generated +42% qualified leads through sales and marketing alignment.",
            ],
          },
          {
            role: "Junior Sales Executive",
            company: "StartUp Solutions",
            location: "Sao Paulo, Brazil",
            period: "2017 - 2019",
            achievements: [
              "Qualified leads, booked meetings and supported commercial proposals.",
              "Exceeded targets for 6 consecutive quarters through active prospecting.",
            ],
          },
        ],
      education: [{ degree: currentLanguage === "pt" ? "Bacharelado em Administracao de Empresas" : "Bachelor's Degree in Business Administration", school: currentLanguage === "pt" ? "Universidade Presbiteriana Mackenzie" : "Mackenzie Presbyterian University", period: "2013 - 2017" }],
      skills: currentLanguage === "pt"
        ? ["Negociacao", "Prospeccao", "Vendas B2B", "CRM", "Gestao de Pipeline", "Follow-up", "Relacionamento com Cliente", "Comunicacao", "Apresentacao", "Analise de Dados", "Fechamento", "Planejamento Comercial"]
        : ["Negotiation", "Prospecting", "B2B Sales", "CRM", "Pipeline Management", "Follow-up", "Client Relationship", "Communication", "Presentation", "Data Analysis", "Closing", "Commercial Planning"],
      languages: currentLanguage === "pt" ? ["Portugues - Nativo", "Ingles - Avancado"] : ["Portuguese - Native", "English - Advanced"],
      certifications: currentLanguage === "pt"
        ? ["HubSpot Sales Software Certification - HubSpot Academy - 2023", "LinkedIn Sales Navigator Essential Training - LinkedIn Learning - 2022", "Sales Management Fundamentals - Gong Academy - 2021", "Salesforce Fundamentals for Sales Professionals - Salesforce Trailhead - 2020"]
        : ["HubSpot Sales Software Certification - HubSpot Academy - 2023", "LinkedIn Sales Navigator Essential Training - LinkedIn Learning - 2022", "Sales Management Fundamentals - Gong Academy - 2021", "Salesforce Fundamentals for Sales Professionals - Salesforce Trailhead - 2020"],
      projects: currentLanguage === "pt"
        ? [
          "Reestruturacao do Funil de Vendas - Redesenhei etapas de qualificacao e aumentei em 27% a taxa de conversao.",
          "Expansao de Contas Estrategicas - Desenvolvi estrategia de upsell e cross-sell, gerando 35% de crescimento no faturamento das contas existentes.",
          "Programa de Recuperacao de Clientes - Reativei clientes inativos e recuperei 18% da receita perdida.",
          "Padronizacao do Processo de Prospeccao - Criei cadencias e playbooks, gerando +40% em reunioes qualificadas.",
          "Curso: Negociacao de Alta Performance - Instituto Brasileiro de Vendas",
          "Curso: Customer Success: Estrategias e Metricas - Reev",
          "Curso: Excel Avancado para Negocios - Udemy",
        ]
        : [
          "Sales Funnel Restructure - Redesigned qualification stages and increased conversion rate by 27%.",
          "Strategic Account Expansion - Built upsell and cross-sell strategy, generating 35% growth across existing accounts.",
          "Customer Recovery Program - Reactivated dormant customers and recovered 18% of lost revenue.",
          "Prospecting Process Standardization - Created cadences and playbooks, generating +40% qualified meetings.",
          "Course: High-Performance Negotiation - Brazilian Sales Institute",
          "Course: Customer Success: Strategy and Metrics - Reev",
          "Course: Advanced Excel for Business - Udemy",
        ],
      professionalLinks: ["linkedin.com/in/amandasilva"],
    });
  }
  if (template === "senior-executive") {
    return createBlankResume({
      selectedTemplate: template,
      personal: {
        fullName: "Patrick Justino",
        title: currentLanguage === "pt" ? "Supervisor Administrativo" : "Administrative Supervisor",
        email: "patrickkevyn@gmail.com",
        phone: "+55 27 99999-9999",
        location: currentLanguage === "pt" ? "Serra, Espirito Santo" : "Serra, Espirito Santo",
      },
      summary: currentLanguage === "pt"
        ? "Profissional com mais de 8 anos de experiencia em gestao administrativa, financeira e de pessoas. Atuacao estrategica na otimizacao de processos, reducao de custos e melhoria de resultados, com forte habilidade analitica, visao sistemica e foco em eficiencia operacional."
        : "Professional with 8+ years of experience in administrative, financial and people management. Strategic background in process optimization, cost reduction and performance improvement, with analytical thinking, systems view and operational efficiency focus.",
      workExperience: currentLanguage === "pt"
        ? [
          {
            role: "Supervisor Administrativo",
            company: "Grupo Solucao Logistica",
            location: "Serra, ES",
            period: "03/2021 - Atual",
            achievements: [
              "Supervisiono rotinas administrativas e financeiras da operacao, garantindo eficiencia, compliance e qualidade nos processos.",
              "Lidero uma equipe de 12 profissionais, promovendo desenvolvimento, engajamento e alta performance.",
              "Implanto indicadores e dashboards para acompanhamento de resultados e tomada de decisao.",
              "Estruturo e padronizo processos, gerando ganhos de eficiencia e reducao de retrabalho.",
            ],
          },
          {
            role: "Analista Administrativo Senior",
            company: "TecnoServ Servicos Empresariais",
            location: "Vitoria, ES",
            period: "06/2017 - 02/2021",
            achievements: [
              "Realizei analise financeira e acompanhamento de despesas para decisoes estrategicas.",
              "Apoiei a lideranca na gestao de contratos, fornecedores e indicadores de desempenho.",
              "Participei de projetos de melhoria de processos e reducao de custos operacionais.",
            ],
          },
        ]
        : [
          {
            role: "Administrative Supervisor",
            company: "Solution Logistics Group",
            location: "Serra, ES",
            period: "03/2021 - Present",
            achievements: [
              "Supervise administrative and financial routines, ensuring efficiency, compliance and process quality.",
              "Lead a team of 12 professionals, promoting development, engagement and high performance.",
              "Implement KPI dashboards for performance tracking and decision making.",
              "Structure and standardize processes, improving efficiency and reducing rework.",
            ],
          },
          {
            role: "Senior Administrative Analyst",
            company: "TecnoServ Business Services",
            location: "Vitoria, ES",
            period: "06/2017 - 02/2021",
            achievements: [
              "Performed financial analysis and expense monitoring to support strategic decisions.",
              "Supported leadership with contracts, suppliers and performance indicators.",
              "Participated in process improvement and operational cost reduction projects.",
            ],
          },
        ],
      education: [{ degree: currentLanguage === "pt" ? "Bacharelado em Administracao" : "Bachelor's Degree in Business Administration", school: currentLanguage === "pt" ? "Universidade Federal do Espirito Santo (UFES)" : "Federal University of Espirito Santo (UFES)", period: "2013 - 2016" }],
      skills: currentLanguage === "pt"
        ? ["Gestao de Equipes", "Planejamento Estrategico", "Controle Orcamentario", "Analise de Indicadores", "Processos e Melhoria Continua", "Excel Avancado", "Power BI", "Comunicacao e Negociacao"]
        : ["Team Management", "Strategic Planning", "Budget Control", "KPI Analysis", "Process Improvement", "Advanced Excel", "Power BI", "Communication and Negotiation"],
      languages: currentLanguage === "pt" ? ["Portugues - Nativo", "Ingles - Avancado (C1)", "Espanhol - Intermediario (B1)"] : ["Portuguese - Native", "English - Advanced (C1)", "Spanish - Intermediate (B1)"],
      certifications: currentLanguage === "pt"
        ? ["CPA-20 - Certificacao Profissional ANBIMA", "Excel Avancado - Fundacao Bradesco", "Power BI para Negocios - Data Science Academy", "Lideranca e Gestao de Pessoas - FGV Online"]
        : ["CPA-20 - ANBIMA Professional Certification", "Advanced Excel - Bradesco Foundation", "Power BI for Business - Data Science Academy", "Leadership and People Management - FGV Online"],
      projects: currentLanguage === "pt"
        ? ["Projeto de Reducao de Custos Operacionais - Lideranca do projeto que identificou oportunidades de economia e renegociacao com fornecedores, resultando em reducao de 18% nos custos anuais.", "Implantacao de Dashboard Gerencial - Desenvolvimento e implantacao de painel de indicadores em Power BI para aumentar a agilidade e precisao das analises."]
        : ["Operational Cost Reduction Project - Led a project that identified savings and supplier renegotiation opportunities, reducing annual costs by 18%.", "Management Dashboard Implementation - Developed and implemented Power BI KPI dashboards to improve analysis speed and accuracy."],
      professionalLinks: ["linkedin.com/in/patrickjustino"],
    });
  }
  if (template === "creative") {
    return createBlankResume({
      selectedTemplate: template,
      personal: {
        fullName: "Amanda Silva",
        title: currentLanguage === "pt" ? "Estrategista de Conteudo" : "Content Strategist",
        email: "amanda@email.com",
        phone: "+55 11 90000-0000",
        location: currentLanguage === "pt" ? "Sao Paulo, Brasil" : "Sao Paulo, Brazil",
      },
      summary: currentLanguage === "pt"
        ? "Profissional criativa com experiencia em conteudo, marca e campanhas digitais. Atua na criacao de narrativas, organizacao de projetos e desenvolvimento de materiais para fortalecer presenca de marca e gerar engajamento."
        : "Creative professional experienced in content, brand and digital campaigns. Skilled at shaping narratives, organizing creative projects and developing assets that strengthen brand presence and engagement.",
      workExperience: currentLanguage === "pt"
        ? [
          {
            role: "Estrategista de Conteudo",
            company: "Studio Aurora",
            location: "Sao Paulo, Brasil",
            period: "2021 - Atual",
            achievements: [
              "Planejou campanhas editoriais para redes sociais, blog e materiais de marca.",
              "Organizou calendarios de conteudo e alinhou entregas com design, produto e marketing.",
              "Criou narrativas para lancamentos, apresentacoes comerciais e acoes de relacionamento.",
            ],
          },
          {
            role: "Analista de Marketing Criativo",
            company: "Bright Media",
            location: "Sao Paulo, Brasil",
            period: "2018 - 2021",
            achievements: [
              "Apoiou campanhas digitais com foco em comunicacao clara e identidade visual.",
              "Produziu briefings, pecas de conteudo e relatorios para otimizacao criativa.",
            ],
          },
        ]
        : [
          {
            role: "Content Strategist",
            company: "Studio Aurora",
            location: "Sao Paulo, Brazil",
            period: "2021 - Present",
            achievements: [
              "Planned editorial campaigns for social, blog and brand assets.",
              "Managed content calendars and aligned deliverables with design, product and marketing.",
              "Created narratives for launches, sales presentations and relationship campaigns.",
            ],
          },
          {
            role: "Creative Marketing Analyst",
            company: "Bright Media",
            location: "Sao Paulo, Brazil",
            period: "2018 - 2021",
            achievements: [
              "Supported digital campaigns focused on clear communication and visual identity.",
              "Produced briefs, content pieces and reports for creative optimization.",
            ],
          },
        ],
      education: [{ degree: currentLanguage === "pt" ? "Publicidade e Propaganda" : "Advertising and Communications", school: currentLanguage === "pt" ? "Universidade Exemplo" : "Example University", period: "2014 - 2018" }],
      skills: currentLanguage === "pt"
        ? ["Estrategia de Conteudo", "Branding", "Campanhas Digitais", "Storytelling", "Redes Sociais", "Briefing Criativo"]
        : ["Content Strategy", "Branding", "Digital Campaigns", "Storytelling", "Social Media", "Creative Briefing"],
      languages: currentLanguage === "pt" ? ["Portugues - Nativo", "Ingles - Avancado"] : ["Portuguese - Native", "English - Advanced"],
      certifications: currentLanguage === "pt" ? ["Brand Strategy - 2024", "Marketing de Conteudo - 2023"] : ["Brand Strategy - 2024", "Content Marketing - 2023"],
      projects: currentLanguage === "pt"
        ? ["Campanha de reposicionamento de marca - Desenvolvimento de narrativa, linha editorial e pecas para canais digitais."]
        : ["Brand repositioning campaign - Developed narrative, editorial direction and assets for digital channels."],
      professionalLinks: ["Portfolio", "LinkedIn"],
    });
  }
  const sample = sampleResumeData();
  return createBlankResume({
    selectedTemplate: template,
    personal: {
      fullName: sample.name,
      title: sample.role,
      email: sample.email,
      phone: sample.phone,
      location: sample.location,
    },
    summary: sample.summary,
    workExperience: sample.experiences.map(([role, company, period, bullets]) => ({
      role,
      company,
      period,
      location: currentLanguage === "pt" ? "Sao Paulo, Brasil" : "Sao Paulo, Brazil",
      achievements: bullets,
    })),
    education: [{ degree: sample.education[0], school: sample.education[1], period: sample.education[2] }],
    skills: sample.skills,
    languages: sample.languages,
    certifications: sample.certifications,
    projects: sample.projects.map(([name, text]) => `${name} - ${text}`),
    professionalLinks: sample.links,
  });
}

function sampleResumeDocument(template = "modern", format = selectedDocumentFormat) {
  if (template === "modern") return resumeDocument("modern", format, modernSampleResume());
  if (template === "executive") return resumeDocument("executive", format, executiveSampleResume());
  if (template === "minimal") return resumeDocument("minimal", format, minimalAtsSampleResume());
  if (template === "student") return resumeDocument("student", format, studentSampleResume());
  if (template === "first-job") return resumeDocument("first-job", format, firstJobSampleResume());
  if (template === "simple-ats") return resumeDocument("simple-ats", format, simpleAtsSampleResume());
  return resumeDocument(template, format, curatedSampleResume(template));
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

function createResumePreviewExportShell({ template, format, resume, source }) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const holder = document.createElement("div");
  if (resume) {
    holder.innerHTML = resumeDocument(template || resume.selectedTemplate || selectedTemplateKey, normalizedFormat, resume);
    return holder.querySelector(".resume-document-shell");
  }

  const documentNode = source?.cloneNode(true);
  if (!documentNode) return null;
  documentNode.removeAttribute("style");
  documentNode.removeAttribute("data-preview-scaled");
  documentNode.classList.remove("pdf-export-document");
  applyDocumentFormatClass(documentNode, normalizedFormat);

  const shell = document.createElement("div");
  shell.className = `resume-document-shell ${documentFormatClass(normalizedFormat)}`;
  shell.setAttribute("data-document-format-current", normalizedFormat);
  shell.setAttribute("data-resume-document-shell", "");

  const wrapper = document.createElement("div");
  wrapper.className = "resume-page-scale-wrapper";
  wrapper.appendChild(documentNode);
  shell.appendChild(wrapper);
  return shell;
}

function prepareResumePreviewShellForPdf(shell, format) {
  const normalizedFormat = normalizeDocumentFormat(format);
  resetResumeShellPageVars(shell, normalizedFormat);
  const documentNode = shell.querySelector(".resume-document");
  if (documentNode) {
    documentNode.removeAttribute("style");
    documentNode.removeAttribute("data-preview-scaled");
    documentNode.classList.remove("pdf-export-document");
    applyDocumentFormatClass(documentNode, normalizedFormat);
    applyPdfPageVariables(documentNode, normalizedFormat);
  }
}

function fitResumePreviewShellToSinglePdfPage(shell, format) {
  const spec = documentPageSpec(format);
  applyResumeShellPreviewScale(shell, {
    format,
    availableWidth: spec.widthPx,
    availableHeight: spec.heightPx,
    maxScale: 1,
  });
}

function createResumePdfFitDocument({ template, format, resume, source, brandFree }) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const holder = document.createElement("div");
  if (resume) {
    holder.innerHTML = resumeDocument(template || resume.selectedTemplate || selectedTemplateKey, normalizedFormat, resume);
  }
  const sourceDocument = holder.querySelector(".resume-document") || source?.cloneNode(true);
  if (!sourceDocument) return null;
  const documentNode = sourceDocument.cloneNode(true);
  documentNode.classList.add("pdf-fit-export-document");
  documentNode.classList.remove("sample-resume-document", "pdf-export-document");
  documentNode.removeAttribute("style");
  documentNode.removeAttribute("data-preview-scaled");
  applyDocumentFormatClass(documentNode, normalizedFormat);
  applyPdfPageVariables(documentNode, normalizedFormat);
  documentNode.querySelectorAll("section").forEach((section) => {
    if (!sectionHasContent(section)) section.remove();
  });
  if (!brandFree) {
    const footer = document.createElement("footer");
    footer.className = "pdf-brand-footer";
    footer.textContent = "Created with Succeedora";
    documentNode.appendChild(footer);
  }
  return documentNode;
}

function measurePdfFitHeight(documentNode) {
  const rect = documentNode.getBoundingClientRect();
  const top = rect.top;
  const bottoms = [documentNode.scrollHeight];
  documentNode.querySelectorAll("header, section, footer, article, div, p, ul, li").forEach((node) => {
    const nodeRect = node.getBoundingClientRect();
    if (nodeRect.width || nodeRect.height) bottoms.push(nodeRect.bottom - top);
  });
  return Math.max(...bottoms);
}

function fitPdfDocumentToPage(documentNode, format) {
  if (!documentNode) return 1;
  const spec = documentPageSpec(format);
  let scale = 1;
  const layoutAtScale = (nextScale, final = false) => {
    const width = spec.widthPx / nextScale;
    const height = spec.heightPx / nextScale;
    documentNode.style.width = `${width}px`;
    documentNode.style.maxWidth = "none";
    documentNode.style.minWidth = "0";
    documentNode.style.height = final ? `${height}px` : "auto";
    documentNode.style.minHeight = final ? `${height}px` : "0";
    documentNode.style.margin = "0";
    documentNode.style.boxShadow = "none";
    documentNode.style.transform = final ? `scale(${nextScale})` : "none";
    documentNode.style.transformOrigin = "top left";
    documentNode.style.overflow = final ? "hidden" : "visible";
    documentNode.style.setProperty("--resume-page-width", `${width}px`);
    documentNode.style.setProperty("--resume-page-height", `${height}px`);
  };

  for (let index = 0; index < 4; index += 1) {
    layoutAtScale(scale, false);
    const contentHeight = Math.max(1, measurePdfFitHeight(documentNode));
    const nextScale = Math.max(0.54, Math.min(1, spec.heightPx / contentHeight));
    if (Math.abs(nextScale - scale) < 0.01) {
      scale = nextScale;
      break;
    }
    scale = nextScale;
  }

  layoutAtScale(scale, true);
  return scale;
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

function createPdfExportFullDocumentPage(stage, sourceDocument, format) {
  const state = createPdfExportPage(stage, sourceDocument, format);
  const documentNode = sourceDocument.cloneNode(true);
  state.content.replaceChildren(documentNode);
  return { ...state, documentNode };
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

function resumePdfPageBlocks(sourceDocument) {
  if (!sourceDocument?.classList?.contains("modern-resume")) return Array.from(sourceDocument.children);

  const orderedBlocks = [];
  const seen = new Set();
  const addBlock = (block) => {
    if (!block || seen.has(block)) return;
    seen.add(block);
    orderedBlocks.push(block);
  };
  const addSection = (selector) => addBlock(sourceDocument.querySelector(selector));

  addBlock(Array.from(sourceDocument.children).find((block) => block.classList?.contains("modern-header")));
  addSection(".modern-main-column > .modern-summary");
  addSection(".modern-sidebar > .modern-skills");
  addSection(".modern-main-column > .modern-experience");
  addSection(".modern-sidebar > .modern-education");
  addSection(".modern-main-column > .modern-projects");
  addSection(".modern-sidebar > .modern-languages");
  addSection(".modern-sidebar > .modern-certifications");
  addSection(".modern-sidebar > .modern-links");

  Array.from(sourceDocument.children).forEach((block) => {
    if (block.classList?.contains("modern-main-column") || block.classList?.contains("modern-sidebar")) return;
    addBlock(block);
  });

  return orderedBlocks.length ? orderedBlocks : Array.from(sourceDocument.children);
}

function buildResumePdfExport({ template, format, resume, source, brandFree }) {
  const normalizedFormat = normalizeDocumentFormat(format);
  const stage = createPdfExportStage(normalizedFormat);
  stage.classList.add("pdf-fit-export-stage");
  document.body.appendChild(stage);

  const sourceDocument = createResumePdfFitDocument({ template, format: normalizedFormat, resume, source, brandFree });
  if (!sourceDocument) throw new Error("Resume document unavailable");

  const page = document.createElement("div");
  page.className = `pdf-export-page pdf-fit-export-page ${documentFormatClass(normalizedFormat)}`;
  page.setAttribute("data-pdf-page", normalizedFormat);
  applyPdfPageVariables(page, normalizedFormat);

  const content = document.createElement("div");
  content.className = "pdf-fit-export-content";
  content.appendChild(sourceDocument);
  page.appendChild(content);
  stage.appendChild(page);
  fitPdfDocumentToPage(sourceDocument, normalizedFormat);

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
  if (document.fonts?.ready) await document.fonts.ready;
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
  cancelPendingResumeAutosave();
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
    if (document.fonts?.ready) await document.fonts.ready;
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
  cancelPendingResumeAutosave();
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
    if (document.fonts?.ready) await document.fonts.ready;
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
  const trustIcons = ["shield", "globe", "download"];
  const heroProductChips = currentLanguage === "pt" ? ["ATS", "Keywords", "Resumo", "Carta"] : ["ATS", "Keywords", "Summary", "Cover Letter"];
  const homeTemplates = resumeTemplates().slice(0, 6);
  const viewAllTemplatesLabel = currentLanguage === "pt" ? "Ver todos os modelos" : "View all templates";
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
            <div class="trust-row">${p.trust.map((item, index) => `<span>${icon(trustIcons[index] || "check")}${item}</span>`).join("")}</div>
          </div>
          <div class="hero-visual" aria-label="${p.secondaryCta}">
            <div class="hero-visual-glow" aria-hidden="true"></div>
            <div class="hero-product-chips" aria-hidden="true">
              ${heroProductChips.map((item) => `<span>${item}</span>`).join("")}
            </div>
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
          <div class="template-grid">${homeTemplates.map((template, index) => templateCard(template, index, false)).join("")}</div>
          <div class="templates-cta">
            <h3>${p.templatesCtaTitle}</h3>
            <a class="secondary-button" href="#/templates" data-route="/templates">${viewAllTemplatesLabel}</a>
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
  const accessLabel = templateAccessLabel(template);
  const accessClass = templateAccessClass(template);
  const searchText = `${template.name} ${template.category} ${template.description} ${template.bestForText} ${template.access}`.toLowerCase();
  return `
    <article class="template-card resume-template-card template-${template.key}" data-template-category="${template.key}" data-template-access="${template.access}" data-template-status="${template.status}" data-template-groups="${template.filterGroups.join(" ")}" data-template-search="${escapeHtml(searchText)}">
      ${templateCardPreviewMarkup(template.key)}
      <div class="template-card-meta">
        <div class="template-card-badges">
          <span>${template.category}</span>
          <span class="${accessClass}">${accessLabel}</span>
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
  const expiry = accessPlanExpiryLabel(access);
  return `${t().pricing.currentPlanLabel}: ${accessPlanLabel(access)}${expiry ? ` · ${expiry}` : ""}`;
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
  if (["pro", "premium"].includes(planKey) && stripeConfig.subscriptionsEnabled) {
    return `<button class="${featured ? "primary-button" : "secondary-button"} full" type="button" data-stripe-checkout="${planKey === "premium" ? "plan_premium" : "plan_pro"}">${copy.payments.subscribeWithCard}</button>`;
  }
  return `<button class="${featured ? "primary-button" : "secondary-button"} full" type="button" data-plan-placeholder>${copy.pricing.comingSoon}</button>`;
}

function pricingCard(name, price, items, featured, badge = "", index = 0, mode = "public") {
  const copy = t();
  const access = getUserAccess();
  const planKey = planKeyForIndex(index);
  const isCurrent = access.plan === planKey;
  const showCurrentState = mode !== "home" && mode !== "public" && isCurrent;
  const label = showCurrentState ? copy.pricing.currentPlanLabel : badge;
  const paymentLabel = mode === "home" ? `<span class="payment-soon-label">${copy.pricing.paymentComingSoon}</span>` : "";
  const paymentNote = planKey === "free" || mode === "home" || mode === "public" ? "" : `<p class="planned-payment-note">${copy.payments.secureStripe}${stripeConfig.installmentsEnabled ? ` ${copy.payments.cardInstallmentsNote}` : ""}</p>`;
  return `
    <article class="price-card ${mode === "home" ? "homepage-price-card" : ""} ${featured ? "featured" : ""} ${showCurrentState ? "current-plan-card" : ""}" data-plan="${planKey}">
      <div class="plan-card-head">
        ${label ? `<div class="popular ${showCurrentState ? "current" : ""}">${label}</div>` : `<div class="popular-spacer" aria-hidden="true"></div>`}
        <h3>${name}</h3>
        <div class="price"><strong>${price}</strong><span>${copy.pricing.perMonth}</span></div>
      </div>
      ${paymentLabel}
      ${paymentNote}
      <ul>${items.map((item) => `<li>${icon("check")} ${item}</li>`).join("")}</ul>
      ${pricingActionButton(planKey, featured, mode, showCurrentState)}
    </article>
  `;
}

function purchaseCard(name, price, label, items, featured = false, cta = "", productType = "premium_pdf") {
  const copy = t();
  const pixButtonLabel = currentLanguage === "pt" ? "Pix Brasil" : "Brazil Pix";
  const stripeButton = stripeConfig.oneTimePaymentsEnabled ? `<button class="${featured ? "primary-button" : "secondary-button"} full payment-option-button stripe-option" type="button" data-stripe-checkout="${productType}">${icon("card")} <span>${escapeHtml(copy.payments.payWithCard)}</span></button>` : "";
  return `
    <article class="price-card purchase-card ${featured ? "featured" : ""}">
      ${label ? `<div class="popular subtle">${label}</div>` : ""}
      <span class="plan-kicker">${copy.pricing.oneTime}</span>
      <h3>${name}</h3>
      <div class="price"><strong>${price}</strong></div>
      <p class="planned-payment-note stripe-note">${copy.payments.secureStripe}${stripeConfig.installmentsEnabled ? ` ${copy.payments.cardInstallmentsNote}` : ""}</p>
      <ul>${items.map((item) => `<li>${icon("check")} ${item}</li>`).join("")}</ul>
      <div class="payment-action-stack">
        <button class="${featured ? "secondary-button" : "ghost-button"} full payment-option-button pix-option" type="button" data-one-time-purchase data-pix-product="${productType}">${brazilFlagIcon()} <span>${escapeHtml(pixButtonLabel)}</span></button>
        ${stripeButton}
      </div>
    </article>
  `;
}

function creditCard(name, price, badge, items, featured = false, productType = "ai_credits_starter") {
  const copy = t();
  const pixButtonLabel = currentLanguage === "pt" ? "Pix Brasil" : "Brazil Pix";
  const stripeButton = stripeConfig.oneTimePaymentsEnabled ? `<button class="${featured ? "primary-button" : "secondary-button"} full payment-option-button stripe-option" type="button" data-stripe-checkout="${productType}">${icon("card")} <span>${escapeHtml(copy.payments.payWithCard)}</span></button>` : "";
  const creditAmount = AI_CREDIT_PRODUCT_AMOUNTS[productType] || AI_CREDIT_PRODUCT_AMOUNTS.ai_credits || 10;
  const creditLabel = currentLanguage === "pt" ? `${creditAmount} créditos de IA` : `${creditAmount} AI credits`;
  return `
    <article class="price-card credit-card ${featured ? "featured" : ""}">
      ${badge ? `<div class="popular">${badge}</div>` : ""}
      <span class="plan-kicker">${copy.pricing.creditsTitle}</span>
      <h3>${name}</h3>
      <div class="price"><strong>${price}</strong></div>
      <p class="credit-amount-pill">${escapeHtml(creditLabel)}</p>
      <p class="planned-payment-note stripe-note">${copy.payments.secureStripe}${stripeConfig.installmentsEnabled ? ` ${copy.payments.cardInstallmentsNote}` : ""}</p>
      <ul>${items.map((item) => `<li>${icon("sparkles")} ${item}</li>`).join("")}</ul>
      <div class="payment-action-stack">
        <button class="${featured ? "secondary-button" : "ghost-button"} full payment-option-button pix-option" type="button" data-buy-credits data-pix-product="${productType}">${brazilFlagIcon()} <span>${escapeHtml(pixButtonLabel)}</span></button>
        ${stripeButton}
      </div>
    </article>
  `;
}

function comparisonCell(value) {
  const normalized = String(value).trim().toLowerCase();
  const unavailable = normalized === "no" || normalized === "n\u00e3o" || normalized.includes("not included") || normalized.includes("n\u00e3o inclu");
  const indicator = unavailable ? `<span class="comparison-dash" aria-hidden="true">-</span>` : icon("check");
  return `<span class="comparison-value ${unavailable ? "is-unavailable" : ""}">${indicator}<span>${value}</span></span>`;
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
          <thead><tr><th>${pricing.featureColumnLabel || pricing.featureComparisonTitle}</th>${planNames.map((name, index) => `<th class="${index === 1 ? "is-pro-column" : ""}">${name}</th>`).join("")}</tr></thead>
          <tbody>
            ${pricing.comparisonRows.map((row) => `<tr><th>${row[0]}</th>${row.slice(1).map((cell, index) => `<td class="${index === 1 ? "is-pro-column" : ""}">${comparisonCell(cell)}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function settingsPaymentMethodsSection() {
  const pricing = t().pricing;
  return `
    <section class="settings-card settings-payment-methods-card">
      <div class="settings-card-head">
        <div>
          <span class="eyebrow">${pricing.plannedPaymentMethodsStatus}</span>
          <h2>${pricing.plannedPaymentMethodsTitle}</h2>
          <p>${pricing.plannedPaymentMethodsText}</p>
        </div>
      </div>
      <div class="payment-method-grid settings-payment-method-grid">
        ${pricing.paymentMethods.map(([name, description], index) => `
          <article class="payment-method-card">
            <div class="payment-method-icon">${index === 0 ? "Pix" : icon("card")}</div>
            <strong>${name}</strong>
            <span>${description}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function pricingFaqAccordion() {
  const pricing = t().pricing;
  return `
    <section class="monetization-block payment-faq">
      <div class="section-heading">
        <span class="eyebrow">FAQ</span>
        <h2>${pricing.paymentFaqTitle}</h2>
      </div>
      <div class="pricing-faq-list">
        ${pricing.paymentFaq.map(([q, a], index) => `
          <details class="pricing-faq-item" ${index === 0 ? "open" : ""}>
            <summary>${q}</summary>
            <p>${a}</p>
          </details>
        `).join("")}
      </div>
    </section>
  `;
}

function paymentHistorySection() {
  const labels = t().payments;
  const requests = loadPaymentRequests();
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(requests.length / pageSize));
  paymentHistoryPage = Math.min(Math.max(1, paymentHistoryPage), pageCount);
  const pageStart = (paymentHistoryPage - 1) * pageSize;
  const visibleRequests = requests.slice(pageStart, pageStart + pageSize);
  const pageLabel = currentLanguage === "pt"
    ? `P\u00e1gina ${paymentHistoryPage} de ${pageCount}`
    : `Page ${paymentHistoryPage} of ${pageCount}`;
  return `
    <section class="settings-card payment-history-card">
      <div class="settings-card-head">
        <div><span class="eyebrow">Pix / Stripe</span><h2>${labels.historyTitle}</h2></div>
      </div>
      ${requests.length ? `
        <div class="payment-history-list">
          ${visibleRequests.map((request) => `
            <article class="payment-history-item">
              <div>
                <strong>${escapeHtml(request.productName)}</strong>
                <span>${escapeHtml(formatPaymentDate(request.createdAt))}</span>
              </div>
              <div>
                <span>${escapeHtml(formatCurrencyBRL(request.amount))}</span>
                <small>${escapeHtml(labels.method)}: ${escapeHtml(request.paymentMethod === "stripe" ? labels.cardMethod : "Pix")}</small>
              </div>
              <em class="payment-status status-${escapeHtml(request.status)}">${escapeHtml(paymentStatusLabel(request.status))}</em>
              <button class="secondary-button small" type="button" data-payment-details="${escapeHtml(request.id)}">${escapeHtml(labels.viewDetails)}</button>
            </article>
          `).join("")}
        </div>
        ${pageCount > 1 ? `<div class="payment-history-pagination">
          <button class="icon-button" type="button" data-payment-history-page="${paymentHistoryPage - 1}" ${paymentHistoryPage <= 1 ? "disabled" : ""} aria-label="${currentLanguage === "pt" ? "P\u00e1gina anterior" : "Previous page"}">${icon("arrowLeft")}</button>
          <span>${escapeHtml(pageLabel)}</span>
          <button class="icon-button" type="button" data-payment-history-page="${paymentHistoryPage + 1}" ${paymentHistoryPage >= pageCount ? "disabled" : ""} aria-label="${currentLanguage === "pt" ? "Pr\u00f3xima p\u00e1gina" : "Next page"}">${icon("arrow")}</button>
        </div>` : ""}
      ` : `<p>${labels.historyEmpty}</p>`}
    </section>
  `;
}

function paymentDetailList(payment, { admin = false } = {}) {
  const labels = t().payments;
  const pixKeyLabel = `${payment.pixKeyType || paymentConfig.pixKeyType} ${formatPixKeyValue(payment.pixKey || paymentConfig.pixKey)}`;
  const rows = [
    [labels.orderId, `<code>${escapeHtml(payment.id)}</code>`],
    [labels.product, escapeHtml(payment.productName || adminPaymentLabel(payment))],
    [labels.amount, escapeHtml(formatCurrencyBRL(payment.amount))],
    [labels.method, payment.paymentMethod === "stripe" ? escapeHtml(labels.cardMethod) : "Pix"],
    [labels.status, `<span class="payment-status status-${escapeHtml(payment.status)}">${escapeHtml(paymentStatusLabel(payment.status))}</span>`],
    [labels.date, escapeHtml(formatPaymentDate(payment.createdAt))],
  ];
  if (payment.payerName) rows.splice(3, 0, [labels.fullName, escapeHtml(payment.payerName)]);
  if (payment.payerEmail) rows.splice(4, 0, [labels.contactEmail, escapeHtml(payment.payerEmail)]);
  if (payment.payerTaxId) rows.splice(5, 0, [labels.taxId, escapeHtml(payment.payerTaxId)]);
  if (payment.payerNote) rows.splice(6, 0, [labels.note, escapeHtml(payment.payerNote)]);
  if (payment.paymentMethod !== "stripe") rows.push([labels.pixKey, escapeHtml(pixKeyLabel)]);
  if (payment.confirmedByUserAt) rows.push([labels.confirmedAt, escapeHtml(formatPaymentDate(payment.confirmedByUserAt))]);
  if (payment.approvedAt) rows.push([labels.approvedAt, escapeHtml(formatPaymentDate(payment.approvedAt))]);
  if (payment.approvedBy) rows.push([labels.approvedBy, escapeHtml(payment.approvedBy)]);
  if (payment.rejectedAt) rows.push([labels.rejectedAt, escapeHtml(formatPaymentDate(payment.rejectedAt))]);
  if (payment.rejectedBy) rows.push([labels.rejectedBy, escapeHtml(payment.rejectedBy)]);
  if (payment.rejectionReason) rows.push([labels.rejectionReason, escapeHtml(payment.rejectionReason)]);
  if (payment.stripeSessionId) rows.push(["Stripe Session", `<code>${escapeHtml(payment.stripeSessionId)}</code>`]);
  if (payment.stripePaymentIntentId) rows.push(["Stripe PaymentIntent", `<code>${escapeHtml(payment.stripePaymentIntentId)}</code>`]);
  if (payment.stripeSubscriptionId) rows.push([labels.subscription, `<code>${escapeHtml(payment.stripeSubscriptionId)}</code>`]);
  if (payment.receiptUrl) rows.push([labels.receipt, `<a href="${escapeHtml(payment.receiptUrl)}" target="_blank" rel="noopener">${escapeHtml(labels.receipt)}</a>`]);
  if (["approved", "paid"].includes(payment.status)) rows.push([labels.status, escapeHtml(labels.approvedMessage || labels.approved)]);
  if (payment.status === "rejected") rows.push([labels.status, escapeHtml(labels.rejectedMessage || labels.rejected)]);
  if (admin && payment.pixPayload) rows.push([labels.pixPayload, `<code>${escapeHtml(payment.pixPayload)}</code>`]);
  return `
    <dl class="payment-detail-list">
      ${rows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${value}</dd></div>`).join("")}
    </dl>
  `;
}

function openPaymentDetailsModal(paymentId) {
  const labels = t().payments;
  const payment = loadPaymentRequests().find((request) => request.id === paymentId);
  if (!payment) return;
  const canConfirmPixPayment = payment.paymentMethod !== "stripe" && payment.status === "pending_payment";
  closeAccessModal();
  const modal = document.createElement("div");
  modal.className = "template-preview-modal access-modal payment-detail-modal";
  const closeDetailModal = () => {
    closeAccessModal();
    if (getRoute() === "/dashboard/billing") render();
  };
  modal.innerHTML = `
    <div class="template-preview-backdrop" data-access-close></div>
    <section class="template-preview-dialog payment-detail-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(labels.viewDetails)}">
      <header class="template-preview-header">
        <div>
          <span class="eyebrow">${escapeHtml(labels.historyTitle)}</span>
          <h2>${escapeHtml(payment.productName || labels.title)}</h2>
        </div>
        <button class="icon-button" type="button" data-access-close aria-label="${t().dashboard.close}">${icon("close")}</button>
      </header>
      <div class="template-preview-content payment-detail-content">
        ${paymentDetailList(payment)}
        <label class="pix-copy-field">
          <span>${escapeHtml(labels.pixCopyPaste)}</span>
          <textarea readonly data-pix-code>${escapeHtml(payment.pixPayload || "")}</textarea>
        </label>
      </div>
      <footer class="template-preview-footer access-actions">
        ${canConfirmPixPayment ? `<button class="primary-button" type="button" data-payment-confirm>${escapeHtml(labels.completed)}</button>` : ""}
        <button class="secondary-button" type="button" data-pix-copy>${escapeHtml(labels.copyCode)}</button>
        <button class="ghost-button" type="button" data-access-close>${escapeHtml(labels.cancel)}</button>
      </footer>
    </section>
  `;
  document.body.appendChild(modal);
  modal.querySelectorAll("[data-access-close]").forEach((item) => item.addEventListener("click", closeDetailModal));
  modal.querySelector("[data-pix-copy]")?.addEventListener("click", async (event) => {
    await copyTextToClipboard(payment.pixPayload || "");
    event.currentTarget.textContent = labels.codeCopied;
  });
  modal.querySelector("[data-payment-confirm]")?.addEventListener("click", () => {
    upsertPaymentRequest({
      ...payment,
      status: "pending_manual_confirmation",
      confirmedByUserAt: isoNow(),
    });
    modal.innerHTML = `
      <div class="template-preview-backdrop" data-access-close></div>
      <section class="template-preview-dialog payment-detail-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(labels.checkingTitle)}">
        <header class="template-preview-header">
          <div><span class="eyebrow">${escapeHtml(labels.historyTitle)}</span><h2>${escapeHtml(labels.checkingTitle)}</h2></div>
          <button class="icon-button" type="button" data-access-close aria-label="${t().dashboard.close}">${icon("close")}</button>
        </header>
        <div class="pix-loading-state">
          <div class="pix-spinner" aria-hidden="true"></div>
          <h3>${escapeHtml(labels.checkingTitle)}</h3>
          <p>${escapeHtml(labels.checkingText)}</p>
        </div>
      </section>
    `;
    modal.querySelectorAll("[data-access-close]").forEach((item) => item.addEventListener("click", closeDetailModal));
    window.setTimeout(() => {
      modal.innerHTML = `
        <div class="template-preview-backdrop" data-access-close></div>
        <section class="template-preview-dialog payment-detail-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(labels.reviewTitle)}">
          <header class="template-preview-header">
            <div><span class="eyebrow">${escapeHtml(labels.historyTitle)}</span><h2>${escapeHtml(labels.reviewTitle)}</h2></div>
            <button class="icon-button" type="button" data-access-close aria-label="${t().dashboard.close}">${icon("close")}</button>
          </header>
          <div class="pix-review-state">
            ${icon("check")}
            <h3>${escapeHtml(labels.reviewTitle)}</h3>
            <p>${escapeHtml(labels.reviewText)}</p>
            <small>${escapeHtml(labels.reviewNote)}</small>
          </div>
          <footer class="template-preview-footer access-actions">
            <button class="primary-button" type="button" data-access-close>${escapeHtml(labels.viewMyPayments)}</button>
          </footer>
        </section>
      `;
      modal.querySelectorAll("[data-access-close]").forEach((item) => item.addEventListener("click", closeDetailModal));
    }, 1200);
  });
}

function monetizationSections(mode = "public", options = {}) {
  const copy = t();
  const pricing = copy.pricing;
  const showFaq = options.showFaq !== false;
  const pageClass = mode === "dashboard" ? "dashboard-monetization" : "public-monetization";
  const planCards = `<div class="pricing-grid">${pricing.plans.map((plan, index) => pricingCard(plan[0], plan[1], plan[2], index === 1, index === 1 ? pricing.bestForMost : "", index, mode)).join("")}</div>`;
  if (mode === "public") {
    const monthlyNote = currentLanguage === "pt"
      ? "Assinatura para quem quer acesso recorrente a modelos, exportação, cartas e ferramentas de IA."
      : "Subscription access for users who want recurring templates, exports, cover letters and AI tools.";
    const productTypes = ["remove_watermark", "premium_pdf", "career_pack", "premium_template", "online_resume_link"];
    const oneTimeCards = `<div class="option-grid public-one-time-grid">${pricing.oneTimeOptions.map((option, index) => purchaseCard(option[0], option[1], option[2], option[3], index === 2, index === 0 ? pricing.watermark.button : pricing.purchaseCtas[index - 1], productTypes[index] || "premium_pdf")).join("")}</div>`;
    return `
      <div class="monetization ${pageClass} premium-pricing-layout">
        <section class="monetization-block public-pricing-block one-time-pricing-block">
          <div class="pricing-section-head">
            <div>
              <span class="eyebrow">${pricing.oneTime}</span>
              <h2>${pricing.oneTimeTitle}</h2>
              <p>${pricing.oneTimeSubtitle}</p>
            </div>
            <div class="pricing-mode-card">
              <span>${pricing.payOnce}</span>
              <strong>${pricing.noSubscription}</strong>
            </div>
          </div>
          ${oneTimeCards}
        </section>

        <section class="monetization-block pricing-overview-block monthly-pricing-block">
          <div class="pricing-section-head">
            <div>
              <span class="eyebrow">${pricing.monthlyTitle}</span>
              <h2>${pricing.monthlySubtitle}</h2>
              <p>${monthlyNote}</p>
            </div>
            <div class="pricing-mode-card subscription">
              <span>${pricing.monthlyTitle}</span>
              <strong>${pricing.bestForMost}</strong>
            </div>
          </div>
          ${planCards}
        </section>
        ${pricingComparisonTable()}
        ${showFaq ? pricingFaqAccordion() : ""}
      </div>
    `;
  }
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
        ${planCards}
        ${pricingComparisonTable()}
      </section>

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
        <div class="credits-grid">${pricing.creditPackages.map((pack, index) => creditCard(pack[0], pack[1], index === 1 ? pricing.bestValue : index === 2 ? pricing.multipleApplications : pack[2], pack[3], index === 1, AI_CREDIT_STRIPE_PRODUCTS[index] || "ai_credits_starter")).join("")}</div>
      </section>

      ${showFaq ? pricingFaqAccordion() : ""}
    </div>
  `;
}

function renderPricingPage() {
  const copy = t();
  const seo = localizedSeo("pricing");
  const pricingIntro = currentLanguage === "pt"
    ? "Escolha entre começar grátis, pagar uma vez por um recurso avulso ou assinar para usar tudo com mais frequência."
    : "Start free, pay once for a specific upgrade, or subscribe when you want continuous access to the full career toolkit.";
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="pricing-page">
        <section class="pricing-hero">
          <span class="eyebrow">${copy.nav.pricing}</span>
          <h1>${copy.pricing.pricingPageTitle}</h1>
          <p>${pricingIntro}</p>
          <div class="pricing-hero-pills">
            <span>${copy.pricing.oneTimeTitle}</span>
            <span>${copy.pricing.creditsTitle}</span>
            <span>${copy.pricing.monthlyTitle}</span>
          </div>
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

function renderPaymentStatePage(kind) {
  const copy = t();
  const labels = copy.payments;
  const success = kind === "success";
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="pricing-page">
        <section class="pricing-hero payment-result-hero">
          <span class="eyebrow">${escapeHtml(labels.secureStripe)}</span>
          <h1>${escapeHtml(success ? labels.successTitle : labels.cancelTitle)}</h1>
          <p>${escapeHtml(success ? labels.successText : labels.cancelText)}</p>
          ${success ? `<p class="settings-message" data-stripe-confirmation>${escapeHtml(labels.waitingPayment)}</p>` : ""}
          <div class="section-actions">
            <a class="primary-button" href="#/dashboard/billing" data-route="/dashboard/billing">${escapeHtml(copy.dashboard.billing)}</a>
            <a class="secondary-button" href="#/pricing" data-route="/pricing">${escapeHtml(copy.nav.pricing)}</a>
          </div>
        </section>
      </main>
      <footer class="site-footer">${brandLogo("div")}<p>${copy.public.footer}</p>${legalFooterLinks()}</footer>
    </div>
  `, {
    title: success ? `${labels.successTitle} — Succeedora` : `${labels.cancelTitle} — Succeedora`,
    description: success ? labels.successText : labels.cancelText,
    canonical: seoUrl(success ? "/payment/success" : "/payment/cancel"),
    noindex: true,
  });
}

function renderPaymentSuccess() {
  renderPaymentStatePage("success");
  confirmStripeCheckoutFromUrl();
}

function renderPaymentCancel() {
  renderPaymentStatePage("cancel");
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
  const labels = currentLanguage === "pt"
    ? { search: "Buscar modelos..." }
    : { search: "Search templates..." };
  const templates = resumeTemplates();
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="section public-templates-page">
        <div class="section-heading"><span class="eyebrow">${p.templatesEyebrow}</span><h1>${p.templatesTitle}</h1><p>${p.templatesSubtitle}</p></div>
        <div class="template-catalog-tools">
          <label class="template-search">${icon("file")}<input type="search" data-template-search placeholder="${labels.search}" /></label>
          <div class="template-filter-row">${templateFilterOptions().map(([key, label], index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-template-filter="${key}">${label}</button>`).join("")}</div>
        </div>
        <div class="template-grid">${templates.map((template, index) => templateCard(template, index, false)).join("")}</div>
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
        <p class="settings-message auth-success" data-auth-message hidden></p>
        <button class="primary-button full" type="submit" data-auth-submit>${a.verifyButton}</button>
        <button class="secondary-button full" type="button" data-resend-code>${a.resendCode}</button>
      </form>
      <p class="switch-auth"><a href="#/signin" data-route="/signin">${a.backToLogin}</a></p>
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

function authPasswordField({ label, name, autocomplete, placeholder, forgotHtml = "", value = "" }) {
  const a = t().auth;
  return `
    <label class="auth-password-label">
      <span class="password-label-row"><span>${label}</span>${forgotHtml}</span>
      <span class="password-input-wrap">
        <input type="password" name="${name}" autocomplete="${autocomplete}" placeholder="${placeholder}" value="${escapeHtml(value)}" required />
        <button class="password-toggle" type="button" data-password-toggle aria-label="${a.showPassword}" aria-pressed="false" title="${a.showPassword}">${icon("eye")}</button>
      </span>
    </label>
  `;
}

function authLayout(type) {
  const a = t().auth;
  const isSignIn = type === "signin";
  const forgotHtml = isSignIn ? `<a class="forgot-inline" href="#/forgot-password" data-route="/forgot-password">${a.forgotPassword}</a>` : "";
  const rememberLabel = currentLanguage === "pt" ? "Lembrar de mim" : "Remember me";
  const rememberedEmail = (() => {
    try {
      return localStorage.getItem(AUTH_EMAIL_STORAGE_KEY) || "";
    } catch (error) {
      return "";
    }
  })();
  const rememberedPassword = (() => {
    try {
      return localStorage.getItem(AUTH_PASSWORD_STORAGE_KEY) || "";
    } catch (error) {
      return "";
    }
  })();
  const rememberChecked = (() => {
    try {
      return localStorage.getItem(AUTH_REMEMBER_STORAGE_KEY) !== "false";
    } catch (error) {
      return true;
    }
  })();
  const legalAcceptance = currentLanguage === "pt"
    ? `Li e aceito os <a href="#/terms" data-route="/terms">Termos de Uso</a> e a <a href="#/privacy" data-route="/privacy">Pol\u00edtica de Privacidade</a>.`
    : `I have read and accept the <a href="#/terms" data-route="/terms">Terms of Use</a> and <a href="#/privacy" data-route="/privacy">Privacy Policy</a>.`;
  mount(`
    <main class="auth-shell">
      <section class="auth-visual">
        ${brandLogo()}
        <h1>${a.slogan}</h1><p>${a.support}</p>
        <div class="auth-preview"><div class="resume-preview mini light"><div class="resume-head"></div><div class="resume-title"></div><div class="resume-lines"></div><div class="resume-lines short"></div><div class="resume-section"></div><div class="resume-lines"></div><div class="resume-section"></div><div class="resume-pill-row"><span></span><span></span><span></span></div></div></div>
      </section>
      <section class="auth-card">
        <div class="auth-card-top"><div class="auth-card-brand">${brandLogo("div")}</div></div>
        <span class="eyebrow auth-eyebrow">${isSignIn ? a.signInEyebrow : a.signUpEyebrow}</span>
        <h2>${isSignIn ? a.signInTitle : a.signUpTitle}</h2>
        <p class="auth-subtitle">${isSignIn ? a.signInSubtitle : a.signUpSubtitle}</p>
        <form class="auth-form" data-auth-form="${type}">
          ${isSignIn ? "" : `<label>${a.fullName}<input type="text" name="fullName" autocomplete="name" placeholder="${a.fullNamePlaceholder}" required /></label>`}
          <label>${a.email}<input type="email" name="email" autocomplete="email" inputmode="email" placeholder="${a.emailPlaceholder}" value="${isSignIn ? escapeHtml(rememberedEmail) : ""}" required /></label>
          ${authPasswordField({ label: a.password, name: "password", autocomplete: isSignIn ? "current-password" : "new-password", placeholder: a.passwordPlaceholder, forgotHtml, value: isSignIn ? rememberedPassword : "" })}
          ${isSignIn ? `<label class="legal-check remember-check"><input type="checkbox" name="rememberUser" ${rememberChecked ? "checked" : ""} /><span>${rememberLabel}</span></label>` : ""}
          ${isSignIn ? "" : authPasswordField({ label: a.confirmPassword, name: "confirmPassword", autocomplete: "new-password", placeholder: a.confirmPassword })}
          ${isSignIn ? "" : `<label class="legal-check auth-legal-check"><input type="checkbox" name="acceptLegal" required data-terms-check /><span>${legalAcceptance}</span></label>`}
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

function adminRouteFor(key) {
  const map = {
    overview: "/admin",
    users: "/admin/users",
    payments: "/admin/payments",
    pendingPix: "/admin/payments/pix",
    plans: "/admin/plans",
    purchases: "/admin/purchases",
    credits: "/admin/credits",
    support: "/admin/support",
    settings: "/admin/settings",
  };
  return map[key] || "/admin";
}

function adminSectionNav(activeKey) {
  const labels = t().admin.sections;
  const items = [["overview", "layout"], ["users", "file"], ["payments", "card"], ["pendingPix", "target"], ["plans", "shield"], ["purchases", "download"], ["credits", "sparkles"], ["support", "headset"], ["settings", "settings"]];
  return items.map(([key, iconName]) => `<a class="${activeKey === key ? "active" : ""}" href="#${adminRouteFor(key)}" data-route="${adminRouteFor(key)}">${icon(iconName)} <span>${labels[key]}</span></a>`).join("");
}

function renderRestrictedAdmin() {
  mount(`
    <div class="public-shell">
      ${publicHeader()}
      <main class="admin-restricted">
        <section class="settings-card">
          <span class="eyebrow">${t().admin.title}</span>
          <h1>${t().admin.restricted}</h1>
          <button class="secondary-button" type="button" data-route="/">${t().dashboard.backToWebsite}</button>
        </section>
      </main>
    </div>
  `, { title: `${t().admin.title} | Succeedora`, description: t().admin.restricted, canonical: seoUrl("/admin"), noindex: true });
}

function adminShell(activeKey, content) {
  const labels = t().admin;
  const profile = loadProfile();
  const flash = adminTakeFlash();
  const searchPlaceholder = activeKey === "support" ? t().support.admin.searchPlaceholder : labels.filters.search;
  mount(`
    <div class="app-shell admin-shell">
      <aside class="sidebar admin-sidebar">
        <div class="sidebar-head">${brandLogo("a", "#/admin", "/admin")}<div class="sidebar-head-actions"><button class="icon-button sidebar-toggle" aria-label="${t().dashboard.closeSidebar}">${icon("close")}</button></div></div>
        <nav class="side-nav">${adminSectionNav(activeKey)}</nav>
        <div class="sidebar-footer">
          <button class="sidebar-link-button" data-route="/dashboard" title="${t().dashboard.workspace}">${icon("layout")} <span>${t().dashboard.workspace}</span></button>
          <button class="sidebar-link-button" data-route="/" title="${t().dashboard.backToWebsite}">${icon("arrow")} <span>${t().dashboard.backToWebsite}</span></button>
        </div>
      </aside>
      <div class="dashboard-main admin-main">
        <header class="dashboard-topbar">
          <button class="icon-button sidebar-toggle" aria-label="${t().dashboard.openSidebar}">${icon("menu")}</button>
          <div><span class="eyebrow">Succeedora</span><h1>${labels.sections[activeKey] || labels.title}</h1></div>
          <label class="dashboard-search">${icon("file")}<input type="search" placeholder="${escapeHtml(searchPlaceholder)}" data-admin-filter /></label>
          <div class="topbar-actions"><div class="nav-preferences dashboard-preferences">${languageSwitch(true)}${themeToggle()}</div><button class="user-menu" type="button" data-route="/dashboard"><span>${escapeHtml(profileInitials(profile))}</span>${escapeHtml(profileFirstName(profile))}</button></div>
        </header>
        <main class="dashboard-content admin-content">
          ${flash ? `<p class="settings-message admin-flash">${escapeHtml(flash)}</p>` : ""}
          ${content}
        </main>
      </div>
    </div>
  `, { title: `${labels.title} | Succeedora`, description: labels.restricted, canonical: seoUrl("/admin"), noindex: true });
}

function adminPlanLabel(plan) {
  const dashboard = t().dashboard;
  if (plan === "premium") return dashboard.premium;
  if (plan === "pro") return dashboard.pro;
  return dashboard.free;
}

function adminStatusBadge(status, type = "account") {
  const label = t().admin.status[status] || status;
  return `<span class="admin-badge ${type}-${escapeHtml(status)}">${escapeHtml(label)}</span>`;
}

function adminFormatMoney(amount, currency = "BRL") {
  return new Intl.NumberFormat(currentLanguage === "pt" ? "pt-BR" : "en-US", { style: "currency", currency: currency || "BRL" }).format((Number(amount) || 0) / 100);
}

function isPendingAdminPayment(payment) {
  return payment?.status === "pending_manual_confirmation";
}

function adminPlanStatusLabel(planState) {
  const labels = t().admin.status;
  const plan = normalizePlanState(planState);
  if (planIsExpired(plan)) return labels.expired;
  return labels[plan.status] || plan.status || labels.active;
}

function adminPlanExpiryText(planState) {
  const plan = normalizePlanState(planState);
  if (plan.type === "free") return "-";
  return plan.expiresAt ? formatPlanExpiry(plan.expiresAt) : t().admin.status.noExpiration;
}

function adminStats(dataset = loadAdminDataset()) {
  const pendingStatuses = ["pending_payment", "pending_manual_confirmation"];
  const reviewStatuses = ["pending_manual_confirmation"];
  const creditTotal = dataset.users.reduce((sum, user) => sum + (user.access.creditHistory || []).filter((item) => Number(item.amount) > 0).reduce((inner, item) => inner + Number(item.amount || 0), 0), 0);
  return {
    users: dataset.users.length,
    free: dataset.users.filter((user) => getEffectivePlan(user.account, { access: user.access }).type === "free").length,
    pending: dataset.payments.filter((payment) => pendingStatuses.includes(payment.status)).length,
    pendingPix: dataset.payments.filter((payment) => payment.paymentMethod === "pix" && reviewStatuses.includes(payment.status)).length,
    openSupport: loadSupportTickets().filter((ticket) => ticket.status !== "closed").length,
    approved: dataset.payments.filter((payment) => payment.status === "approved").length,
    pro: dataset.users.filter((user) => getEffectivePlan(user.account, { access: user.access }).type === "pro").length,
    premium: dataset.users.filter((user) => getEffectivePlan(user.account, { access: user.access }).type === "premium").length,
    purchases: dataset.oneTimePurchases.length,
    creditsSold: creditTotal,
  };
}

function adminMetricCards(dataset) {
  const labels = t().admin.metrics;
  const stats = adminStats(dataset);
  const items = [["users", labels.users], ["free", labels.free], ["pro", labels.pro], ["premium", labels.premium], ["pending", labels.pending], ["pendingPix", labels.pendingPix], ["openSupport", labels.openSupport], ["creditsSold", labels.creditsSold]];
  return `<div class="admin-metric-grid">${items.map(([key, label], index) => `<article class="admin-metric-card ${index === 0 ? "featured" : ""}"><span>${escapeHtml(label)}</span><strong>${stats[key]}</strong></article>`).join("")}</div>`;
}

function adminUserRow(user) {
  const a = t().admin;
  const account = user.account;
  const effectivePlan = getEffectivePlan(account, { access: user.access });
  const plan = effectivePlan.type;
  return `
    <tr data-admin-row data-search="${escapeHtml(`${account.profile.fullName} ${account.email} ${plan} ${account.status}`.toLowerCase())}" data-status="${escapeHtml(account.status)}">
      <td><strong>${escapeHtml(account.profile.fullName || "-")}</strong></td>
      <td>${escapeHtml(account.email)}</td>
      <td>${adminStatusBadge(plan, "plan")}</td>
      <td>${escapeHtml(adminPlanStatusLabel(effectivePlan))}</td>
      <td>${escapeHtml(adminPlanExpiryText(effectivePlan))}</td>
      <td>${account.emailVerified ? a.status.yes : a.status.no}</td>
      <td>${user.resumes.length}</td>
      <td>${user.letters.length}</td>
      <td>${Number(user.access.aiCredits || 0)}</td>
      <td>${escapeHtml(formatPaymentDate(account.createdAt))}</td>
      <td>${adminStatusBadge(account.status)}</td>
      <td class="admin-action-cell">
        <button class="secondary-button small" type="button" data-admin-view-user="${escapeHtml(account.id)}">${a.actions.view}</button>
        <button class="secondary-button small" type="button" data-admin-plan-user="${escapeHtml(account.id)}">${a.actions.changePlan}</button>
        <button class="secondary-button small" type="button" data-admin-credits-user="${escapeHtml(account.id)}" data-admin-credit-mode="add">${a.actions.addCredits}</button>
        <button class="ghost-button small" type="button" data-admin-credits-user="${escapeHtml(account.id)}" data-admin-credit-mode="remove">${a.actions.removeCredits}</button>
        <button class="ghost-button small" type="button" data-admin-user-status="${escapeHtml(account.id)}" data-admin-next-status="${account.status === "blocked" ? "active" : "blocked"}">${account.status === "blocked" ? a.actions.unblock : a.actions.block}</button>
      </td>
    </tr>
  `;
}

function adminUsersTable(users) {
  const h = t().admin.table;
  return `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>${h.name}</th><th>${h.email}</th><th>${h.plan}</th><th>${h.subscriptionStatus}</th><th>${h.planExpiresAt}</th><th>${h.emailVerified}</th><th>${h.resumes}</th><th>${h.letters}</th><th>${h.aiCredits}</th><th>${h.createdAt}</th><th>${h.status}</th><th>${h.actions}</th></tr></thead>
        <tbody>${users.map(adminUserRow).join("") || `<tr><td colspan="12">${t().admin.details.noData}</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function adminAiUsageTable(records = []) {
  const copy = aiCopy();
  const sorted = [...records].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 80);
  return `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>${t().admin.table.email}</th><th>${copy.action}</th><th>Status</th><th>${copy.creditsUsed}</th><th>Erro</th><th>${t().admin.table.date}</th></tr></thead>
        <tbody>${sorted.map((record) => `
          <tr data-admin-row data-search="${escapeHtml(`${record.email} ${record.taskType} ${record.status} ${record.error}`.toLowerCase())}">
            <td>${escapeHtml(record.email || "-")}</td>
            <td>${escapeHtml(record.taskType || "-")}</td>
            <td>${escapeHtml(record.status || "success")}</td>
            <td>${Number(record.creditsUsed || 0)}</td>
            <td>${escapeHtml(record.error || "-")}</td>
            <td>${escapeHtml(formatPaymentDate(record.createdAt))}</td>
          </tr>
        `).join("") || `<tr><td colspan="6">${t().admin.details.noData}</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function adminCreditHistoryTable(users = []) {
  const labels = t().admin;
  const records = users.flatMap((user) => (user.access.creditHistory || []).map((item) => ({
    ...item,
    userName: user.account.profile.fullName || user.account.email,
    userEmail: user.account.email,
  }))).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 100);
  return `
    <div class="admin-table-wrap">
      <table class="admin-table admin-compact-table">
        <thead><tr><th>${labels.table.user}</th><th>${labels.table.email}</th><th>${labels.table.aiCredits}</th><th>${labels.fields.reason}</th><th>${labels.table.admin}</th><th>${labels.table.date}</th></tr></thead>
        <tbody>${records.map((record) => `
          <tr data-admin-row data-search="${escapeHtml(`${record.userName} ${record.userEmail} ${record.reason} ${record.adminEmail}`.toLowerCase())}">
            <td>${escapeHtml(record.userName || "-")}</td>
            <td>${escapeHtml(record.userEmail || "-")}</td>
            <td><strong>${Number(record.amount || 0) > 0 ? "+" : ""}${Number(record.amount || 0)}</strong></td>
            <td>${escapeHtml(record.reason || "-")}</td>
            <td>${escapeHtml(record.adminEmail || "-")}</td>
            <td>${escapeHtml(formatPaymentDate(record.createdAt))}</td>
          </tr>
        `).join("") || `<tr><td colspan="6">${labels.details.noData}</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function adminAuditTable(records = []) {
  const labels = t().admin;
  const sorted = [...records].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 100);
  return `
    <div class="admin-table-wrap">
      <table class="admin-table admin-compact-table">
        <thead><tr><th>${labels.table.admin}</th><th>${labels.table.action}</th><th>${labels.table.email}</th><th>${labels.table.oldValue}</th><th>${labels.table.newValue}</th><th>${labels.fields.reason}</th><th>${labels.table.date}</th></tr></thead>
        <tbody>${sorted.map((record) => `
          <tr data-admin-row data-search="${escapeHtml(`${record.adminEmail} ${record.action} ${record.targetUserEmail} ${record.paymentId} ${record.reason}`.toLowerCase())}">
            <td>${escapeHtml(record.adminEmail || "-")}</td>
            <td><code>${escapeHtml(record.action || "-")}</code></td>
            <td>${escapeHtml(record.targetUserEmail || record.paymentId || "-")}</td>
            <td>${escapeHtml(String(record.oldValue ?? "-"))}</td>
            <td>${escapeHtml(String(record.newValue ?? "-"))}</td>
            <td>${escapeHtml(record.reason || "-")}</td>
            <td>${escapeHtml(formatPaymentDate(record.createdAt))}</td>
          </tr>
        `).join("") || `<tr><td colspan="7">${labels.details.noData}</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function adminPaymentRow(payment, options = {}) {
  const h = t().admin.table;
  const a = t().admin;
  const pending = isPendingAdminPayment(payment);
  return `
    <tr data-admin-row data-search="${escapeHtml(`${payment.id} ${payment.accountName} ${payment.accountEmail} ${payment.payerName || ""} ${payment.payerEmail || ""} ${payment.payerTaxId || ""} ${adminPaymentLabel(payment)} ${payment.status}`.toLowerCase())}" data-status="${escapeHtml(payment.status)}">
      <td><code>${escapeHtml(payment.id)}</code></td>
      <td>${escapeHtml(payment.accountName || "-")}</td>
      <td>${escapeHtml(payment.accountEmail || payment.userEmail || "-")}</td>
      ${options.showPixKey ? `<td>${escapeHtml(payment.payerName || "-")}</td><td>${escapeHtml(payment.payerTaxId || "-")}</td>` : ""}
      <td>${escapeHtml(adminPaymentLabel(payment))}</td>
      <td>${escapeHtml(adminFormatMoney(payment.amount, payment.currency))}</td>
      <td>${escapeHtml(payment.currency)}</td>
      <td>${escapeHtml(a.status[payment.paymentMethod] || payment.paymentMethod)}</td>
      <td>${adminStatusBadge(payment.status, "payment")}</td>
      <td>${escapeHtml(formatPaymentDate(payment.createdAt))}</td>
      <td>${payment.stripeSessionId ? `<code>${escapeHtml(payment.stripeSessionId)}</code>` : "-"}</td>
      <td>${payment.stripeSubscriptionId ? `<code>${escapeHtml(payment.stripeSubscriptionId)}</code>` : "-"}</td>
      ${options.showPixKey ? `<td>${escapeHtml(payment.pixKey ? `${payment.pixKeyType || paymentConfig.pixKeyType} ${formatPixKeyValue(payment.pixKey)}` : "-")}</td>` : ""}
      ${options.showUnlocked ? `<td>${["approved", "paid"].includes(payment.status) ? a.status.yes : a.status.no}</td>` : ""}
      <td class="admin-action-cell">
        ${pending && payment.paymentMethod === "pix" ? `<button class="primary-button small" type="button" data-admin-approve-payment="${escapeHtml(payment.id)}" data-admin-payment-user="${escapeHtml(payment.accountId)}">${a.actions.approve}</button><button class="ghost-button small" type="button" data-admin-reject-payment="${escapeHtml(payment.id)}" data-admin-payment-user="${escapeHtml(payment.accountId)}">${a.actions.reject}</button>` : ""}
        <button class="secondary-button small" type="button" data-admin-view-payment="${escapeHtml(payment.id)}" data-admin-payment-user="${escapeHtml(payment.accountId)}">${a.actions.details}</button>
      </td>
    </tr>
  `;
}

function adminPaymentsTable(payments, options = {}) {
  const h = t().admin.table;
  const extraColumns = 2 + (options.showPixKey ? 3 : 0) + (options.showUnlocked ? 1 : 0);
  return `
    <div class="admin-filter-row">
      <select data-admin-status-filter aria-label="${t().admin.filters.status}">
        <option value="">${t().admin.filters.all}</option>
        ${["pending_payment", "pending_manual_confirmation", "approved", "paid", "pending", "failed", "refunded", "rejected", "cancelled"].map((status) => `<option value="${status}">${t().admin.status[status]}</option>`).join("")}
      </select>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead><tr><th>${h.id}</th><th>${h.user}</th><th>${h.email}</th>${options.showPixKey ? `<th>${h.payerName}</th><th>${h.payerTaxId}</th>` : ""}<th>${h.product}</th><th>${h.amount}</th><th>${h.currency}</th><th>${h.method}</th><th>${h.status}</th><th>${h.date}</th><th>stripeSessionId</th><th>stripeSubscriptionId</th>${options.showPixKey ? `<th>${h.pixKey}</th>` : ""}${options.showUnlocked ? `<th>${h.unlocked}</th>` : ""}<th>${h.actions}</th></tr></thead>
        <tbody>${payments.map((payment) => adminPaymentRow(payment, options)).join("") || `<tr><td colspan="${10 + extraColumns}">${t().admin.details.noData}</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function supportSelectOptions(map, keys, selected = "") {
  return keys.map((key) => `<option value="${escapeHtml(key)}" ${selected === key ? "selected" : ""}>${escapeHtml(map[key])}</option>`).join("");
}

function supportHistoryLabel(entry = {}) {
  const labels = t().support.admin;
  const typeMap = {
    created: labels.created,
    in_progress: labels.progressed,
    answered: labels.answered,
    closed: labels.closed,
  };
  return typeMap[entry.type] || supportStatusLabel(entry.status);
}

function supportTicketCard(ticket) {
  const labels = t().support;
  const latestText = ticket.adminReply || ticket.message;
  const latestDate = ticket.repliedAt || ticket.updatedAt || ticket.createdAt;
  return `
    <article class="support-ticket-card">
      <div class="support-ticket-head">
        <div>
          <span class="eyebrow">${escapeHtml(supportCategoryLabel(ticket.category))}</span>
          <h3>${escapeHtml(ticket.subject)}</h3>
          <small>${escapeHtml(labels.lastUpdate)}: ${escapeHtml(formatPaymentDate(ticket.updatedAt || ticket.createdAt))}</small>
        </div>
        <div class="support-ticket-badges">
          ${supportStatusBadge(ticket.status)}
          ${supportPriorityBadge(ticket.priority)}
        </div>
      </div>
      <div class="support-ticket-preview">
        <span>${escapeHtml(labels.preview)}</span>
        <p>${escapeHtml(latestText)}</p>
        <small>${escapeHtml(formatPaymentDate(latestDate))}</small>
      </div>
      <div class="support-ticket-thread">
        ${supportMessageBubble("user", ticket.message, ticket.createdAt)}
        ${ticket.adminReply ? supportMessageBubble("team", ticket.adminReply, ticket.repliedAt) : `<div class="support-reply-box"><strong>${escapeHtml(labels.adminReply)}</strong><span>${escapeHtml(labels.noReply)}</span></div>`}
      </div>
    </article>
  `;
}

function renderSupport(successMessage = "") {
  const labels = t().support;
  const account = currentAccount();
  const tickets = loadCurrentUserSupportTickets(account);
  const hasUnread = hasUnreadSupportReply(account);
  dashboardShell("support", `
    <main class="dashboard-content support-page">
      <section class="support-hero-card">
        <div>
          <span class="eyebrow">${escapeHtml(labels.heroEyebrow)}</span>
          <h2>${escapeHtml(labels.heroTitle)}</h2>
          <p>${escapeHtml(labels.intro)}</p>
          <div class="support-hero-badges">${supportHeroBadges()}</div>
        </div>
        ${hasUnread ? `<div class="support-alert">${icon("mail")} <span>${escapeHtml(labels.replyNotice)}</span></div>` : ""}
      </section>
      <section class="support-metric-grid">${supportMetricCards(tickets)}</section>
      ${successMessage ? `<p class="settings-message">${escapeHtml(successMessage)}</p>` : ""}
      <section class="support-layout">
        <form class="settings-card support-form-card" data-support-form>
          <div class="settings-card-head"><div><span class="eyebrow">${escapeHtml(labels.title)}</span><h2>${escapeHtml(labels.formTitle)}</h2><p>${escapeHtml(labels.formSubtitle)}</p></div></div>
          <div class="support-form-grid">
            <label>${escapeHtml(labels.fields.subject)}<input name="subject" maxlength="120" placeholder="${escapeHtml(labels.placeholders.subject)}" required /><small>${escapeHtml(labels.fieldHints.subject)}</small></label>
            <label>${escapeHtml(labels.fields.category)}<select name="category" required>${supportSelectOptions(labels.categories, SUPPORT_FORM_CATEGORY_KEYS)}</select><small>${escapeHtml(labels.fieldHints.category)}</small></label>
            <label>${escapeHtml(labels.fields.priority)}<select name="priority" required>${supportSelectOptions(labels.priorities, SUPPORT_PRIORITY_KEYS, "medium")}</select><small>${escapeHtml(labels.fieldHints.priority)}</small></label>
            <label class="support-message-field">${escapeHtml(labels.fields.message)}<textarea name="message" rows="7" maxlength="1800" placeholder="${escapeHtml(labels.placeholders.message)}" required></textarea><small>${escapeHtml(labels.fieldHints.message)}</small></label>
          </div>
          <button class="primary-button support-submit-button" type="submit">${icon("mail")} ${escapeHtml(labels.send)}</button>
        </form>
        <section class="settings-card support-history-card">
          <div class="settings-card-head"><div><span class="eyebrow">${escapeHtml(labels.title)}</span><h2>${escapeHtml(labels.historyTitle)}</h2><p>${escapeHtml(labels.historySubtitle)}</p></div></div>
          <div class="support-ticket-list">
            ${tickets.length ? tickets.map(supportTicketCard).join("") : `<div class="support-empty-state">${icon("mail")}<h3>${escapeHtml(labels.emptyTitle)}</h3><p>${escapeHtml(labels.empty)}</p><button class="secondary-button small" type="button" data-support-focus>${escapeHtml(labels.emptyCta)}</button></div>`}
          </div>
        </section>
      </section>
      <section class="support-help-section">
        <div class="section-row-heading"><div><h2>${escapeHtml(labels.helpTitle)}</h2><p>${escapeHtml(labels.helpSubtitle)}</p></div></div>
        <div class="support-help-grid">${supportHelpCards()}</div>
      </section>
    </main>
  `);
  if (hasUnread) markSupportRepliesSeen(account);
}

function adminSupportTicketRow(ticket) {
  const a = t().admin;
  return `
    <tr data-admin-row data-search="${escapeHtml(`${ticket.userName} ${ticket.userEmail} ${ticket.subject} ${supportCategoryLabel(ticket.category)} ${supportPriorityLabel(ticket.priority)} ${supportStatusLabel(ticket.status)}`.toLowerCase())}" data-status="${escapeHtml(ticket.status)}" data-category="${escapeHtml(ticket.category)}" data-priority="${escapeHtml(ticket.priority)}">
      <td>${escapeHtml(ticket.userName || "-")}</td>
      <td>${escapeHtml(ticket.userEmail || "-")}</td>
      <td><strong>${escapeHtml(ticket.subject || "-")}</strong></td>
      <td>${escapeHtml(supportCategoryLabel(ticket.category))}</td>
      <td>${supportPriorityBadge(ticket.priority)}</td>
      <td>${supportStatusBadge(ticket.status)}</td>
      <td>${escapeHtml(formatPaymentDate(ticket.createdAt))}</td>
      <td class="admin-action-cell">
        <button class="secondary-button small" type="button" data-admin-view-support="${escapeHtml(ticket.id)}">${a.actions.view}</button>
        <button class="secondary-button small" type="button" data-admin-view-support="${escapeHtml(ticket.id)}">${a.actions.reply}</button>
        ${ticket.status !== "closed" ? `<button class="ghost-button small" type="button" data-admin-support-progress="${escapeHtml(ticket.id)}">${a.actions.markInProgress}</button><button class="ghost-button small danger-link" type="button" data-admin-support-close="${escapeHtml(ticket.id)}">${a.actions.close}</button>` : ""}
      </td>
    </tr>
  `;
}

function adminSupportTable(tickets) {
  const labels = t().admin;
  const support = t().support;
  return `
    <div class="admin-filter-row support-admin-filters">
      <select data-admin-status-filter aria-label="${escapeHtml(labels.filters.status)}">
        <option value="">${escapeHtml(labels.filters.all)}</option>
        ${SUPPORT_STATUS_KEYS.map((status) => `<option value="${escapeHtml(status)}">${escapeHtml(supportStatusLabel(status))}</option>`).join("")}
      </select>
      <select data-admin-category-filter aria-label="${escapeHtml(labels.filters.category)}">
        <option value="">${escapeHtml(labels.filters.allCategories)}</option>
        ${supportSelectOptions(support.categories, SUPPORT_FORM_CATEGORY_KEYS)}
      </select>
      <select data-admin-priority-filter aria-label="${escapeHtml(labels.filters.priority)}">
        <option value="">${escapeHtml(labels.filters.allPriorities)}</option>
        ${supportSelectOptions(support.priorities, SUPPORT_PRIORITY_KEYS)}
      </select>
    </div>
    <div class="admin-table-wrap">
      <table class="admin-table support-admin-table">
        <thead><tr><th>${labels.table.user}</th><th>${labels.table.email}</th><th>${support.fields.subject}</th><th>${support.fields.category}</th><th>${support.fields.priority}</th><th>${labels.table.status}</th><th>${labels.table.date}</th><th>${labels.table.actions}</th></tr></thead>
        <tbody>${tickets.map(adminSupportTicketRow).join("") || `<tr><td colspan="8">${escapeHtml(support.admin.noTickets)}</td></tr>`}</tbody>
      </table>
    </div>
  `;
}

function renderAdminOverview() {
  const dataset = loadAdminDataset();
  adminShell("overview", `
    ${adminMetricCards(dataset)}
    <section class="settings-card admin-panel">
      <div class="settings-card-head"><div><span class="eyebrow">${t().admin.sections.pendingPix}</span><h2>${t().admin.metrics.pending}</h2></div><button class="secondary-button small" data-route="/admin/payments/pix">${t().admin.actions.details}</button></div>
      ${adminPaymentsTable(dataset.payments.filter((payment) => payment.paymentMethod === "pix" && payment.status === "pending_manual_confirmation").slice(0, 5), { showPixKey: true })}
    </section>
  `);
}

function renderAdminUsers() {
  const dataset = loadAdminDataset();
  adminShell("users", `<section class="settings-card admin-panel">${adminUsersTable(dataset.users)}</section>`);
}

function renderAdminPayments() {
  const dataset = loadAdminDataset();
  adminShell("payments", `<section class="settings-card admin-panel">${adminPaymentsTable(dataset.payments)}</section>`);
}

function renderAdminPendingPix() {
  const dataset = loadAdminDataset();
  const payments = dataset.payments.filter((payment) => payment.paymentMethod === "pix" && payment.status === "pending_manual_confirmation");
  adminShell("pendingPix", `<section class="settings-card admin-panel">${adminPaymentsTable(payments, { showPixKey: true })}</section>`);
}

function renderAdminPlans() {
  const dataset = loadAdminDataset();
  const planUsers = dataset.users.filter((user) => ["pro", "premium"].includes(getEffectivePlan(user.account, { access: user.access }).type));
  adminShell("plans", `<section class="settings-card admin-panel">${adminUsersTable(planUsers)}</section>`);
}

function renderAdminPurchases() {
  const dataset = loadAdminDataset();
  adminShell("purchases", `<section class="settings-card admin-panel">${adminPaymentsTable(dataset.oneTimePurchases, { showUnlocked: true })}</section>`);
}

function renderAdminCredits() {
  const dataset = loadAdminDataset();
  adminShell("credits", `
    <section class="settings-card admin-panel">
      <div class="settings-card-head"><div><span class="eyebrow">${t().admin.sections.credits}</span><h2>${t().admin.sections.users}</h2></div></div>
      ${adminUsersTable(dataset.users)}
    </section>
    <section class="settings-card admin-panel">
      <div class="settings-card-head"><div><span class="eyebrow">${t().admin.sections.credits}</span><h2>${t().admin.details.creditHistory}</h2></div></div>
      ${adminCreditHistoryTable(dataset.users)}
    </section>
    <section class="settings-card admin-panel">
      <div class="settings-card-head"><div><span class="eyebrow">Succeedora AI</span><h2>${aiCopy().usageHistory}</h2></div></div>
      ${adminAiUsageTable(dataset.aiUsage)}
    </section>
  `);
}

function renderAdminSupport() {
  const tickets = loadSupportTickets();
  adminShell("support", `
    <section class="settings-card admin-panel support-admin-panel">
      <div class="settings-card-head">
        <div><span class="eyebrow">Succeedora</span><h2>${escapeHtml(t().admin.sections.support)}</h2><p>${escapeHtml(t().support.admin.intro)}</p></div>
      </div>
      ${adminSupportTable(tickets)}
    </section>
  `);
}

function renderAdminSettings() {
  const labels = t().admin;
  const dataset = loadAdminDataset();
  adminShell("settings", `
    <section class="settings-card admin-settings-grid">
      <article><span>${labels.primaryAdmin}</span><strong>${escapeHtml(ADMIN_EMAILS[0])}</strong></article>
      <article><span>${labels.settings.cnpj}</span><strong>${escapeHtml(paymentConfig.pixKey)}</strong></article>
      <article><span>${labels.settings.pixKey}</span><strong>${escapeHtml(paymentConfig.pixKey)}</strong></article>
      <article><span>${labels.settings.pixKeyType}</span><strong>${escapeHtml(paymentConfig.pixKeyType)}</strong></article>
      <article><span>${labels.settings.pixManual}</span><strong>${labels.settings.manual}</strong></article>
      <article><span>${labels.settings.stripe}</span><strong>${stripeConfig.enabled ? `${labels.status.active} (${stripeConfig.mode})` : labels.settings.disabled}</strong></article>
    </section>
    <section class="settings-card admin-panel">
      <div class="settings-card-head"><div><span class="eyebrow">${labels.title}</span><h2>${labels.details.auditLog}</h2></div></div>
      ${adminAuditTable(dataset.auditLog)}
    </section>
  `);
}

function openAdminDialog(title, body) {
  document.querySelectorAll(".admin-modal").forEach((modal) => modal.remove());
  const modal = document.createElement("div");
  modal.className = "template-preview-modal admin-modal";
  modal.innerHTML = `
    <section class="template-preview-dialog admin-dialog" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <header class="template-preview-header">
        <h2>${escapeHtml(title)}</h2>
        <button class="icon-button" type="button" data-admin-modal-close aria-label="${t().dashboard.close}">${icon("close")}</button>
      </header>
      <div class="template-preview-content admin-dialog-content">${body}</div>
    </section>
  `;
  document.body.appendChild(modal);
  const close = () => modal.remove();
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-admin-modal-close]")) close();
  });
  return modal;
}

function openAdminPlanModal(userId) {
  const user = loadAdminDataset().users.find((item) => item.account.id === userId);
  if (!user) return;
  const labels = t().admin;
  const modal = openAdminDialog(labels.actions.changePlan, `
    <form class="admin-form" data-admin-plan-form="${escapeHtml(userId)}">
      <label>${labels.fields.newPlan}
        <select name="plan">
          ${["free", "pro", "premium"].map((plan) => `<option value="${plan}" ${getEffectivePlan(user.account, { access: user.access }).type === plan ? "selected" : ""}>${adminPlanLabel(plan)}</option>`).join("")}
        </select>
      </label>
      <label>${labels.fields.duration || "Duration"}
        <select name="duration">
          ${planDurationOptions().map(([value, label]) => `<option value="${value}" ${value === "30d" ? "selected" : ""}>${escapeHtml(label)}</option>`).join("")}
        </select>
      </label>
      <label>${labels.fields.customDate || "Custom date"}<input type="date" name="customDate" /></label>
      <label>${labels.fields.reason}<input type="text" name="reason" placeholder="${labels.fields.reason}" /></label>
      <div class="admin-dialog-actions">
        <button class="secondary-button" type="button" data-admin-modal-close>${labels.actions.cancel}</button>
        <button class="primary-button" type="submit">${labels.actions.save}</button>
      </div>
    </form>
  `);
  modal.querySelector("[data-admin-plan-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    adminUpdatePlan(userId, event.currentTarget.plan.value, {
      duration: event.currentTarget.duration.value,
      customDate: event.currentTarget.customDate.value,
      reason: event.currentTarget.reason.value,
    });
    modal.remove();
    render();
  });
}

function openAdminCreditsModal(userId, mode = "add") {
  const user = loadAdminDataset().users.find((item) => item.account.id === userId);
  if (!user) return;
  const labels = t().admin;
  const modal = openAdminDialog(mode === "remove" ? labels.actions.removeCredits : labels.actions.addCredits, `
    <form class="admin-form" data-admin-credit-form="${escapeHtml(userId)}">
      <label>${labels.fields.quantity}<input type="number" name="quantity" min="1" step="1" value="10" required /></label>
      <label>${labels.fields.reason}<input type="text" name="reason" placeholder="${labels.fields.reason}" /></label>
      <div class="admin-dialog-actions">
        <button class="secondary-button" type="button" data-admin-modal-close>${labels.actions.cancel}</button>
        <button class="primary-button" type="submit">${labels.actions.save}</button>
      </div>
    </form>
  `);
  modal.querySelector("[data-admin-credit-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const quantity = Math.max(1, Number(event.currentTarget.quantity.value || 0));
    adminUpdateCredits(userId, mode === "remove" ? -quantity : quantity, event.currentTarget.reason.value);
    modal.remove();
    render();
  });
}

function openAdminRejectModal(userId, paymentId) {
  const labels = t().admin;
  const modal = openAdminDialog(labels.actions.reject, `
    <form class="admin-form" data-admin-reject-form>
      <label>${labels.fields.reason}
        <select name="reason">${labels.rejectReasons.map((reason) => `<option value="${escapeHtml(reason)}">${escapeHtml(reason)}</option>`).join("")}</select>
      </label>
      <div class="admin-dialog-actions">
        <button class="secondary-button" type="button" data-admin-modal-close>${labels.actions.cancel}</button>
        <button class="primary-button" type="submit">${labels.actions.reject}</button>
      </div>
    </form>
  `);
  modal.querySelector("[data-admin-reject-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    adminRejectPayment(userId, paymentId, event.currentTarget.reason.value);
    modal.remove();
    render();
  });
}

function adminSimpleList(title, items, empty = t().admin.details.noData) {
  return `<section class="admin-detail-section"><h3>${escapeHtml(title)}</h3>${items.length ? `<div class="admin-detail-list">${items.join("")}</div>` : `<p>${escapeHtml(empty)}</p>`}</section>`;
}

function openAdminUserDetails(userId) {
  const user = loadAdminDataset().users.find((item) => item.account.id === userId);
  if (!user) return;
  const labels = t().admin;
  const account = user.account;
  const effectivePlan = getEffectivePlan(account, { access: user.access });
  const payments = user.payments.map((payment) => `<article><strong>${escapeHtml(adminPaymentLabel(payment))}</strong><span>${adminStatusBadge(payment.status, "payment")} ${escapeHtml(adminFormatMoney(payment.amount, payment.currency))}</span></article>`);
  const resumes = user.resumes.map((resume) => `<article><strong>${escapeHtml(resume.title || resume.name || "-")}</strong><span>${escapeHtml(formatPaymentDate(resume.updatedAt || resume.createdAt))}</span></article>`);
  const letters = user.letters.map((letter) => `<article><strong>${escapeHtml(letter.title || letter.role || "-")}</strong><span>${escapeHtml(formatPaymentDate(letter.updatedAt || letter.createdAt))}</span></article>`);
  const purchases = user.payments.filter((payment) => ["remove_watermark", "premium_pdf", "premium_template", "career_pack", "online_resume_link", ...AI_CREDIT_PRODUCT_TYPES].includes(payment.productType)).map((payment) => `<article><strong>${escapeHtml(adminPaymentLabel(payment))}</strong><span>${adminStatusBadge(payment.status, "payment")}</span></article>`);
  const aiUsage = user.aiUsage.map((record) => `<article><strong>${escapeHtml(record.taskType)}</strong><span>${Number(record.creditsUsed || 0)} ${escapeHtml(aiCopy().creditsUsed)} · ${escapeHtml(formatPaymentDate(record.createdAt))}</span></article>`);
  openAdminDialog(labels.details.profile, `
    <div class="admin-detail-grid">
      <section class="admin-detail-section">
        <h3>${escapeHtml(account.profile.fullName || account.email)}</h3>
        <dl>
          <div><dt>${labels.table.email}</dt><dd>${escapeHtml(account.email)}</dd></div>
          <div><dt>${labels.table.plan}</dt><dd>${adminStatusBadge(effectivePlan.type, "plan")}</dd></div>
          <div><dt>${labels.table.subscriptionStatus}</dt><dd>${escapeHtml(adminPlanStatusLabel(effectivePlan))}</dd></div>
          <div><dt>${labels.table.planExpiresAt}</dt><dd>${escapeHtml(adminPlanExpiryText(effectivePlan))}</dd></div>
          <div><dt>${labels.table.emailVerified}</dt><dd>${account.emailVerified ? labels.status.yes : labels.status.no}</dd></div>
          <div><dt>${labels.table.createdAt}</dt><dd>${escapeHtml(formatPaymentDate(account.createdAt))}</dd></div>
          <div><dt>${labels.details.credits}</dt><dd>${Number(user.access.aiCredits || 0)}</dd></div>
        </dl>
      </section>
      ${adminSimpleList(labels.details.savedResumes, resumes)}
      ${adminSimpleList(labels.details.savedLetters, letters)}
      ${adminSimpleList(labels.details.payments, payments)}
      ${adminSimpleList(labels.details.purchases, purchases)}
      ${adminSimpleList(aiCopy().usageHistory, aiUsage)}
    </div>
  `);
}

function openAdminPaymentDetails(userId, paymentId) {
  const user = loadAdminDataset().users.find((item) => item.account.id === userId);
  const payment = user?.payments.find((item) => item.id === paymentId);
  if (!user || !payment) return;
  const labels = t().admin;
  openAdminDialog(labels.actions.details, `
    <section class="admin-detail-section">
      <dl>
        <div><dt>${labels.table.id}</dt><dd><code>${escapeHtml(payment.id)}</code></dd></div>
        <div><dt>${labels.table.user}</dt><dd>${escapeHtml(user.account.profile.fullName || "-")}</dd></div>
        <div><dt>${labels.table.email}</dt><dd>${escapeHtml(user.account.email)}</dd></div>
      </dl>
      ${paymentDetailList(payment, { admin: true })}
    </section>
  `);
}

function openAdminSupportTicket(ticketId) {
  const ticket = loadSupportTickets().find((item) => item.id === ticketId);
  if (!ticket || !isAdminAccount()) return;
  const labels = t().admin;
  const support = t().support;
  const history = ticket.history.map((entry) => `
    <article>
      <strong>${escapeHtml(supportHistoryLabel(entry))}</strong>
      <span>${escapeHtml(formatPaymentDate(entry.createdAt))}${entry.adminEmail ? ` · ${escapeHtml(entry.adminEmail)}` : ""}</span>
    </article>
  `);
  const modal = openAdminDialog(ticket.subject || support.admin.ticketDetails, `
    <div class="admin-detail-grid support-ticket-detail-grid">
      <section class="admin-detail-section">
        <h3>${escapeHtml(support.admin.userDetails)}</h3>
        <dl>
          <div><dt>${labels.table.user}</dt><dd>${escapeHtml(ticket.userName || "-")}</dd></div>
          <div><dt>${labels.table.email}</dt><dd>${escapeHtml(ticket.userEmail || "-")}</dd></div>
          <div><dt>${support.fields.priority}</dt><dd>${supportPriorityBadge(ticket.priority)}</dd></div>
          <div><dt>${labels.table.status}</dt><dd>${supportStatusBadge(ticket.status)}</dd></div>
          <div><dt>${labels.table.date}</dt><dd>${escapeHtml(formatPaymentDate(ticket.createdAt))}</dd></div>
          <div><dt>${currentLanguage === "pt" ? "Atualizado em" : "Updated at"}</dt><dd>${escapeHtml(formatPaymentDate(ticket.updatedAt))}</dd></div>
          ${ticket.repliedAt ? `<div><dt>${currentLanguage === "pt" ? "Respondido em" : "Replied at"}</dt><dd>${escapeHtml(formatPaymentDate(ticket.repliedAt))}</dd></div>` : ""}
          ${ticket.closedAt ? `<div><dt>${currentLanguage === "pt" ? "Fechado em" : "Closed at"}</dt><dd>${escapeHtml(formatPaymentDate(ticket.closedAt))}</dd></div>` : ""}
        </dl>
      </section>
      <section class="admin-detail-section">
        <h3>${escapeHtml(support.admin.ticketDetails)}</h3>
        <dl>
          <div><dt>${support.fields.subject}</dt><dd>${escapeHtml(ticket.subject || "-")}</dd></div>
          <div><dt>${support.fields.category}</dt><dd>${escapeHtml(supportCategoryLabel(ticket.category))}</dd></div>
        </dl>
        ${supportAdminThread(ticket)}
      </section>
      ${adminSimpleList(support.admin.history, history)}
    </div>
    ${ticket.status !== "closed" ? `
      <form class="admin-form support-reply-form" data-admin-support-reply="${escapeHtml(ticket.id)}">
        <label>${escapeHtml(support.admin.replyLabel)}
          <textarea name="reply" rows="5" required>${escapeHtml(ticket.adminReply || "")}</textarea>
        </label>
        <div class="admin-dialog-actions">
          <button class="secondary-button" type="button" data-admin-modal-close>${labels.actions.cancel}</button>
          <button class="ghost-button" type="button" data-modal-support-progress="${escapeHtml(ticket.id)}">${labels.actions.markInProgress}</button>
          <button class="ghost-button danger-link" type="button" data-modal-support-close="${escapeHtml(ticket.id)}">${labels.actions.close}</button>
          <button class="primary-button" type="submit">${labels.actions.sendReply}</button>
        </div>
      </form>
    ` : ""}
  `);
  modal.querySelector("[data-admin-support-reply]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const reply = event.currentTarget.reply.value.trim();
    if (!reply) return;
    adminReplySupportTicket(ticketId, reply);
    adminSetFlash(labels.messages.replySent);
    modal.remove();
    render();
  });
  modal.querySelector("[data-modal-support-progress]")?.addEventListener("click", () => {
    adminMarkSupportTicketInProgress(ticketId);
    modal.remove();
    render();
  });
  modal.querySelector("[data-modal-support-close]")?.addEventListener("click", () => {
    adminCloseSupportTicket(ticketId);
    adminSetFlash(labels.messages.ticketClosed);
    modal.remove();
    render();
  });
}

function dashboardShell(activeKey, content) {
  restoreSidebarAfterBuilder(activeKey);
  const d = t().dashboard;
  const profile = loadProfile();
  const access = getUserAccess();
  const planLabel = accessPlanLabel(access);
  const planExpiryLabel = accessPlanExpiryLabel(access);
  const showSidebarUpgrade = !isPaidPlan(access);
  const nav = [["/dashboard", "layout", "dashboard"], ["/dashboard/resumes", "file", "resumes"], ["/dashboard/builder", "pen", "builder"], ["/dashboard/cover-letters", "mail", "coverLetters"], ["/dashboard/templates", "templates", "templates"], ["/dashboard/ai", "sparkles", "ai"], ["/dashboard/support", "headset", "support"], ["/dashboard/profile", "user", "profile"], ["/dashboard/billing", "card", "billing"], ["/dashboard/settings", "settings", "settings"]];
  if (isAdminAccount()) nav.push(["/admin", "settings", "admin"]);
  const mobileNav = nav.slice(0, 5);
  const isBuilderEditor = activeKey === "builder" && !String(content || "").includes("builder-template-selection");
  mount(`
    <div class="app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""} ${isBuilderEditor ? "builder-workspace" : ""}">
      <aside class="sidebar">
        <div class="sidebar-head">${brandLogo("a", "#/dashboard", "/dashboard")}<div class="sidebar-head-actions"><button class="icon-button sidebar-collapse-button" type="button" data-sidebar-collapse aria-label="${sidebarCollapsed ? d.expandSidebar : d.collapseSidebar}" title="${sidebarCollapsed ? d.expandSidebar : d.collapseSidebar}" aria-expanded="${!sidebarCollapsed}">${icon("menu")}</button><button class="icon-button sidebar-toggle" aria-label="${d.closeSidebar}">${icon("close")}</button></div></div>
        <nav class="side-nav">${nav.map(([path, iconName, key]) => `<a class="${activeKey === key ? "active" : ""}" href="#${path}" data-route="${path}" title="${d.nav[key]}">${icon(iconName)} <span>${d.nav[key]}</span></a>`).join("")}</nav>
        <div class="sidebar-footer">
          ${showSidebarUpgrade ? `<div class="sidebar-upgrade"><span>${d.proPlan}</span><strong>${d.unlock}</strong><button class="primary-button small" data-route="/dashboard/billing">${d.upgrade}</button></div>` : ""}
          <button class="sidebar-link-button" data-route="/" title="${d.backToWebsite}">${icon("arrow")} <span>${d.backToWebsite}</span></button>
        </div>
      </aside>
      <div class="dashboard-main">
        <header class="dashboard-topbar">
          <button class="icon-button sidebar-toggle" aria-label="${d.openSidebar}">${icon("menu")}</button>
          <div><span class="eyebrow">${d.workspace}</span><h1>${d.nav[activeKey]}</h1></div>
          <label class="dashboard-search">${icon("file")}<input type="search" placeholder="${d.searchPlaceholder}" /></label>
          <div class="topbar-actions">
            <div class="nav-preferences dashboard-preferences">
              ${languageSwitch(true)}
              ${themeToggle()}
              <button class="icon-button ai-quick-toggle" type="button" data-route="/dashboard/ai" aria-label="${d.openAiQuick}" title="${d.openAiQuick}">${icon("sparkles")}</button>
            </div>
            <div class="user-menu-wrap">
              <button class="user-menu" type="button" data-user-menu><span>${escapeHtml(profileInitials(profile))}</span>${escapeHtml(profileFirstName(profile))}</button>
              <div class="user-dropdown">
                <div class="user-dropdown-head"><strong>${escapeHtml(profile.fullName)}</strong><small>${escapeHtml(profile.email)}</small><span>${d.currentPlan}: ${escapeHtml(planExpiryLabel ? `${planLabel} · ${planExpiryLabel}` : planLabel)}</span></div>
                <button type="button" data-route="/dashboard/profile">${icon("user")} ${d.nav.profile}</button>
                <button type="button" data-route="/dashboard/support">${icon("headset")} ${d.nav.support}</button>
                <button type="button" data-route="/dashboard/settings">${icon("settings")} ${d.nav.settings}</button>
                <button type="button" data-route="/dashboard/billing">${icon("card")} ${d.billing}</button>
                ${isAdminAccount() ? `<button type="button" data-route="/admin">${icon("settings")} ${d.nav.admin}</button>` : ""}
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
  const profile = loadProfile();
  const hasSupportReply = hasUnreadSupportReply();
  const resumes = loadResumes();
  const primaryResume = resumes[0];
  const completion = primaryResume ? primaryResume.completion : 0;
  const nextAction = primaryResume ? nextResumeAction(primaryResume) : h.completionText;
  const planLabel = accessPlanLabel(access);
  const planExpiryLabel = accessPlanExpiryLabel(access);
  const primaryTemplate = primaryResume ? getTemplateByKey(primaryResume.selectedTemplate) : null;
  const dashboardHomeLabels = currentLanguage === "pt" ? {
    workspaceEyebrow: "Succeedora Workspace",
    heroText: "Um centro global para transformar curr\u00edculos, cartas e candidaturas em ativos profissionais de alto impacto.",
    progressTitle: "Painel do curr\u00edculo",
    currentResumeTitle: "Curr\u00edculo atual",
    resumePreview: "Preview do curr\u00edculo",
    ready: "Curr\u00edculo pronto",
    availablePdf: "PDF dispon\u00edvel",
    export: "Exporta\u00e7\u00e3o",
    pdfStatus: "Status do PDF",
    brandFreePdf: "PDF sem marca",
    brandedPdf: "PDF com marca",
    awaitingResume: "Aguardando curr\u00edculo",
    complete: "completo",
    activeTemplate: "Modelo ativo",
    nextAction: "Pr\u00f3ximo passo",
    currentStatus: "Status",
    progress: "Progresso",
    plan: "Plano",
    template: "Modelo",
    format: "Formato",
    updated: "Atualizado",
    notStarted: "Ainda n\u00e3o iniciado",
    readyToExport: "Pronto para exportar",
    inProgress: "Em evolu\u00e7\u00e3o",
    atsReady: "Compat\u00edvel com ATS",
    recommendation: "Recomendado",
    startRecommendation: "Comece com um modelo e finalize as se\u00e7\u00f5es essenciais.",
    exportRecommendation: "Seu curr\u00edculo est\u00e1 pronto para exporta\u00e7\u00e3o.",
    executiveEyebrow: "Vis\u00e3o executiva",
    executivePanel: "Resumo estrat\u00e9gico",
    tertiaryActions: "A\u00e7\u00f5es adicionais",
    planDetails: "Detalhes do plano",
    planBenefits: "Benef\u00edcios do plano",
    billingCenter: "Ver plano",
    included: "Inclu\u00eddo",
    proBadge: "Pro",
    premiumBadge: "Premium",
    startFirst: "Crie primeiro",
    aiIncluded: "IA inclu\u00edda",
    activePlan: "ativo",
    aiChips: ["Resumo", "Carta", "ATS", "Tradu\u00e7\u00e3o"],
    aiSignals: ["Revis\u00e3o de texto", "Palavras-chave inteligentes", "Carta personalizada"],
    upgradeItems: ["Modelos premium", "PDF sem marca", "Mais IA"],
    upgradeBenefits: ["Modelos premium", "PDF sem marca", "M\u00faltiplas vers\u00f5es"],
    proActiveTitle: "Plano Pro ativo",
    proActiveText: "Seu workspace j\u00e1 inclui modelos premium, PDF sem marca e recursos de IA para candidaturas profissionais.",
    premiumActiveTitle: "Plano Premium ativo",
    premiumActiveText: "Voc\u00ea tem acesso ao conjunto mais avan\u00e7ado da Succeedora para curr\u00edculos, IA e candidaturas.",
    proBenefits: ["Modelos premium", "PDF sem marca", "Cartas e IA"],
    premiumBenefits: ["Tudo do Pro", "ATS avan\u00e7ado", "Adapta\u00e7\u00e3o para vagas"],
    nextStepDescriptions: [
      "Refine o texto principal com uma recomenda\u00e7\u00e3o mais forte.",
      "Alinhe experi\u00eancias e palavras-chave com a vaga desejada.",
      "Gere uma carta consistente com seu curr\u00edculo.",
      "Prepare uma vers\u00e3o internacional do seu perfil.",
      "Exporte um PDF pronto para enviar.",
    ],
  } : {
    workspaceEyebrow: "Succeedora Workspace",
    heroText: "A global command center for turning resumes, cover letters and applications into high-impact career assets.",
    progressTitle: "Resume panel",
    currentResumeTitle: "Current resume",
    resumePreview: "Resume preview",
    ready: "Resume ready",
    availablePdf: "PDF available",
    export: "Export",
    pdfStatus: "PDF status",
    brandFreePdf: "Brand-free PDF",
    brandedPdf: "Branded PDF",
    awaitingResume: "Awaiting resume",
    complete: "complete",
    activeTemplate: "Active template",
    nextAction: "Next move",
    currentStatus: "Status",
    progress: "Progress",
    plan: "Plan",
    template: "Template",
    format: "Format",
    updated: "Updated",
    notStarted: "Not started yet",
    readyToExport: "Ready to export",
    inProgress: "In progress",
    atsReady: "ATS-compatible",
    recommendation: "Recommended",
    startRecommendation: "Start with a template and complete the essential sections.",
    exportRecommendation: "Your resume is ready for export.",
    executiveEyebrow: "Executive view",
    executivePanel: "Strategic brief",
    tertiaryActions: "Additional actions",
    planDetails: "Plan details",
    planBenefits: "Plan benefits",
    billingCenter: "View plan",
    included: "Included",
    proBadge: "Pro",
    premiumBadge: "Premium",
    startFirst: "Create first",
    aiIncluded: "AI included",
    activePlan: "active",
    aiChips: ["Summary", "Letter", "ATS", "Translate"],
    aiSignals: ["Writing review", "Smart keywords", "Custom letter"],
    upgradeItems: ["Premium templates", "No branding", "More AI"],
    upgradeBenefits: ["Premium templates", "No-brand PDF", "Multiple versions"],
    proActiveTitle: "Pro plan active",
    proActiveText: "Your workspace already includes premium templates, brand-free PDF and AI tools for professional applications.",
    premiumActiveTitle: "Premium plan active",
    premiumActiveText: "You have Succeedora's most advanced toolkit for resumes, AI and job applications.",
    proBenefits: ["Premium templates", "Brand-free PDF", "Letters and AI"],
    premiumBenefits: ["Everything in Pro", "Advanced ATS", "Job tailoring"],
    nextStepDescriptions: [
      "Refine your core profile with a stronger recommendation.",
      "Align experience and keywords with a target role.",
      "Create a letter that matches your resume.",
      "Prepare an international version of your profile.",
      "Export a PDF ready to send.",
    ],
  };
  const dashboardTemplate = primaryTemplate || getTemplateByKey(selectedTemplateKey || "modern");
  const dashboardFormat = primaryResume ? primaryResume.documentFormat : defaultDocumentFormat();
  const documentFormatLabel = dashboardFormat === "letter" ? "US Letter" : "A4";
  const updatedLabel = primaryResume ? formatResumeDate(primaryResume.updatedAt) : dashboardHomeLabels.notStarted;
  const resumeTitle = primaryResume ? primaryResume.title : h.mainResume;
  const statusLabel = completion >= 100 ? dashboardHomeLabels.readyToExport : primaryResume ? dashboardHomeLabels.inProgress : dashboardHomeLabels.notStarted;
  const recommendationText = completion >= 100 ? dashboardHomeLabels.exportRecommendation : primaryResume ? nextAction : dashboardHomeLabels.startRecommendation;
  const cleanPdfAvailable = primaryResume ? canExportWithoutBranding(primaryResume.id, access) : isPaidPlan(access);
  const aiToolsLocked = !canUseFeature("ai_resume_improvement", { access });
  const exportStatusLabel = primaryResume ? (cleanPdfAvailable ? dashboardHomeLabels.brandFreePdf : dashboardHomeLabels.brandedPdf) : dashboardHomeLabels.awaitingResume;
  const heroSecondaryActions = isPaidPlan(access)
    ? [
        { iconName: "shield", label: dashboardHomeLabels.planDetails, attrs: `data-route="/dashboard/billing"` },
        { iconName: "sparkles", label: dashboardHomeLabels.aiIncluded, attrs: `data-route="/dashboard/ai"` },
        { iconName: "download", label: dashboardHomeLabels.brandFreePdf, attrs: `data-route="/dashboard/resumes"` },
      ]
    : [
        { iconName: "shield", label: t().dashboard.upgrade, attrs: `data-route="/dashboard/billing"` },
        { iconName: "sparkles", label: accessCopy.buyCredits, attrs: `data-route="/dashboard/billing"` },
        { iconName: "download", label: accessCopy.removeWatermark, attrs: `type="button" data-watermark-option` },
      ];
  const resumeChecklist = primaryResume ? [
    nextAction,
    `${dashboardHomeLabels.template}: ${dashboardTemplate.name}`,
    `${dashboardHomeLabels.pdfStatus}: ${exportStatusLabel}`,
  ] : h.missing.slice(0, 3);
  const resumeMetadata = [
    `${dashboardHomeLabels.updated}: ${updatedLabel}`,
    `${dashboardHomeLabels.template}: ${dashboardTemplate.name}`,
    `${dashboardHomeLabels.format}: ${documentFormatLabel}`,
  ];
  const planCard = access.plan === "premium"
    ? {
        className: "is-active-plan is-premium-plan",
        eyebrow: `${planLabel} ${dashboardHomeLabels.activePlan}`,
        title: dashboardHomeLabels.premiumActiveTitle,
        text: dashboardHomeLabels.premiumActiveText,
        benefits: dashboardHomeLabels.premiumBenefits,
        chips: [dashboardHomeLabels.included, dashboardHomeLabels.brandFreePdf, dashboardHomeLabels.aiIncluded],
        cta: dashboardHomeLabels.billingCenter,
      }
    : access.plan === "pro"
      ? {
          className: "is-active-plan is-pro-plan",
          eyebrow: `${planLabel} ${dashboardHomeLabels.activePlan}`,
          title: dashboardHomeLabels.proActiveTitle,
          text: dashboardHomeLabels.proActiveText,
          benefits: dashboardHomeLabels.proBenefits,
          chips: [dashboardHomeLabels.included, dashboardHomeLabels.brandFreePdf, dashboardHomeLabels.aiIncluded],
          cta: dashboardHomeLabels.billingCenter,
        }
      : {
          className: "is-upgrade-plan",
          eyebrow: t().dashboard.upgrade,
          title: h.upgradeTitle,
          text: h.upgradeText,
          benefits: dashboardHomeLabels.upgradeBenefits,
          chips: dashboardHomeLabels.upgradeItems,
          cta: h.viewPlans,
        };
  const nextStepActions = [
    { iconName: "sparkles", title: h.tasks[0], description: dashboardHomeLabels.nextStepDescriptions[0], featureKey: "ai_resume_improvement", attrs: `data-route="/dashboard/ai" data-ai-action="improve-summary"` },
    { iconName: "target", title: h.tasks[1], description: dashboardHomeLabels.nextStepDescriptions[1], featureKey: "job_tailoring", attrs: `data-route="/dashboard/ai" data-ai-action="job-tailoring"` },
    { iconName: "mail", title: h.tasks[2], description: dashboardHomeLabels.nextStepDescriptions[2], featureKey: "ai_cover_letter", attrs: `data-route="/dashboard/cover-letters" data-ai-action="cover-letter"` },
    { iconName: "globe", title: h.tasks[3], description: dashboardHomeLabels.nextStepDescriptions[3], featureKey: "resume_translation", attrs: `data-route="/dashboard/ai" data-ai-action="translation"` },
    { iconName: "download", title: h.tasks[4], description: dashboardHomeLabels.nextStepDescriptions[4], featureKey: "", badgeOverride: primaryResume ? exportStatusLabel : dashboardHomeLabels.startFirst, attrs: primaryResume ? `data-pdf-export-resume="${primaryResume.id}"` : `data-new-resume data-route="/dashboard/builder"` },
  ].map((item) => {
    const locked = item.featureKey ? !canUseFeature(item.featureKey, primaryResume ? { resumeId: primaryResume.id } : {}) : false;
    return {
      ...item,
      locked,
      badge: item.badgeOverride || (locked ? featureRequirementLabel(item.featureKey) : dashboardHomeLabels.included),
    };
  });
  const currentResumeActions = primaryResume ? `
    <div class="resume-current-actions">
      <button class="secondary-button small" type="button" data-edit-resume="${primaryResume.id}" data-route="/dashboard/builder">${h.resumeActions[0]}</button>
      <button class="ghost-button small" type="button" data-preview-resume="${primaryResume.id}">${h.resumeActions[1]}</button>
      <button class="ghost-button small" type="button" data-pdf-export-resume="${primaryResume.id}">${h.resumeActions[2]}</button>
    </div>
  ` : `<button class="primary-button full" type="button" data-new-resume data-route="/dashboard/builder">${h.createResume}</button>`;
  dashboardShell("dashboard", `
    <main class="dashboard-content workspace-home">
      ${hasSupportReply ? `<section class="support-alert dashboard-support-alert"><div>${icon("mail")}<span>${escapeHtml(t().support.replyNotice)}</span></div><button class="secondary-button small" type="button" data-route="/dashboard/support">${escapeHtml(t().support.title)}</button></section>` : ""}
      <section class="workspace-hero dashboard-executive-hero">
        <div class="workspace-hero-glow" aria-hidden="true"></div>
        <div class="workspace-hero-main">
          <div class="workspace-hero-copy">
            <div class="hero-kicker-row">
              <span class="eyebrow">${dashboardHomeLabels.workspaceEyebrow}</span>
            </div>
            <h2>${h.title}</h2>
            <p>${dashboardHomeLabels.heroText}</p>
          </div>
          <div class="hero-action-stack">
            <div class="quick-actions hero-primary-actions">
              <button class="primary-button" data-new-resume data-route="/dashboard/builder">${icon("pen")} ${h.createResume}</button>
              <button class="secondary-button" data-route="/dashboard/ai" data-ai-action="ai">${icon("sparkles")} ${h.improveAi}</button>
              <button class="secondary-button" data-route="/dashboard/cover-letters">${icon("mail")} ${h.createLetter}</button>
            </div>
            <div class="plan-strip hero-commerce-actions hero-secondary-actions">
              <span class="hero-action-label">${dashboardHomeLabels.tertiaryActions}</span>
              ${heroSecondaryActions.map((item) => `<button class="hero-chip" ${item.attrs}>${icon(item.iconName)} ${escapeHtml(item.label)}</button>`).join("")}
            </div>
          </div>
        </div>
        <article class="main-resume-card executive-resume-panel">
          <div class="progress-card-orbit" aria-hidden="true"></div>
          <div class="main-resume-card-top">
            <div>
              <span>${dashboardHomeLabels.executiveEyebrow}</span>
              <strong>${dashboardHomeLabels.executivePanel}</strong>
            </div>
            <div class="executive-progress-number">
              <em data-dashboard-progress-number>${completion}%</em>
              <small>${dashboardHomeLabels.progress}</small>
            </div>
          </div>
          <div class="progress-card-status executive-status-row">
            <small>${dashboardHomeLabels.currentStatus}</small>
            <strong>${escapeHtml(statusLabel)}</strong>
          </div>
          <div class="progress"><span data-dashboard-progress style="width:${completion}%"></span></div>
          <div class="executive-next-action">
            <small>${dashboardHomeLabels.nextAction}</small>
            <strong>${escapeHtml(recommendationText)}</strong>
          </div>
          <div class="progress-metrics executive-meta-grid">
            <span><small>${dashboardHomeLabels.updated}</small><strong>${escapeHtml(updatedLabel)}</strong></span>
            <span><small>${dashboardHomeLabels.plan}</small><strong>${escapeHtml(planExpiryLabel ? `${planLabel} · ${planExpiryLabel}` : planLabel)}</strong></span>
            <span><small>${dashboardHomeLabels.template}</small><strong>${escapeHtml(dashboardTemplate.name)}</strong></span>
            <span><small>${dashboardHomeLabels.format}</small><strong>${escapeHtml(documentFormatLabel)}</strong></span>
          </div>
        </article>
      </section>

      <section class="workspace-grid">
        <article class="dash-card resume-status-card">
          <div class="dash-card-topline">
            <div class="feature-icon">${icon("file")}</div>
            <span>${completion}% ${dashboardHomeLabels.complete}</span>
          </div>
          <div class="dashboard-card-title-row">
            <h3>${escapeHtml(primaryResume ? resumeTitle : dashboardHomeLabels.currentResumeTitle)}</h3>
            <span>${escapeHtml(statusLabel)}</span>
          </div>
          <p>${escapeHtml(recommendationText)}</p>
          <div class="resume-preview-panel">
            <div class="resume-preview-head"><span>${escapeHtml(dashboardTemplate.name)}</span><strong>${escapeHtml(documentFormatLabel)}</strong></div>
            <div class="resume-preview-body" aria-label="${escapeHtml(dashboardHomeLabels.resumePreview)}">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="resume-preview-foot"><span>${escapeHtml(exportStatusLabel)}</span><strong>${completion}%</strong></div>
          </div>
          <div class="resume-status-panel">
            <div class="resume-status-meter"><span style="width:${completion}%"></span></div>
            <div class="resume-status-meta">${resumeMetadata.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
          </div>
          <ul class="task-list">${resumeChecklist.map((item, index) => `<li>${icon(index === 0 && completion < 100 ? "target" : "check")} ${escapeHtml(item)}</li>`).join("")}</ul>
          <div class="card-bottom-action">${currentResumeActions}</div>
        </article>

        <article class="dash-card ai-tools-card ${aiToolsLocked ? "locked-feature" : ""}">
          <div class="ai-card-orb" aria-hidden="true"></div>
          <div class="dash-card-topline">
            <div class="feature-icon">${icon("sparkles")}</div>
            <span>${aiToolsLocked ? `${icon("lock")} ${featureRequirementLabel("ai_resume_improvement")}` : "AI"}</span>
          </div>
          <h3>${h.aiTitle}</h3>
          <p>${h.aiText}</p>
          <div class="ai-signal-list">${dashboardHomeLabels.aiSignals.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
          <div class="mini-chip-row">${dashboardHomeLabels.aiChips.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
          <div class="card-actions">
            <button class="primary-button small ${aiToolsLocked ? "locked-action" : ""}" data-route="/dashboard/ai" data-ai-action="improve-summary">${aiToolsLocked ? `${icon("lock")} ` : ""}${h.openAi}</button>
            <button class="secondary-button small" data-route="/dashboard/billing">${h.buyCredits}</button>
          </div>
        </article>

        <article class="dash-card upgrade-card workspace-upgrade plan-status-card ${planCard.className}">
          <div class="dash-card-topline">
            <span class="eyebrow">${escapeHtml(planCard.eyebrow)}</span>
            <div class="feature-icon">${icon("shield")}</div>
          </div>
          <h3>${escapeHtml(planCard.title)}</h3>
          <p>${escapeHtml(planCard.text)}</p>
          <ul class="upgrade-benefit-list">${planCard.benefits.map((item) => `<li>${icon("check")} ${escapeHtml(item)}</li>`).join("")}</ul>
          <div class="mini-chip-row">${planCard.chips.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
          <div class="card-bottom-action"><button class="primary-button full" data-route="/dashboard/billing">${escapeHtml(planCard.cta)}</button></div>
        </article>
      </section>

      <section class="dashboard-section">
        <div class="section-row-heading"><h2>${h.recent}</h2><button class="secondary-button small" data-route="/dashboard/resumes">${t().dashboard.nav.resumes}</button></div>
        ${resumes.length ? `<div class="recent-resume-grid">${resumes.slice(0, 3).map((resume) => resumeCard(resume, h.resumeActions)).join("")}</div>` : ""}
      </section>

      <section class="dashboard-section">
        <div class="section-row-heading"><h2>${h.nextSteps}</h2></div>
        <div class="next-step-grid">${nextStepActions.map((item, index) => `<button class="next-step-card next-step-action-card ${item.locked ? "locked-feature locked-action" : ""}" type="button" style="--step-delay:${index * 70}ms" ${item.attrs}><div class="feature-icon">${icon(item.iconName)}</div><span>${item.locked ? `${icon("lock")} ` : ""}${escapeHtml(item.badge)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></button>`).join("")}</div>
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
  const template = getTemplateByKey(resume.selectedTemplate) || getTemplateByKey("modern");
  const labels = currentLanguage === "pt"
    ? { ready: "Pronto", progress: "Em evolu\u00e7\u00e3o", updated: "\u00daltima edi\u00e7\u00e3o" }
    : { ready: "Ready", progress: "In progress", updated: "Last edited" };
  const formatLabel = resume.documentFormat === "letter" ? "US Letter" : "A4";
  const statusLabel = resume.completion >= 100 ? labels.ready : labels.progress;
  return `
    <article class="recent-resume-card">
      <div class="recent-resume-preview">
        <div class="resume-card-top">${icon("file")}<span>${resume.completion}%</span></div>
        <div class="recent-preview-lines"><span></span><span></span><span></span></div>
      </div>
      <div class="recent-resume-copy">
        <h3>${escapeHtml(resume.title)}</h3>
        <p>${escapeHtml(labels.updated)}: ${escapeHtml(formatResumeDate(resume.updatedAt))}</p>
      </div>
      <div class="recent-resume-status">${escapeHtml(statusLabel)} - ${escapeHtml(formatLabel)}</div>
      <div class="resume-meta"><span>${template.name} · ${resume.documentFormat === "letter" ? "US Letter" : "A4"}</span><div class="progress"><span style="width:${resume.completion}%"></span></div></div>
      <div class="resume-actions">
        <button class="secondary-button small" type="button" data-edit-resume="${resume.id}" data-route="/dashboard/builder">${actions[0]}</button>
        <button class="ghost-button small" type="button" data-preview-resume="${resume.id}">${actions[1]}</button>
        <button class="ghost-button small" type="button" data-pdf-export-resume="${resume.id}">${actions[2]}</button>
      </div>
    </article>
  `;
}

function renderResumes() {
  const copy = t();
  const r = copy.dashboard.resumes;
  const lib = copy.dashboard.library;
  const labels = resumeLabels();
  const resumes = loadResumes().sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
  const actions = lib.actions;
  const savedTemplateKeys = new Set(resumes.map((resume) => resume.selectedTemplate).filter(Boolean));
  const templates = resumeTemplates({ includeInactive: true }).filter((template) => isTemplateActive(template) || savedTemplateKeys.has(template.key));
  dashboardShell("resumes", `
    <main class="dashboard-content resume-library-page">
      <section class="resume-library-hero">
        <div><span class="eyebrow">${copy.dashboard.nav.resumes}</span><h1>${copy.dashboard.nav.resumes}</h1><p>${r.intro}</p></div>
        <button class="primary-button" data-new-resume data-route="/dashboard/builder">${icon("pen")} ${lib.createNew}</button>
      </section>
      ${resumes.length ? `
      <div class="resume-library-controls">
        <label class="dashboard-search resume-library-search">${icon("file")}<input type="search" data-resume-search placeholder="${labels.searchPlaceholder}" /></label>
        <select data-resume-status-filter aria-label="${labels.statusFilter}">
          <option value="">${labels.allStatuses}</option>
          ${Object.entries(labels.statuses).map(([key, label]) => `<option value="${key}">${label}</option>`).join("")}
        </select>
        <select data-resume-template-filter aria-label="${labels.modelFilter}">
          <option value="">${labels.allModels}</option>
          ${templates.map((template) => `<option value="${template.key}">${template.name}</option>`).join("")}
        </select>
        <select data-resume-sort aria-label="${labels.sortLabel}">
          <option value="recent">${labels.sortRecent}</option>
          <option value="progress">${labels.sortProgress}</option>
          <option value="ats">${labels.sortAts}</option>
          <option value="name">${labels.sortName}</option>
        </select>
      </div>
      <div class="resume-library">${resumes.map((resume) => {
        const template = getTemplateByKey(resume.selectedTemplate);
        const statusKey = resumeStatusKey(resume);
        return `<article class="library-card resume-library-card" data-resume-card data-resume-search="${escapeHtml(resumeSearchText(resume))}" data-resume-status="${statusKey}" data-resume-template="${escapeHtml(resume.selectedTemplate)}" data-resume-progress="${Number(resume.completion || 0)}" data-resume-ats="${Number(resume.atsScore || 0)}" data-resume-title="${escapeHtml(String(resume.title || "").toLowerCase())}" data-resume-updated="${escapeHtml(resume.updatedAt || "")}">
          <div class="resume-thumbnail">${resumeDocument(resume.selectedTemplate, resume.documentFormat, resume)}</div>
          <div class="library-meta">
            <div class="resume-library-title-row"><h3>${escapeHtml(resume.title)}</h3><span class="resume-status-pill status-${statusKey}">${resumeStatusLabel(resume)}</span></div>
            <p>${lib.lastEdited}: ${formatResumeDate(resume.updatedAt)}</p>
            <div class="resume-meta">
              <span>${lib.template}: ${template.name}</span>
              <span>${copy.builder.documentFormat}: ${resume.documentFormat === "letter" ? copy.builder.usLetter : copy.builder.a4}</span>
              ${Number.isFinite(Number(resume.atsScore)) ? `<span>ATS: ${Number(resume.atsScore)}%</span>` : ""}
              <div class="progress"><span style="width:${resume.completion}%"></span></div>
              <span>${resume.completion}% ${lib.completion}</span>
            </div>
            <div class="resume-actions">
              <button class="secondary-button small" type="button" data-edit-resume="${resume.id}" data-route="/dashboard/builder">${actions[0]}</button>
              <button class="ghost-button small" type="button" data-preview-resume="${resume.id}">${actions[1]}</button>
              <button class="ghost-button small" type="button" data-duplicate-resume="${resume.id}">${labels.duplicate}</button>
              <button class="ghost-button small" type="button" data-delete-resume="${resume.id}">${labels.delete}</button>
              <button class="ghost-button small" type="button" data-pdf-export-resume="${resume.id}">${labels.downloadPdf}</button>
            </div>
          </div>
        </article>`;
      }).join("")}</div>` : `<section class="empty-resume-state premium-empty">
        <div class="feature-icon">${icon("file")}</div>
        <div><h3>${labels.emptyTitle}</h3><p>${labels.emptyText}</p></div>
        <button class="primary-button" data-route="/dashboard/templates">${labels.chooseTemplate}</button>
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
          const accessClass = templateAccessClass(template);
          const accessLabel = templateAccessLabel(template);
          const lockFeature = templateLockFeature(template);
          const availabilityLabel = template.access === "free"
            ? labels.freeLabel
            : template.access === "premium"
              ? (currentLanguage === "pt" ? "Disponível no Premium" : "Available with Premium")
              : labels.proLabel;
          return `
            <article class="template-card dashboard-template-card builder-template-card template-${template.key} ${locked ? "locked-feature" : ""}" data-template-category="${template.key}" data-template-access="${template.access}" data-template-status="${template.status}" data-template-groups="${template.filterGroups.join(" ")}">
              <div class="template-card-topline">
                <span class="template-badge">${template.category}</span>
                <span class="template-badge ${accessClass}">${accessLabel}</span>
                ${locked ? lockedBadge(lockFeature) : ""}
              </div>
              ${templateCardPreviewMarkup(template.key)}
              <div class="builder-template-meta">
                <h3>${template.name}</h3>
                <p>${availabilityLabel}</p>
              </div>
              <div class="template-actions">
                <button class="ghost-button small" type="button" data-template-preview="${template.key}" data-preview-context="dashboard">${copy.dashboard.previewTemplate}</button>
                <button class="primary-button small ${locked ? "locked-action" : ""}" type="button" data-use-template="${template.key}" data-template-destination="builder">${locked ? `${icon("lock")} ${featureAccessCopy().locked}` : copy.dashboard.useTemplate}</button>
              </div>
            </article>
          `;
        }).join("")}
      </section>
    </main>
  `);
}

function templateSelectorButton(template) {
  const locked = !canUseTemplate(template.key);
  return `
    <button class="template-choice ${template.key === selectedTemplateKey ? "active" : ""} ${locked ? "locked" : ""}" type="button" data-resume-template="${template.key}" aria-pressed="${template.key === selectedTemplateKey}">
      <span>${template.name}</span>
      ${locked ? `<em>${icon("lock")} ${templateAccessLabel(template)}</em>` : template.access !== "free" ? `<em>${templateAccessLabel(template)}</em>` : ""}
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
  const adminBuilderTool = isAdminAccount()
    ? `<div class="admin-builder-tools"><button class="secondary-button small admin-builder-tool" type="button" data-admin-fill-test-resume><span>${escapeHtml(resumeLabels().adminToolLabel)}:</span> ${escapeHtml(resumeLabels().adminFillTest)}</button></div>`
    : "";
  const saveStateMarkup = `
    <div class="save-state" data-save-state data-state="${builderSaveState}">
      <span class="saved" data-save-label="saved" ${builderSaveState === "saved" ? "" : "hidden"}>${b.saved}</span>
      <span data-save-label="saving" ${builderSaveState === "saving" ? "" : "hidden"}>${b.saving}</span>
      <span data-save-label="unsaved" ${builderSaveState === "unsaved" ? "" : "hidden"}>${b.unsaved}</span>
      <small data-save-message></small>
    </div>
  `;
  dashboardShell("builder", `
    <main class="builder-page">
      <div class="builder-mobile-tabs">
        <button class="active" data-builder-view="edit" type="button">${b.editTab}</button>
        <button data-builder-view="preview" type="button">${b.previewTab}</button>
      </div>

      <div class="builder-exit-row">
        <button class="secondary-button small builder-exit-button" type="button" data-builder-exit>${icon("arrowLeft")} ${b.backToCreateResume}</button>
        <div class="builder-exit-meta">${saveStateMarkup}${adminBuilderTool}</div>
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
  const ai = aiCopy();
  const resume = ensureBuilderDraft();
  const personal = resume.personal || {};
  const experience = resume.workExperience?.[0] || {};
  const value = (item) => escapeHtml(item || "");
  const listValue = (items) => escapeHtml((items || []).join("\n"));
  const aiButtonMarkup = (taskType, label, iconName = "sparkles", className = "secondary-button") => {
    const locked = !canUseAiTask(taskType);
    return `<button class="${className} small ${locked ? "locked-action" : ""}" type="button" data-ai-builder-task="${taskType}">${icon(locked ? "lock" : iconName)} ${label}</button>`;
  };
  const aiActions = index === 1
    ? `<div class="ai-action-row">${aiButtonMarkup("generate_professional_summary", ai.generateSummary)}${aiButtonMarkup("improve_professional_summary", ai.improveSummary, "sparkles", "ghost-button")}</div>`
    : index === 2
      ? aiButtonMarkup("rewrite_experience", ai.improveExperience)
      : index === 4
        ? aiButtonMarkup("suggest_skills", ai.suggestSkills)
        : index === 7
          ? aiButtonMarkup("improve_project_description", ai.improveProject)
        : index === 9
          ? `<div class="ai-action-row">${aiButtonMarkup("translate_resume", ai.translateResume, "globe")}</div>`
          : "";
  const status = index < 5 ? b.required : b.optional;
  const helper = index === 1 ? b.helpers.summary : index === 2 ? b.helpers.experience : index === 4 ? b.helpers.skills : index === 8 ? b.helpers.links : "";
  let content = "";
  let actions = "";

  if (index === 0) {
    const firstName = personal.firstName || String(personal.fullName || "").split(" ")[0] || "";
    const lastName = personal.lastName || String(personal.fullName || "").split(" ").slice(1).join(" ");
    content = `<div class="two-col"><label>${b.labels.firstName}<input data-resume-field="firstName" data-preview-name-part="first" value="${value(firstName)}" placeholder="Amanda" autocomplete="given-name" /></label><label>${b.labels.lastName}<input data-resume-field="lastName" data-preview-name-part="last" value="${value(lastName)}" placeholder="Silva" autocomplete="family-name" /></label><label>${b.labels.title}<input data-resume-field="title" data-preview-source="title" data-preview-target="title" value="${value(personal.title)}" placeholder="${b.labels.title}" /></label><label>${b.labels.email}<input data-resume-field="email" data-preview-source="email" value="${value(personal.email)}" placeholder="email@example.com" autocomplete="email" /></label><label>${b.labels.phone}<input data-resume-field="phone" data-preview-source="phone" value="${value(personal.phone)}" placeholder="+55 11 99999-9999" autocomplete="tel" /></label><label>${b.labels.address}<input data-resume-field="address" data-preview-source="address" value="${value(personal.address)}" placeholder="${b.labels.address}" autocomplete="street-address" /></label><label>${b.labels.city}<input data-resume-field="city" data-preview-source="city" value="${value(personal.city)}" placeholder="${b.labels.city}" autocomplete="address-level2" /></label><label>${b.labels.state}<input data-resume-field="state" data-preview-source="state" value="${value(personal.state)}" placeholder="${b.labels.state}" autocomplete="address-level1" /></label><label>${b.labels.postalCode}<input data-resume-field="postalCode" data-preview-source="postalCode" value="${value(personal.postalCode)}" placeholder="${b.labels.postalCode}" autocomplete="postal-code" /></label></div>`;
  } else if (index === 1) {
    content = `<label>${b.labels.summary}<textarea data-resume-field="summary" data-preview-target="summary" placeholder="${b.placeholders.summary}">${value(resume.summary)}</textarea></label>`;
  } else if (index === 2) {
    const experiences = Array.isArray(resume.workExperience) && resume.workExperience.length
      ? resume.workExperience
      : [{ company: "", role: "", period: "", location: "", achievements: [] }];
    const experienceLabel = currentLanguage === "pt" ? "Experi\u00eancia" : "Experience";
    content = `<div class="builder-experience-list">${experiences.map((item, itemIndex) => `
      <article class="builder-experience-item" data-resume-experience-item data-experience-index="${itemIndex}">
        <div class="builder-experience-head">
          <strong>${experienceLabel} ${itemIndex + 1}</strong>
          <button class="ghost-button small" type="button" data-remove-experience="${itemIndex}" ${experiences.length <= 1 ? "disabled" : ""}>${b.remove}</button>
        </div>
        <div class="two-col">
          <label>${b.labels.company}<input data-resume-experience-field="company" value="${value(item.company)}" placeholder="Company name" /></label>
          <label>${b.labels.role}<input data-resume-experience-field="role" value="${value(item.role)}" placeholder="Role title" /></label>
          <label>${b.labels.period}<input data-resume-experience-field="period" value="${value(item.period)}" placeholder="2021 - Present" /></label>
          <label>${b.labels.location}<input data-resume-experience-field="location" value="${value(item.location)}" placeholder="${b.labels.location}" /></label>
        </div>
        <label>${b.labels.achievements}<textarea data-resume-experience-field="achievements" placeholder="${b.placeholders.achievements}">${listValue(item.achievements)}</textarea></label>
      </article>
    `).join("")}</div>`;
    actions = `<div class="section-actions builder-experience-actions"><button class="secondary-button small" type="button" data-add-experience>${icon("pen")} ${b.addExperience}</button></div>`;
  } else if (index === 3) {
    const educationItems = Array.isArray(resume.education) && resume.education.length
      ? resume.education
      : [{ school: "", degree: "", location: "", period: "", description: "" }];
    const educationLabel = currentLanguage === "pt" ? "Forma\u00e7\u00e3o" : "Education";
    content = `<div class="builder-education-list">${educationItems.map((item, itemIndex) => `
      <article class="builder-education-item" data-resume-education-item data-education-index="${itemIndex}">
        <div class="builder-education-head">
          <strong>${educationLabel} ${itemIndex + 1}</strong>
          <button class="ghost-button small" type="button" data-remove-education="${itemIndex}" ${educationItems.length <= 1 ? "disabled" : ""}>${b.remove}</button>
        </div>
        <div class="two-col">
          <label>${b.labels.school}<input data-resume-education-field="school" value="${value(item.school)}" /></label>
          <label>${b.labels.degree}<input data-resume-education-field="degree" value="${value(item.degree)}" /></label>
          <label>${b.labels.period}<input data-resume-education-field="period" value="${value(item.period)}" placeholder="2020 - 2021" /></label>
          <label>${b.labels.location}<input data-resume-education-field="location" value="${value(item.location)}" placeholder="${b.labels.location}" /></label>
        </div>
        <label>${currentLanguage === "pt" ? "Descri\u00e7\u00e3o" : "Description"}<textarea data-resume-education-field="description">${value(item.description)}</textarea></label>
      </article>
    `).join("")}</div>`;
    actions = `<div class="section-actions builder-list-actions"><button class="secondary-button small" type="button" data-add-education>${b.addItem} ${title}</button></div>`;
  } else if (index === 4) {
    content = `<label>${b.labels.skills}<textarea data-resume-field="skills" data-preview-target="skills" placeholder="${b.placeholders.skills}">${escapeHtml((resume.skills || []).join(", "))}</textarea></label>`;
  } else if (index === 5) {
    content = `<label>${b.labels.languages}<textarea data-resume-field="languages" data-preview-target="languages">${listValue(resume.languages)}</textarea></label>`;
  } else if (index === 6) {
    content = `<label>${b.labels.certifications}<textarea data-resume-field="certifications" data-preview-target="certifications">${listValue(resume.certifications)}</textarea></label>`;
  } else if (index === 7) {
    content = `<label>${b.labels.projects}<textarea data-resume-field="projects" data-preview-target="projects">${listValue(resume.projects)}</textarea></label>`;
    actions = `<div class="section-actions builder-list-actions"><button class="secondary-button small" type="button" data-add-list-line="projects">${b.addItem} ${title}</button></div>`;
  } else if (index === 8) {
    content = `<label>${b.labels.links}<textarea data-resume-field="links" data-preview-target="links" placeholder="${b.placeholders.links}">${listValue(resume.professionalLinks)}</textarea></label>`;
    actions = `<div class="section-actions builder-list-actions"><button class="secondary-button small" type="button" data-add-list-line="links">${b.addItem} ${title}</button></div>`;
  } else {
    const template = getTemplateByKey(selectedTemplateKey);
    const missing = missingSectionLabels(resume);
    content = `<div class="finish-panel"><div><span class="eyebrow">${b.selectedTemplate}</span><h3>${template.name}</h3><p>${template.description}</p></div><div class="missing-list" data-missing-sections><strong>${b.missingTitle}</strong>${missing.length ? missing.map((item) => `<span>${item}</span>`).join("") : `<span>${currentLanguage === "pt" ? "Pronto para revisar" : "Ready to review"}</span>`}</div><div class="section-actions"><button class="primary-button small" type="button" data-save-resume>${icon("check")} ${b.save}</button><button class="secondary-button small" type="button" data-builder-full-preview>${icon("file")} ${b.previewBeforeDownload}</button><button class="secondary-button small" type="button" data-pdf-export>${icon("download")} ${b.download}</button></div></div>`;
    actions = "";
  }

  return `
    <section class="form-section builder-card builder-panel" id="builder-section-${index}" data-builder-panel="${index}" ${index === activeBuilderSectionIndex ? "" : "hidden"}>
      <div class="form-section-head"><div><span class="section-status">${status}</span><h2>${title}</h2>${helper ? `<p>${helper}</p>` : ""}</div>${aiActions}</div>
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
  if (template === "modern") {
    const hasText = (item) => String(item || "").trim().length > 0;
    const hasList = (items) => normalizeTextList(items).length > 0;
    const labels = currentLanguage === "pt"
      ? {
        summary: "Resumo profissional",
        experience: "Experiência profissional",
        projects: "Projetos",
        skills: "Habilidades",
        education: "Formação",
        languages: "Idiomas",
        certifications: "Certificações",
        links: "Links",
      }
      : {
        summary: "Professional Summary",
        experience: "Work Experience",
        projects: "Projects",
        skills: "Skills",
        education: "Education",
        languages: "Languages",
        certifications: "Certifications",
        links: "Links",
      };
    const optional = (className, title, body, hasContent) => `
      <section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}>
        <h3>${title}</h3>
        ${body}
      </section>
    `;
    const contactItems = [displayLocation, personal.email, personal.phone, normalizeTextList(data.professionalLinks)[0]].filter(Boolean);
    const experiences = (data.workExperience || []).filter((item) => hasText(item.role) || hasText(item.company) || hasText(item.location) || hasText(item.period) || hasList(item.achievements));
    const primaryExperience = experiences[0] || experience;
    const experienceBody = (experiences.length ? experiences : [primaryExperience]).map((item, index) => `
      <div class="modern-experience-item">
        <div class="modern-entry-title">
          <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
          <span ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</span>
        </div>
        <p class="modern-entry-meta">
          <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${index === 0 ? `<span class="resume-meta-separator" data-preview-pair-separator="experienceCompany:experienceLocation" aria-hidden="true"${hasText(item.company) && hasText(item.location) ? "" : " hidden"}> - </span>` : hasText(item.company) && hasText(item.location) ? " - " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
        </p>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </div>
    `).join("");
    const educationItems = (data.education || []).filter((item) => hasText(item.degree) || hasText(item.school));
    const educationBody = (educationItems.length ? educationItems : [education]).map((item, index) => `
      <p class="modern-compact-item">
        <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
        <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
        ${hasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
      </p>
    `).join("");
    const modernParagraphs = (items, fieldName) => `<div class="modern-text-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`;
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-modern modern-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="modern-header">
              <div class="modern-identity">
                <span class="modern-accent" aria-hidden="true"></span>
                <h2 data-preview-field="name" data-preview-empty="Patrick Justino">${display(displayName, "Patrick Justino")}</h2>
                <strong data-preview-field="title" data-preview-empty="${currentLanguage === "pt" ? "Supervisor Administrativo" : "Administrative Supervisor"}">${display(personal.title, currentLanguage === "pt" ? "Supervisor Administrativo" : "Administrative Supervisor")}</strong>
              </div>
              <p class="resume-contact-line modern-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${contactItems.length ? contactItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("") : display(contact, b.document.header)}</p>
            </header>
            <div class="modern-main-column">
              ${optional("modern-summary modern-primary-section", labels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, hasText(data.summary))}
              ${optional("modern-experience modern-primary-section", labels.experience, experienceBody, experiences.length > 0)}
              ${optional("modern-projects modern-primary-section", labels.projects, modernParagraphs(data.projects, "projects"), hasList(data.projects))}
            </div>
            <div class="modern-sidebar">
              ${optional("modern-skills modern-sidebar-section", labels.skills, `<div class="resume-skill-list modern-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, hasList(data.skills))}
              ${optional("modern-education modern-sidebar-section", labels.education, educationBody, educationItems.length > 0)}
              ${optional("modern-languages modern-sidebar-section", labels.languages, `<p data-preview-field="languages" data-preview-empty="">${brList(data.languages, "")}</p>`, hasList(data.languages))}
              ${optional("modern-certifications modern-sidebar-section", labels.certifications, modernParagraphs(data.certifications, "certifications"), hasList(data.certifications))}
              ${optional("modern-links modern-sidebar-section", labels.links, `<div class="resume-link-list modern-link-list" data-preview-field="links" data-preview-empty="">${paragraphList(data.professionalLinks, "")}</div>`, hasList(data.professionalLinks))}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  if (template === "executive") {
    const hasText = (item) => String(item || "").trim().length > 0;
    const hasList = (items) => normalizeTextList(items).length > 0;
    const labels = currentLanguage === "pt"
      ? {
        summary: "Resumo executivo",
        strengths: "Principais competências",
        experience: "Experiência profissional",
        education: "Formação",
        certifications: "Certificações",
        skills: "Habilidades estratégicas",
        languages: "Idiomas",
        links: "Links",
        results: "Resultados e projetos",
      }
      : {
        summary: "Executive Summary",
        strengths: "Core Strengths",
        experience: "Professional Experience",
        education: "Education",
        certifications: "Certifications",
        skills: "Strategic Skills",
        languages: "Languages",
        links: "Links",
        results: "Results and Projects",
      };
    const optional = (className, title, body, hasContent) => `
      <section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}>
        <h3>${title}</h3>
        ${body}
      </section>
    `;
    const contactItems = [displayLocation, personal.email, personal.phone, normalizeTextList(data.professionalLinks)[0]].filter(Boolean);
    const experiences = (data.workExperience || []).filter((item) => hasText(item.role) || hasText(item.company) || hasText(item.location) || hasText(item.period) || hasList(item.achievements));
    const primaryExperience = experiences[0] || experience;
    const experienceBody = (experiences.length ? experiences : [primaryExperience]).map((item, index) => `
      <div class="executive-experience-item">
        <div class="executive-entry-head">
          <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
          <span ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</span>
        </div>
        <p class="executive-entry-meta">
          <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${hasText(item.company) && hasText(item.location) ? " — " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
        </p>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </div>
    `).join("");
    const educationItems = (data.education || []).filter((item) => hasText(item.degree) || hasText(item.school) || hasText(item.period));
    const educationBody = (educationItems.length ? educationItems : [education]).map((item, index) => `
      <p class="executive-compact-item">
        <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
        <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
        ${hasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
      </p>
    `).join("");
    const executiveParagraphs = (items, fieldName) => `<div class="executive-text-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`;
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-executive executive-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="executive-header">
              <div class="executive-identity">
                <h2 data-preview-field="name" data-preview-empty="Patrick Justino">${display(displayName, "Patrick Justino")}</h2>
                <strong data-preview-field="title" data-preview-empty="${currentLanguage === "pt" ? "Supervisor Administrativo" : "Administrative Supervisor"}">${display(personal.title, currentLanguage === "pt" ? "Supervisor Administrativo" : "Administrative Supervisor")}</strong>
              </div>
              <p class="resume-contact-line executive-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${contactItems.length ? contactItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("") : display(contact, b.document.header)}</p>
            </header>
            ${optional("executive-summary", labels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, hasText(data.summary))}
            <div class="executive-main-column">
              ${optional("executive-strengths executive-main-section", labels.strengths, `<div class="resume-skill-list executive-strength-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, hasList(data.skills))}
              ${optional("executive-experience executive-main-section", labels.experience, experienceBody, experiences.length > 0)}
              ${optional("executive-results executive-main-section", labels.results, executiveParagraphs(data.projects, "projects"), hasList(data.projects))}
            </div>
            <div class="executive-sidebar">
              ${optional("executive-education executive-side-section", labels.education, educationBody, educationItems.length > 0)}
              ${optional("executive-certifications executive-side-section", labels.certifications, executiveParagraphs(data.certifications, "certifications"), hasList(data.certifications))}
              ${optional("executive-languages executive-side-section", labels.languages, `<p data-preview-field="languages" data-preview-empty="">${brList(data.languages, "")}</p>`, hasList(data.languages))}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  if (template === "student") {
    const hasText = (item) => String(item || "").trim().length > 0;
    const hasList = (items) => normalizeTextList(items).length > 0;
    const studentLabels = currentLanguage === "pt"
      ? {
        objective: "Objetivo profissional",
        education: "Formação acadêmica",
        skills: "Habilidades",
        projects: "Projetos acadêmicos",
        courses: "Cursos e certificações",
        experience: "Experiência e atividades",
        languages: "Idiomas",
        links: "Links",
      }
      : {
        objective: "Professional Objective",
        education: "Education",
        skills: "Skills",
        projects: "Academic Projects",
        courses: "Courses and Certifications",
        experience: "Experience and Activities",
        languages: "Languages",
        links: "Links",
      };
    const contactItems = [displayLocation, personal.email, personal.phone, normalizeTextList(data.professionalLinks)[0]].filter(Boolean);
    const studentContact = contactItems.join(" | ") || b.document.header;
    const optional = (className, title, body, hasContent) => `
      <section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}>
        <h3>${title}</h3>
        ${body}
      </section>
    `;
    const educationItems = (data.education || []).filter((item) => hasText(item.degree) || hasText(item.school));
    const hasEducation = educationItems.length > 0;
    const educationBody = (hasEducation ? educationItems : [education]).map((item, index) => `
      <div class="student-education-item">
        <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
        <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
      </div>
    `).join("");
    const experiences = (data.workExperience || []).filter((item) => hasText(item.role) || hasText(item.company) || hasText(item.location) || hasText(item.period) || hasList(item.achievements));
    const primaryExperience = experiences[0] || experience;
    const hasExperience = experiences.length > 0;
    const experienceBody = (hasExperience ? experiences : [primaryExperience]).map((item, index) => `
      <div class="student-experience-item">
        <div class="student-entry-head">
          <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
          <span ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</span>
        </div>
        <p class="student-entry-meta">
          <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>
          <span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
        </p>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </div>
    `).join("");
    const studentParagraphs = (items, fieldName) => `<div class="student-text-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`;
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-student student-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="student-header">
              <div>
                <h2 data-preview-field="name" data-preview-empty="Patrick Justino">${display(displayName, "Patrick Justino")}</h2>
                <strong data-preview-field="title" data-preview-empty="${currentLanguage === "pt" ? "Estudante de Administração | Buscando estágio" : "Business Student | Seeking an internship"}">${display(personal.title, currentLanguage === "pt" ? "Estudante de Administração | Buscando estágio" : "Business Student | Seeking an internship")}</strong>
              </div>
              <p class="resume-contact-line student-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(studentContact, b.document.header)}</p>
            </header>
            ${optional("student-objective", studentLabels.objective, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, hasText(data.summary))}
            ${optional("student-education", studentLabels.education, educationBody, hasEducation)}
            ${optional("student-skills", studentLabels.skills, `<div class="resume-skill-list student-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, hasList(data.skills))}
            ${optional("student-projects", studentLabels.projects, studentParagraphs(data.projects, "projects"), hasList(data.projects))}
            ${optional("student-courses", studentLabels.courses, studentParagraphs(data.certifications, "certifications"), hasList(data.certifications))}
            ${optional("student-experience", studentLabels.experience, experienceBody, hasExperience)}
            ${optional("student-languages", studentLabels.languages, `<p data-preview-field="languages" data-preview-empty="">${brList(data.languages, "")}</p>`, hasList(data.languages))}
            ${optional("student-links", studentLabels.links, `<div class="resume-link-list" data-preview-field="links" data-preview-empty="">${paragraphList(data.professionalLinks, "")}</div>`, hasList(data.professionalLinks))}
          </div>
        </div>
      </div>
    `;
  }
  if (template === "first-job") {
    const hasText = (item) => String(item || "").trim().length > 0;
    const hasList = (items) => normalizeTextList(items).length > 0;
    const firstJobLabels = currentLanguage === "pt"
      ? {
        objective: "Objetivo profissional",
        profile: "Perfil",
        skills: "Habilidades principais",
        education: "Formação",
        courses: "Cursos e certificações",
        activities: "Experiência e atividades",
        projects: "Projetos",
        languages: "Idiomas",
        links: "Links",
      }
      : {
        objective: "Career Objective",
        profile: "Profile",
        skills: "Key Skills",
        education: "Education",
        courses: "Courses and Certifications",
        activities: "Experience and Activities",
        projects: "Projects",
        languages: "Languages",
        links: "Links",
      };
    const contactItems = [displayLocation, personal.email, personal.phone].filter(Boolean);
    const firstJobContact = contactItems.join(" | ") || b.document.header;
    const profileText = data.initialProfile || data.profileSummary || data.profile || data.personal?.profile || "";
    const optional = (className, title, body, hasContent) => `
      <section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}>
        <h3>${title}</h3>
        ${body}
      </section>
    `;
    const educationItems = (data.education || []).filter((item) => hasText(item.degree) || hasText(item.school));
    const educationBody = (educationItems.length ? educationItems : [education]).map((item, index) => `
      <div class="first-job-education-item">
        <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
        <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
      </div>
    `).join("");
    const experiences = (data.workExperience || []).filter((item) => hasText(item.role) || hasText(item.company) || hasText(item.location) || hasText(item.period) || hasList(item.achievements));
    const firstJobExperienceBody = experiences.map((item, index) => `
      <div class="first-job-activity-item">
        <div class="first-job-entry-head">
          <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
          <span ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</span>
        </div>
        <p class="first-job-entry-meta">
          <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>
          <span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
        </p>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </div>
    `).join("");
    const firstJobParagraphs = (items, fieldName) => `<div class="first-job-text-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`;
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-first-job first-job-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="first-job-header">
              <h2 data-preview-field="name" data-preview-empty="Patrick Justino">${display(displayName, "Patrick Justino")}</h2>
              <strong data-preview-field="title" data-preview-empty="${currentLanguage === "pt" ? "Buscando primeira oportunidade como Auxiliar Administrativo" : "Seeking a first opportunity as an Administrative Assistant"}">${display(personal.title, currentLanguage === "pt" ? "Buscando primeira oportunidade como Auxiliar Administrativo" : "Seeking a first opportunity as an Administrative Assistant")}</strong>
              <p class="resume-contact-line first-job-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(firstJobContact, b.document.header)}</p>
            </header>
            ${optional("first-job-objective", firstJobLabels.objective, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, hasText(data.summary))}
            ${optional("first-job-profile", firstJobLabels.profile, `<p>${display(profileText, "")}</p>`, hasText(profileText))}
            ${optional("first-job-skills", firstJobLabels.skills, `<div class="resume-skill-list first-job-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, hasList(data.skills))}
            ${optional("first-job-education", firstJobLabels.education, educationBody, educationItems.length > 0)}
            ${optional("first-job-courses", firstJobLabels.courses, firstJobParagraphs(data.certifications, "certifications"), hasList(data.certifications))}
            ${optional("first-job-activities", firstJobLabels.activities, firstJobExperienceBody, experiences.length > 0)}
            ${optional("first-job-projects", firstJobLabels.projects, firstJobParagraphs(data.projects, "projects"), hasList(data.projects))}
            ${optional("first-job-languages", firstJobLabels.languages, `<p data-preview-field="languages" data-preview-empty="">${brList(data.languages, "")}</p>`, hasList(data.languages))}
            ${optional("first-job-links", firstJobLabels.links, `<div class="resume-link-list first-job-link-list" data-preview-field="links" data-preview-empty="">${paragraphList(data.professionalLinks, "")}</div>`, hasList(data.professionalLinks))}
          </div>
        </div>
      </div>
    `;
  }
  if (template === "simple-ats") {
    const hasText = (item) => String(item || "").trim().length > 0;
    const hasList = (items) => normalizeTextList(items).length > 0;
    const simpleLabels = currentLanguage === "pt"
      ? {
        summary: "Resumo profissional",
        experience: "Experiência profissional",
        education: "Formação",
        skills: "Habilidades",
        certifications: "Certificações",
        languages: "Idiomas",
        projects: "Projetos",
        links: "Links",
      }
      : {
        summary: "Professional Summary",
        experience: "Work Experience",
        education: "Education",
        skills: "Skills",
        certifications: "Certifications",
        languages: "Languages",
        projects: "Projects",
        links: "Links",
      };
    const contactItems = [personal.email, personal.phone, displayLocation, normalizeTextList(data.professionalLinks)[0]].filter(Boolean);
    const simpleContact = contactItems.join(" | ") || b.document.header;
    const optional = (className, title, body, hasContent) => `
      <section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}>
        <h3>${title}</h3>
        ${body}
      </section>
    `;
    const experiences = (data.workExperience || []).filter((item) => hasText(item.role) || hasText(item.company) || hasText(item.location) || hasText(item.period) || hasList(item.achievements));
    const primaryExperience = experiences[0] || experience;
    const experienceBody = (experiences.length ? experiences : [primaryExperience]).map((item, index) => `
      <div class="simple-ats-experience-item">
        <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
        <p class="simple-ats-company-line">
          <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${hasText(item.company) && hasText(item.location) ? ", " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
        </p>
        <p class="simple-ats-period" ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</p>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </div>
    `).join("");
    const educationItems = (data.education || []).filter((item) => hasText(item.degree) || hasText(item.school));
    const educationBody = (educationItems.length ? educationItems : [education]).map((item, index) => `
      <div class="simple-ats-education-item">
        <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
        <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
        ${hasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
      </div>
    `).join("");
    const simpleCertifications = (items, fieldName) => `<div class="simple-ats-text-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => `<p>${escapeHtml(item.replace(/\s+-\s+([^-\n]+)\s+-\s+(\d{4})$/, " - $1 | $2"))}</p>`).join("")}</div>`;
    const simpleProjects = (items, fieldName) => `<div class="simple-ats-project-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => {
      const parts = item.split(" - ").map((part) => part.trim()).filter(Boolean);
      const title = parts.shift() || item;
      return `<p><strong>${escapeHtml(title)}</strong>${parts.length ? `<span>${escapeHtml(parts.join(" - "))}</span>` : ""}</p>`;
    }).join("")}</div>`;
    const simpleLinkLine = normalizeTextList(data.professionalLinks).map(escapeHtml).join(" | ");
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-simple-ats simple-ats-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="simple-ats-header">
              <h2 data-preview-field="name" data-preview-empty="Patrick Justino">${display(displayName, "Patrick Justino")}</h2>
              <strong data-preview-field="title" data-preview-empty="${currentLanguage === "pt" ? "Supervisor Administrativo" : "Administrative Supervisor"}">${display(personal.title, currentLanguage === "pt" ? "Supervisor Administrativo" : "Administrative Supervisor")}</strong>
              <p class="resume-contact-line simple-ats-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(simpleContact, b.document.header)}</p>
            </header>
            ${optional("simple-ats-summary", simpleLabels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, hasText(data.summary))}
            ${optional("simple-ats-experience", simpleLabels.experience, experienceBody, experiences.length > 0)}
            ${optional("simple-ats-education", simpleLabels.education, educationBody, educationItems.length > 0)}
            ${optional("simple-ats-skills", simpleLabels.skills, `<div class="resume-skill-list simple-ats-skill-text" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, hasList(data.skills))}
            ${optional("simple-ats-certifications", simpleLabels.certifications, simpleCertifications(data.certifications, "certifications"), hasList(data.certifications))}
            ${optional("simple-ats-languages", simpleLabels.languages, `<p data-preview-field="languages" data-preview-empty="">${brList(data.languages, "")}</p>`, hasList(data.languages))}
            ${optional("simple-ats-projects", simpleLabels.projects, simpleProjects(data.projects, "projects"), hasList(data.projects))}
            ${optional("simple-ats-links", simpleLabels.links, `<p class="simple-ats-link-line" data-preview-field="links" data-preview-empty="">${simpleLinkLine}</p>`, hasList(data.professionalLinks))}
          </div>
        </div>
      </div>
    `;
  }
  if (template === "minimal") {
    const hasText = (item) => String(item || "").trim().length > 0;
    const hasList = (items) => normalizeTextList(items).length > 0;
    const optional = (className, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3>${title}</h3>${body}</section>`;
    const simpleLines = (items) => normalizeTextList(items).map(escapeHtml).join("<br>");
    const textParagraphs = (items) => normalizeTextList(items).map((item) => `<p>${escapeHtml(item)}</p>`).join("");
    const experiences = (data.workExperience || []).filter((item) => hasText(item.role) || hasText(item.company) || hasText(item.location) || hasText(item.period) || hasList(item.achievements));
    const primaryExperience = experiences[0] || experience;
    const hasExperience = experiences.length > 0;
    const experienceEntries = (hasExperience ? experiences : [primaryExperience]).map((item, index) => `
      <div class="minimal-ats-experience">
        <div class="minimal-ats-entry-head">
          <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
          <span ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</span>
        </div>
        <p class="minimal-ats-company-line">
          <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>
          <span class="minimal-ats-location" ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
        </p>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </div>
    `).join("");
    const hasEducation = hasText(education.degree) || hasText(education.school);
    const hasSkills = hasList(data.skills);
    const hasLanguages = hasList(data.languages);
    const hasCertifications = hasList(data.certifications);
    const hasProjects = hasList(data.projects);
    const hasLinks = hasList(data.professionalLinks);
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
            ${optional("minimal-ats-summary", b.document.summaryTitle, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, hasText(data.summary))}
            ${optional("minimal-ats-experience-section", b.document.experienceTitle, experienceEntries, hasExperience)}
            ${optional("minimal-ats-education", b.document.educationTitle, `<p><strong data-preview-field="educationDegree" data-preview-empty="">${display(education.degree, "")}</strong><br><span data-preview-field="educationSchool" data-preview-empty="">${display(education.school, "")}</span></p>`, hasEducation)}
            ${optional("minimal-ats-skills", b.document.skillsTitle, `<div class="resume-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, hasSkills)}
            ${optional("minimal-ats-languages", b.labels.languages, `<p data-preview-field="languages" data-preview-empty="">${simpleLines(data.languages)}</p>`, hasLanguages)}
            ${optional("minimal-ats-certifications", b.labels.certifications, `<p data-preview-field="certifications" data-preview-empty="">${simpleLines(data.certifications)}</p>`, hasCertifications)}
            ${optional("minimal-ats-projects", b.labels.projects, `<div data-preview-field="projects" data-preview-empty="">${textParagraphs(data.projects)}</div>`, hasProjects)}
            ${optional("minimal-ats-links", b.labels.links, `<div class="resume-link-list" data-preview-field="links" data-preview-empty="">${textParagraphs(data.professionalLinks)}</div>`, hasLinks)}
          </div>
        </div>
      </div>
    `;
  }
  const templateProfile = {
    creative: { layout: "portfolio-left", tone: "creative", accent: "visual" },
    marketing: { layout: "portfolio-left", tone: "marketing", accent: "campaigns" },
    designer: { layout: "portfolio-left", tone: "designer", accent: "portfolio" },
    tech: { layout: "tech-left", tone: "tech", accent: "stack" },
    developer: { layout: "tech-left", tone: "developer", accent: "code" },
    startup: { layout: "tech-left", tone: "startup", accent: "impact" },
    international: { layout: "global-right", tone: "international", accent: "global" },
    "remote-work": { layout: "global-right", tone: "remote", accent: "remote" },
    global: { layout: "global-right", tone: "global", accent: "global" },
    elegant: { layout: "elegant-right", tone: "elegant", accent: "refined" },
    finance: { layout: "precision-right", tone: "finance", accent: "metrics" },
    corporate: { layout: "corporate-rail", tone: "corporate", accent: "business" },
    professional: { layout: "professional-split", tone: "professional", accent: "versatile" },
    sales: { layout: "corporate-rail", tone: "sales", accent: "performance" },
    operations: { layout: "corporate-rail", tone: "operations", accent: "process" },
    healthcare: { layout: "care-rail", tone: "healthcare", accent: "trust" },
    "senior-executive": { layout: "executive-premium", tone: "senior", accent: "leadership" },
    manager: { layout: "executive-premium", tone: "manager", accent: "teams" },
    consultant: { layout: "consultant-premium", tone: "consultant", accent: "strategy" },
    classic: { layout: "formal-flow", tone: "classic", accent: "formal" },
    legal: { layout: "formal-flow", tone: "legal", accent: "law" },
    academic: { layout: "academic-flow", tone: "academic", accent: "research" },
    "clean-pro": { layout: "clean-flow", tone: "clean", accent: "clarity" },
    "modern-ats": { layout: "ats-pro-flow", tone: "modern-ats", accent: "ats" },
    "customer-service": { layout: "service-grid", tone: "service", accent: "support" },
    graduate: { layout: "graduate-grid", tone: "graduate", accent: "growth" },
  }[template] || { layout: "professional-split", tone: "professional", accent: "versatile" };
  const curatedLabels = currentLanguage === "pt"
    ? {
      summary: ["senior-executive", "manager", "consultant"].includes(template) ? "Resumo executivo" : "Perfil profissional",
      experience: "Experiência profissional",
      education: "Formação",
      skills: ["tech", "developer", "startup"].includes(template) ? "Stack e habilidades" : "Competências",
      languages: "Idiomas",
      certifications: "Certificações",
      projects: ["creative", "designer", "marketing", "developer", "startup", "consultant", "academic"].includes(template) ? "Projetos em destaque" : "Projetos",
      links: ["tech", "developer", "designer", "startup"].includes(template) ? "Links profissionais" : "Links",
    }
    : {
      summary: ["senior-executive", "manager", "consultant"].includes(template) ? "Executive Summary" : "Professional Profile",
      experience: "Professional Experience",
      education: "Education",
      skills: ["tech", "developer", "startup"].includes(template) ? "Stack and Skills" : "Core Skills",
      languages: "Languages",
      certifications: "Certifications",
      projects: ["creative", "designer", "marketing", "developer", "startup", "consultant", "academic"].includes(template) ? "Featured Projects" : "Projects",
      links: ["tech", "developer", "designer", "startup"].includes(template) ? "Professional Links" : "Links",
    };
  const curatedHasText = (item) => String(item || "").trim().length > 0;
  const curatedHasList = (items) => normalizeTextList(items).length > 0;
  const curatedOptional = (className, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3>${title}</h3>${body}</section>`;
  const curatedParagraphs = (items, fieldName) => `<div class="curated-text-list" data-preview-field="${fieldName}" data-preview-empty="">${normalizeTextList(items).map((item) => `<p>${escapeHtml(item)}</p>`).join("")}</div>`;
  const curatedLines = (items) => normalizeTextList(items).map(escapeHtml).join("<br>");
  const curatedContactItems = [displayLocation, personal.email, personal.phone, normalizeTextList(data.professionalLinks)[0]].filter(Boolean);
  const curatedContact = curatedContactItems.join(" | ") || b.document.header;
  const curatedExperiences = (data.workExperience || []).filter((item) => curatedHasText(item.role) || curatedHasText(item.company) || curatedHasText(item.location) || curatedHasText(item.period) || curatedHasList(item.achievements));
  const curatedPrimaryExperience = curatedExperiences[0] || experience;
  const curatedExperienceEntries = (curatedExperiences.length ? curatedExperiences : [curatedPrimaryExperience]).map((item, index) => `
    <div class="curated-experience-item">
      <div class="curated-entry-head">
        <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
        <span ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</span>
      </div>
      <p class="curated-entry-meta">
        <span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${curatedHasText(item.company) && curatedHasText(item.location) ? " - " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span>
      </p>
      <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
    </div>
  `).join("");
  const curatedEducationItems = (data.education || []).filter((item) => curatedHasText(item.degree) || curatedHasText(item.school) || curatedHasText(item.period));
  const curatedEducationEntries = (curatedEducationItems.length ? curatedEducationItems : [education]).map((item, index) => `
    <p class="curated-compact-item">
      <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
      <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
      ${curatedHasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
    </p>
  `).join("");
  if (template === "sales") {
    const salesSection = (className, iconName, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3><span>${icon(iconName)}</span>${title}</h3>${body}</section>`;
    const salesLinks = normalizeTextList(data.professionalLinks);
    const salesContactItems = [
      ["mail", personal.email],
      ["headset", personal.phone],
      ["globe", displayLocation],
      ["link", salesLinks[0]],
    ].filter((item) => curatedHasText(item[1]));
    const salesContacts = salesContactItems.map(([iconName, value]) => `<p>${icon(iconName)}<span>${escapeHtml(value)}</span></p>`).join("");
    const metricSources = [
      data.summary,
      ...curatedExperiences.flatMap((item) => normalizeTextList(item.achievements)),
      ...normalizeTextList(data.projects),
    ].filter(Boolean);
    const metricPattern = /(?:R\$\s?[\d.,]+\s?[MBK]?|\+?\d+(?:[,.]\d+)?\s?%|\d+(?:[,.]\d+)?\s?x)/i;
    const salesMetricLabel = (text, metric) => {
      const normalized = String(text || "").toLowerCase();
      if (/meta|quota|target/.test(normalized)) return currentLanguage === "pt" ? "da meta anual atingida" : "of annual quota reached";
      if (/lead|qualified|qualificado|prospect/.test(normalized)) return currentLanguage === "pt" ? "em geracao de leads qualificados" : "in qualified lead generation";
      if (/receita|revenue|faturamento|mrr|arr/.test(normalized)) return currentLanguage === "pt" ? "em receita influenciada" : "in influenced revenue";
      if (/convers|conversion|fechamento|closing/.test(normalized)) return currentLanguage === "pt" ? "de aumento na conversao" : "increase in conversion";
      if (/retenc|reten|retention|churn|recover|recuper/.test(normalized)) return currentLanguage === "pt" ? "em retencao e recuperacao" : "in retention and recovery";
      return String(text || "")
        .replace(metric, "")
        .replace(/^[\s:;,.+-]+|[\s:;,.]+$/g, "")
        .replace(/\s+/g, " ")
        .slice(0, 64) || (currentLanguage === "pt" ? "resultado comercial" : "commercial result");
    };
    const salesMetrics = [];
    metricSources.forEach((item) => {
      if (salesMetrics.length >= 4) return;
      const text = String(item || "").trim();
      const match = text.match(metricPattern);
      if (!match) return;
      const metric = match[0].replace(/\s+/g, " ").trim();
      const label = salesMetricLabel(text, match[0]);
      if (!salesMetrics.some((itemMetric) => itemMetric.metric === metric)) salesMetrics.push({ metric, label: label || (currentLanguage === "pt" ? "resultado comercial" : "commercial result") });
    });
    const salesMetricCards = salesMetrics.map((item, index) => `
      <article>
        <span>${icon(["target", "user", "card", "arrow"][index % 4])}</span>
        <strong>${escapeHtml(item.metric)}</strong>
        <p>${escapeHtml(item.label)}</p>
      </article>
    `).join("");
    const allProjectItems = normalizeTextList(data.projects);
    const salesCourseItems = allProjectItems
      .filter((item) => /^(curso|course):/i.test(item))
      .map((item) => item.replace(/^(curso|course):\s*/i, "").trim())
      .filter(Boolean);
    const salesCaseItems = allProjectItems.filter((item) => !/^(curso|course):/i.test(item));
    const salesCases = salesCaseItems.map((item, index) => {
      const parts = item.split(" - ").map((part) => part.trim()).filter(Boolean);
      const title = parts.shift() || item;
      const text = parts.join(" - ") || item;
      const [description, result] = text.split(/Resultado:|Result:/);
      const resultText = result || (text.match(metricPattern) ? text : "");
      return `
        <article class="sales-case-item">
          <span></span>
          <div>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml((description || text).trim())}</p>
            ${resultText && resultText !== description ? `<b>${currentLanguage === "pt" ? "Resultado:" : "Result:"} ${escapeHtml(resultText.trim())}</b>` : ""}
          </div>
        </article>
      `;
    }).join("");
    const salesEducation = (curatedEducationItems.length ? curatedEducationItems : [education]).map((item, index) => `
      <article class="sales-education-item">
        <div>
          <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
          <p ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</p>
        </div>
        ${curatedHasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
      </article>
    `).join("");
    const salesExperience = (curatedExperiences.length ? curatedExperiences : [curatedPrimaryExperience]).map((item, index) => `
      <article class="sales-experience-item">
        <div class="sales-experience-head">
          <div>
            <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
            <p><span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${curatedHasText(item.company) && curatedHasText(item.location) ? " - " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span></p>
          </div>
          <em ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</em>
        </div>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(normalizeTextList(item.achievements).slice(0, index < 2 ? 2 : 1), "")}</ul>
      </article>
    `).join("");
    const salesSkills = normalizeTextList(data.skills);
    const salesSkillTags = (salesSkills.length ? salesSkills : normalizeTextList(b.values.skills)).map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
    const salesCertifications = normalizeTextList(data.certifications).map((item, index) => {
      const parts = item.split(/\s+-\s+|,\s*/).map((part) => part.trim()).filter(Boolean);
      const year = parts.length > 2 ? parts.pop() : "";
      const issuer = parts.length > 1 ? parts.pop() : "";
      const name = parts.join(" - ") || item;
      return `
        <article class="sales-cert-item">
          <span>${icon(["shield", "target", "sparkles", "file"][index % 4])}</span>
          <div>
            <strong>${escapeHtml(name)}</strong>
            ${issuer ? `<p>${escapeHtml(issuer)}</p>` : ""}
          </div>
          ${year ? `<em>${escapeHtml(year)}</em>` : ""}
        </article>
      `;
    }).join("");
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-sales sales-pro-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="sales-pro-header">
              <span aria-hidden="true"></span>
              <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
              <strong data-preview-field="title" data-preview-empty="${currentLanguage === "pt" ? "Account Executive" : "Account Executive"}">${display(personal.title, currentLanguage === "pt" ? "Account Executive" : "Account Executive")}</strong>
              <div class="sales-contact-list">${salesContacts}</div>
            </header>
            <main class="sales-pro-main">
              ${salesSection("sales-profile", "user", currentLanguage === "pt" ? "Perfil Profissional" : "Professional Profile", `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
              ${salesSection("sales-metrics", "target", currentLanguage === "pt" ? "Destaques Comerciais" : "Commercial Highlights", `<div class="sales-metric-grid">${salesMetricCards}</div>`, salesMetrics.length > 0)}
              ${salesSection("sales-cases", "card", currentLanguage === "pt" ? "Projetos e Cases Comerciais" : "Commercial Projects and Cases", `<div data-preview-field="projects" data-preview-empty="">${salesCases}</div>`, salesCaseItems.length > 0)}
              ${salesSection("sales-education", "file", currentLanguage === "pt" ? "Formacao Academica" : "Education", salesEducation, curatedEducationItems.length > 0)}
              ${salesSection("sales-courses", "file", currentLanguage === "pt" ? "Cursos Complementares" : "Additional Courses", `<ul>${linesMarkup(salesCourseItems, "")}</ul>`, salesCourseItems.length > 0)}
            </main>
            <aside class="sales-pro-sidebar">
              ${salesSection("sales-experience-card", "card", currentLanguage === "pt" ? "Experiencia Profissional" : "Professional Experience", salesExperience, curatedExperiences.length > 0)}
              ${salesSection("sales-skill-card", "sparkles", currentLanguage === "pt" ? "Competencias" : "Core Skills", `<div class="sales-skill-tags" data-preview-field="skills" data-preview-empty="">${salesSkillTags}</div>`, salesSkills.length > 0)}
              ${salesSection("sales-cert-card", "shield", currentLanguage === "pt" ? "Certificacoes" : "Certifications", `<div data-preview-field="certifications" data-preview-empty="">${salesCertifications}</div>`, curatedHasList(data.certifications))}
            </aside>
          </div>
        </div>
      </div>
    `;
  }
  if (template === "professional") {
    const professionalSection = (className, iconName, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3><span>${icon(iconName)}</span>${title}</h3>${body}</section>`;
    const professionalLinks = normalizeTextList(data.professionalLinks);
    const professionalContactItems = [
      ["mail", personal.email],
      ["headset", personal.phone],
      ["globe", displayLocation],
      ["link", professionalLinks[0]],
      ["layout", professionalLinks[1]],
    ].filter((item) => curatedHasText(item[1]));
    const professionalContacts = professionalContactItems.map(([iconName, value]) => `<p>${icon(iconName)}<span>${escapeHtml(value)}</span></p>`).join("");
    const professionalSkills = normalizeTextList(data.skills);
    const professionalSkillTags = (professionalSkills.length ? professionalSkills : normalizeTextList(b.values.skills)).map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
    const professionalExperienceEntries = (curatedExperiences.length ? curatedExperiences : [curatedPrimaryExperience]).map((item, index) => `
      <article class="professional-pro-experience-item">
        <div class="professional-pro-entry-head">
          <div>
            <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
            <p><span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${curatedHasText(item.company) && curatedHasText(item.location) ? " - " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span></p>
          </div>
          <em ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</em>
        </div>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </article>
    `).join("");
    const professionalEducationEntries = (curatedEducationItems.length ? curatedEducationItems : [education]).map((item, index) => `
      <article class="professional-pro-education-item">
        <div>
          <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
          <p ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</p>
        </div>
        ${curatedHasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
      </article>
    `).join("");
    const professionalSideEducation = (curatedEducationItems.length ? curatedEducationItems : [education]).map((item, index) => `
      <p class="professional-pro-card-entry">
        <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
        <span ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</span>
        ${curatedHasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
      </p>
    `).join("");
    const professionalCertifications = normalizeTextList(data.certifications).map((item, index) => {
      const parts = item.split(" - ").map((part) => part.trim()).filter(Boolean);
      const year = parts.length > 2 ? parts.pop() : "";
      const issuer = parts.length > 1 ? parts.pop() : "";
      const name = parts.join(" - ") || item;
      return `
        <article class="professional-pro-cert-item">
          <span>${icon(["shield", "file", "settings"][index % 3])}</span>
          <div>
            <strong>${escapeHtml(name)}</strong>
            ${issuer ? `<p>${escapeHtml(issuer)}</p>` : ""}
          </div>
          ${year ? `<em>${escapeHtml(year)}</em>` : ""}
        </article>
      `;
    }).join("");
    const professionalCourses = normalizeTextList(data.projects);
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-professional professional-pro-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="professional-pro-header">
              <h2 data-preview-field="name" data-preview-empty="Carlos Mendes">${display(displayName, "Carlos Mendes")}</h2>
              <strong data-preview-field="title" data-preview-empty="${currentLanguage === "pt" ? "Analista de Marketing" : "Marketing Analyst"}">${display(personal.title, currentLanguage === "pt" ? "Analista de Marketing" : "Marketing Analyst")}</strong>
            </header>
            <aside class="professional-pro-sidebar">
      ${professionalSection("professional-pro-contact", "mail", currentLanguage === "pt" ? "Contato" : "Contact", `<div class="professional-pro-contact-list">${professionalContacts}</div>`, professionalContactItems.length > 0)}
              ${professionalSection("professional-pro-card professional-pro-skills", "sparkles", curatedLabels.skills, `<div class="professional-pro-skill-tags" data-preview-field="skills" data-preview-empty="">${professionalSkillTags}</div>`, professionalSkills.length > 0)}
              ${professionalSection("professional-pro-card professional-pro-education-side", "file", currentLanguage === "pt" ? "Educacao" : "Education", professionalSideEducation, curatedEducationItems.length > 0)}
              ${professionalSection("professional-pro-card professional-pro-certifications", "shield", curatedLabels.certifications, `<div data-preview-field="certifications" data-preview-empty="">${professionalCertifications}</div>`, curatedHasList(data.certifications))}
            </aside>
            <main class="professional-pro-main">
              ${professionalSection("professional-pro-profile", "user", curatedLabels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
              ${professionalSection("professional-pro-experience", "layout", curatedLabels.experience, professionalExperienceEntries, curatedExperiences.length > 0)}
              ${professionalSection("professional-pro-education-main", "file", curatedLabels.education, professionalEducationEntries, curatedEducationItems.length > 0)}
              ${professionalSection("professional-pro-courses", "file", currentLanguage === "pt" ? "Cursos Complementares" : "Additional Courses", `<ul data-preview-field="projects" data-preview-empty="">${linesMarkup(professionalCourses, "")}</ul>`, professionalCourses.length > 0)}
            </main>
          </div>
        </div>
      </div>
    `;
  }
  if (template === "senior-executive") {
    const execSection = (className, iconName, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><div class="exec-section-title"><span>${icon(iconName)}</span><h3>${title}</h3></div>${body}</section>`;
    const executiveInitial = (displayName || "Amanda Silva").trim().charAt(0).toUpperCase() || "A";
    const executiveTagline = currentLanguage === "pt"
      ? "Gestão eficiente de processos, pessoas e resultados para impulsionar performance e crescimento."
      : "Efficient leadership of people, processes and results to drive performance and growth.";
    const executiveFooter = currentLanguage === "pt" ? ["ORGANIZAÇÃO", "ESTRATÉGIA", "RESULTADOS"] : ["ORGANIZATION", "STRATEGY", "RESULTS"];
    const executiveContactItems = [
      ["mail", personal.email],
      ["headset", personal.phone],
      ["globe", displayLocation],
      ["link", normalizeTextList(data.professionalLinks)[0]],
    ].filter((item) => curatedHasText(item[1]));
    const executiveContacts = executiveContactItems.length
      ? executiveContactItems.map(([iconName, value], index) => `<p ${index === 0 ? `data-preview-field="contact" data-preview-empty="${b.document.header}"` : ""}><span>${icon(iconName)}</span>${escapeHtml(value)}</p>`).join("")
      : `<p data-preview-field="contact" data-preview-empty="${b.document.header}"><span>${icon("mail")}</span>${display(curatedContact, b.document.header)}</p>`;
    const executiveSkills = normalizeTextList(data.skills);
    const executiveSkillList = (executiveSkills.length ? executiveSkills : normalizeTextList(b.values.skills)).map((skill, index) => {
      const width = [96, 91, 88, 94, 86, 82, 90, 78][index % 8];
      return `<p><span>${escapeHtml(skill)}</span><em><i style="width:${width}%"></i></em></p>`;
    }).join("");
    const executiveLanguages = normalizeTextList(data.languages).map((item) => {
      const [language, ...levelParts] = item.split(/[-–—|:]/);
      const level = levelParts.join(" ").trim();
      return `<p><span>${escapeHtml(language.trim() || item)}</span>${level ? `<strong>${escapeHtml(level)}</strong>` : ""}</p>`;
    }).join("");
    const executiveExperienceEntries = (curatedExperiences.length ? curatedExperiences : [curatedPrimaryExperience]).map((item, index) => `
      <article class="exec-experience-item">
        <div class="exec-entry-top">
          <div>
            <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
            <p><span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${curatedHasText(item.company) && curatedHasText(item.location) ? " - " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span></p>
          </div>
          <em ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</em>
        </div>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </article>
    `).join("");
    const executiveProjectItems = normalizeTextList(data.projects);
    const executiveProjects = executiveProjectItems.map((item, index) => `
      <article class="exec-project-item">
        <strong>${escapeHtml(item.split(" - ")[0] || item)}</strong>
        <p>${escapeHtml(item.includes(" - ") ? item.split(" - ").slice(1).join(" - ") : item)}</p>
        <em>${new Date().getFullYear() - Math.min(index, 3)}</em>
      </article>
    `).join("");
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-senior-executive executive-signature-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="exec-signature-header">
              <div class="exec-ribbon"><span>${escapeHtml(executiveInitial)}</span></div>
              <div class="exec-title-block">
                <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
                <strong data-preview-field="title" data-preview-empty="${b.values.professionalTitle}">${display(personal.title, b.values.professionalTitle)}</strong>
                <p>${escapeHtml(executiveTagline)}</p>
              </div>
              <div class="exec-dot-field" aria-hidden="true"></div>
            </header>
            <div class="exec-signature-body">
              <aside class="exec-sidebar">
                ${execSection("exec-side-section exec-contact", "user", currentLanguage === "pt" ? "Contato" : "Contact", executiveContacts, executiveContactItems.length > 0 || curatedHasText(curatedContact))}
                ${execSection("exec-side-section exec-skills", "sparkles", curatedLabels.skills, `<div class="exec-skill-meter-list" data-preview-field="skills" data-preview-empty="">${executiveSkillList}</div>`, executiveSkills.length > 0)}
                ${execSection("exec-side-section exec-languages", "globe", curatedLabels.languages, `<div class="exec-language-list" data-preview-field="languages" data-preview-empty="">${executiveLanguages}</div>`, curatedHasList(data.languages))}
                ${execSection("exec-side-section exec-certifications", "shield", curatedLabels.certifications, `<ul data-preview-field="certifications" data-preview-empty="">${linesMarkup(data.certifications, "")}</ul>`, curatedHasList(data.certifications))}
              </aside>
              <main class="exec-main">
                ${execSection("exec-main-section exec-summary", "sparkles", curatedLabels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
                ${execSection("exec-main-section exec-experience", "layout", curatedLabels.experience, executiveExperienceEntries, curatedExperiences.length > 0)}
                ${execSection("exec-main-section exec-education", "file", curatedLabels.education, curatedEducationEntries, curatedEducationItems.length > 0)}
                ${execSection("exec-main-section exec-projects", "target", curatedLabels.projects, `<div class="exec-project-list" data-preview-field="projects" data-preview-empty="">${executiveProjects}</div>`, executiveProjectItems.length > 0)}
              </main>
            </div>
            <footer class="exec-signature-footer">${executiveFooter.map((word) => `<strong>${escapeHtml(word)}</strong>`).join("<span></span>")}</footer>
          </div>
        </div>
      </div>
    `;
  }
  if (template === "elegant") {
    const elegantSection = (className, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3>${title}</h3>${body}</section>`;
    const elegantInitials = (displayName || "Amanda Silva").split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part.charAt(0)).join("").toUpperCase() || "AS";
    const elegantSideSections = [
      elegantSection("elegant-panel elegant-skills", curatedLabels.skills, `<div class="resume-skill-list elegant-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, curatedHasList(data.skills)),
      elegantSection("elegant-panel elegant-education", curatedLabels.education, curatedEducationEntries, curatedEducationItems.length > 0),
      elegantSection("elegant-panel elegant-certifications", curatedLabels.certifications, `<p data-preview-field="certifications" data-preview-empty="">${curatedLines(data.certifications)}</p>`, curatedHasList(data.certifications)),
      elegantSection("elegant-panel elegant-languages", curatedLabels.languages, `<p data-preview-field="languages" data-preview-empty="">${curatedLines(data.languages)}</p>`, curatedHasList(data.languages)),
      elegantSection("elegant-panel elegant-links", curatedLabels.links, `<div class="resume-link-list curated-link-list" data-preview-field="links" data-preview-empty="">${paragraphList(data.professionalLinks, "")}</div>`, curatedHasList(data.professionalLinks)),
    ].join("");
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-elegant elegant-premium-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="elegant-premium-header">
              <span class="elegant-monogram" aria-hidden="true">${escapeHtml(elegantInitials)}</span>
              <div class="elegant-identity">
                <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
                <strong data-preview-field="title" data-preview-empty="${b.values.professionalTitle}">${display(personal.title, b.values.professionalTitle)}</strong>
              </div>
              <p class="resume-contact-line elegant-contact" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(curatedContact, b.document.header)}</p>
            </header>
            <div class="elegant-body">
              <main class="elegant-main">
                ${elegantSection("elegant-profile", curatedLabels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
                ${elegantSection("elegant-experience", curatedLabels.experience, curatedExperienceEntries, curatedExperiences.length > 0)}
                ${elegantSection("elegant-projects", curatedLabels.projects, curatedParagraphs(data.projects, "projects"), curatedHasList(data.projects))}
              </main>
              <aside class="elegant-sidebar">
                ${elegantSideSections}
              </aside>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  if (template === "tech") {
    const techSection = (className, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3>${title}</h3>${body}</section>`;
    const productLabel = currentLanguage === "pt" ? "Resumo Profissional" : "Profile Summary";
    const stackLabel = currentLanguage === "pt" ? "Stack e Habilidades" : "Stack & Skills";
    const contactLabel = currentLanguage === "pt" ? "Contato e Idiomas" : "Contact & Languages";
    const techSkills = normalizeTextList(data.skills);
    const techSkillItems = (techSkills.length ? techSkills : normalizeTextList(b.values.skills)).map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
    const techExperienceEntries = (curatedExperiences.length ? curatedExperiences : [curatedPrimaryExperience]).map((item, index) => `
      <article class="tech-product-experience-item">
        <div class="tech-product-entry-head">
          <div>
            <strong ${index === 0 ? `data-preview-field="experienceRole" data-preview-empty=""` : ""}>${display(item.role, "")}</strong>
            <p><span ${index === 0 ? `data-preview-field="experienceCompany" data-preview-empty=""` : ""}>${display(item.company, "")}</span>${curatedHasText(item.company) && curatedHasText(item.location) ? " - " : ""}<span ${index === 0 ? `data-preview-field="experienceLocation" data-preview-empty=""` : ""}>${display(item.location, "")}</span></p>
          </div>
          <em ${index === 0 ? `data-preview-field="experiencePeriod" data-preview-empty=""` : ""}>${display(item.period, "")}</em>
        </div>
        <ul ${index === 0 ? `data-preview-field="experience" data-preview-empty=""` : ""}>${linesMarkup(item.achievements, "")}</ul>
      </article>
    `).join("");
    const techProjects = normalizeTextList(data.projects).map((project, index) => {
      const parts = project.split(" - ");
      const title = parts.shift() || project;
      const text = parts.join(" - ") || project;
      const [description, result] = text.split(/Resultado:|Result:/);
      return `
        <article class="tech-product-project">
          <span>${icon(["target", "layout", "shield"][index % 3])}</span>
          <div>
            <div><strong>${escapeHtml(title)}</strong><em>${new Date().getFullYear() - Math.min(index, 3)}</em></div>
            <p>${escapeHtml((description || text).trim())}</p>
            ${result ? `<b>${currentLanguage === "pt" ? "Resultado:" : "Result:"} ${escapeHtml(result.trim())}</b>` : ""}
          </div>
        </article>
      `;
    }).join("");
    const techEducation = curatedEducationItems.map((item, index) => `
      <p class="tech-product-credential">
        <span>${icon("file")}</span>
        <strong ${index === 0 ? `data-preview-field="educationDegree" data-preview-empty=""` : ""}>${display(item.degree, "")}</strong>
        <small ${index === 0 ? `data-preview-field="educationSchool" data-preview-empty=""` : ""}>${display(item.school, "")}</small>
        ${curatedHasText(item.period) ? `<em>${display(item.period, "")}</em>` : ""}
      </p>
    `).join("");
    const techCertifications = normalizeTextList(data.certifications).map((item, index) => {
      const parts = item.split(" - ");
      return `<p class="tech-product-credential"><span>${icon(["shield", "target", "settings"][index % 3])}</span><strong>${escapeHtml(parts[0] || item)}</strong>${parts[1] ? `<small>${escapeHtml(parts[1])}</small>` : ""}${parts[2] ? `<em>${escapeHtml(parts[2])}</em>` : ""}</p>`;
    }).join("");
    const techContactItems = [
      ["mail", personal.email],
      ["headset", personal.phone],
      ["globe", displayLocation],
      ["link", normalizeTextList(data.professionalLinks)[0]],
    ].filter((item) => curatedHasText(item[1]));
    const techContacts = techContactItems.map(([iconName, value]) => `<p>${icon(iconName)}<span>${escapeHtml(value)}</span></p>`).join("");
    const techLanguages = normalizeTextList(data.languages).map((item, index) => {
      const [language, ...levelParts] = item.split(/[-–—|:]/);
      const dots = 5 - Math.min(index, 2);
      return `<p><span>${escapeHtml((language || item).trim())}</span><i>${Array.from({ length: 5 }, (_, dotIndex) => `<b class="${dotIndex < dots ? "active" : ""}"></b>`).join("")}</i><strong>${escapeHtml(levelParts.join(" ").trim() || "")}</strong></p>`;
    }).join("");
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-tech tech-product-resume ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <div class="tech-product-top">
              <header class="tech-product-hero">
                <strong data-preview-field="title" data-preview-empty="${b.values.professionalTitle}">${display(personal.title, b.values.professionalTitle)}</strong>
                <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
              </header>
              ${techSection("tech-product-summary", productLabel, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
            </div>
            <main class="tech-product-main">
              ${techSection("tech-product-experience", curatedLabels.experience, techExperienceEntries, curatedExperiences.length > 0)}
              ${techSection("tech-product-projects", currentLanguage === "pt" ? "Projetos em destaque" : "Featured Projects", `<div data-preview-field="projects" data-preview-empty="">${techProjects}</div>`, curatedHasList(data.projects))}
            </main>
            <aside class="tech-product-sidebar">
              ${techSection("tech-product-stack", stackLabel, `<div class="tech-product-stack-list" data-preview-field="skills" data-preview-empty="">${techSkillItems}</div>`, techSkills.length > 0)}
              ${techSection("tech-product-card tech-product-education", curatedLabels.education, techEducation, curatedEducationItems.length > 0)}
              ${techSection("tech-product-card tech-product-certifications", curatedLabels.certifications, techCertifications, curatedHasList(data.certifications))}
              ${techSection("tech-product-contact", contactLabel, `<div class="tech-product-contact-list">${techContacts}</div><div class="tech-product-language-list" data-preview-field="languages" data-preview-empty="">${techLanguages}</div>`, techContactItems.length > 0 || curatedHasList(data.languages))}
            </aside>
          </div>
        </div>
      </div>
    `;
  }
  if (template === "international") {
    const internationalSection = (className, title, body, hasContent) => `<section class="${className}" data-optional-section ${hasContent ? "" : "hidden"}><h3>${title}</h3>${body}</section>`;
    const internationalSideSections = [
      internationalSection("international-card international-skills", curatedLabels.skills, `<div class="resume-skill-list curated-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, curatedHasList(data.skills)),
      internationalSection("international-card international-education", curatedLabels.education, curatedEducationEntries, curatedEducationItems.length > 0),
      internationalSection("international-card international-certifications", curatedLabels.certifications, `<p data-preview-field="certifications" data-preview-empty="">${curatedLines(data.certifications)}</p>`, curatedHasList(data.certifications)),
      internationalSection("international-card international-languages", curatedLabels.languages, `<p data-preview-field="languages" data-preview-empty="">${curatedLines(data.languages)}</p>`, curatedHasList(data.languages)),
      internationalSection("international-card international-links", curatedLabels.links, `<div class="resume-link-list curated-link-list" data-preview-field="links" data-preview-empty="">${paragraphList(data.professionalLinks, "")}</div>`, curatedHasList(data.professionalLinks)),
    ].join("");
    return `
      <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
        <div class="resume-page-scale-wrapper">
          <div class="resume-document professional-preview resume-template-international international-resume curated-resume curated-tone-international ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
            <header class="international-header">
              <div class="international-mark" aria-hidden="true"></div>
              <div class="international-identity">
                <span class="international-kicker">${currentLanguage === "pt" ? "Perfil global" : "Global profile"}</span>
                <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
                <strong data-preview-field="title" data-preview-empty="${b.values.professionalTitle}">${display(personal.title, b.values.professionalTitle)}</strong>
              </div>
              <p class="resume-contact-line international-contact" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(curatedContact, b.document.header)}</p>
            </header>
            <div class="international-body">
              <main class="international-main">
                ${internationalSection("international-profile", curatedLabels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
                ${internationalSection("international-experience", curatedLabels.experience, curatedExperienceEntries, curatedExperiences.length > 0)}
                ${internationalSection("international-projects", curatedLabels.projects, curatedParagraphs(data.projects, "projects"), curatedHasList(data.projects))}
              </main>
              <aside class="international-sidebar">
                ${internationalSideSections}
              </aside>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  return `
    <div class="resume-document-shell ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}" data-resume-document-shell>
      <div class="resume-page-scale-wrapper">
        <div class="resume-document professional-preview resume-template-${template} curated-resume curated-layout-${templateProfile.layout} curated-tone-${templateProfile.tone} curated-accent-${templateProfile.accent} ${documentFormatClass(format)}" data-document-format-current="${normalizeDocumentFormat(format)}">
          <header class="curated-header">
            <div class="curated-header-mark" aria-hidden="true"></div>
            <div>
              <h2 data-preview-field="name" data-preview-empty="Amanda Silva">${display(displayName, "Amanda Silva")}</h2>
              <strong data-preview-field="title" data-preview-empty="${b.values.professionalTitle}">${display(personal.title, b.values.professionalTitle)}</strong>
            </div>
            <p class="resume-contact-line curated-contact-line" data-preview-field="contact" data-preview-empty="${b.document.header}">${display(curatedContact, b.document.header)}</p>
          </header>
          ${curatedOptional("curated-summary curated-main-section", curatedLabels.summary, `<p data-preview-field="summary" data-preview-empty="">${display(data.summary, "")}</p>`, curatedHasText(data.summary))}
          ${curatedOptional("curated-experience curated-main-section", curatedLabels.experience, curatedExperienceEntries, curatedExperiences.length > 0)}
          ${curatedOptional("curated-projects curated-main-section", curatedLabels.projects, curatedParagraphs(data.projects, "projects"), curatedHasList(data.projects))}
          ${curatedOptional("curated-skills curated-side-section", curatedLabels.skills, `<div class="resume-skill-list curated-skill-list" data-preview-field="skills" data-preview-empty="">${listMarkup(data.skills, "")}</div>`, curatedHasList(data.skills))}
          ${curatedOptional("curated-education curated-side-section", curatedLabels.education, curatedEducationEntries, curatedEducationItems.length > 0)}
          ${curatedOptional("curated-certifications curated-side-section", curatedLabels.certifications, `<p data-preview-field="certifications" data-preview-empty="">${curatedLines(data.certifications)}</p>`, curatedHasList(data.certifications))}
          ${curatedOptional("curated-languages curated-side-section", curatedLabels.languages, `<p data-preview-field="languages" data-preview-empty="">${curatedLines(data.languages)}</p>`, curatedHasList(data.languages))}
          ${curatedOptional("curated-links curated-side-section", curatedLabels.links, `<div class="resume-link-list curated-link-list" data-preview-field="links" data-preview-empty="">${paragraphList(data.professionalLinks, "")}</div>`, curatedHasList(data.professionalLinks))}
        </div>
      </div>
    </div>
  `;
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
  const atsLocked = !canUseFeature("ats_advanced", selectedResume ? { resumeId: selectedResume.id } : {});
  const tailorLocked = !canUseFeature("job_tailoring", selectedResume ? { resumeId: selectedResume.id } : {});
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
          <div class="ai-form-actions">
            <button class="primary-button full ${atsLocked ? "locked-action" : ""}" type="submit">${icon(atsLocked ? "lock" : "target")} ${isLoading ? a.analyzing : a.button}</button>
            <button class="secondary-button full ${tailorLocked ? "locked-action" : ""}" type="button" data-ai-tailor-job>${icon(tailorLocked ? "lock" : "sparkles")} ${aiCopy().tailorJob}</button>
          </div>
        </form>
      </section>
      <section class="ai-results">
        <article class="ats-score ai-score-card">
          <span>${a.score}</span>
          <strong>${isLoading ? "..." : `${score}%`}</strong>
          <em>${isLoading ? a.analyzing : scoreLabel}</em>
          <div class="progress"><span style="width:${isLoading ? 18 : score}%"></span></div>
          <p class="ats-disclaimer">${escapeHtml(aiCopy().atsDisclaimer)}</p>
        </article>
        <section class="ai-suggestions-panel">
          <div class="ai-section-head"><h3>${a.suggestionsTitle}</h3>${atsLocked ? lockedBadge("ats_advanced") : ""}</div>
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
          ? `<button class="secondary-button small locked-action" type="button" data-route="/dashboard/billing">${icon("lock")} ${t().dashboard.access.viewPlans}</button>`
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

function ruleBasedSummary(resume) {
  const role = resume.personal?.title || resume.workExperience?.[0]?.role || (currentLanguage === "pt" ? "profissional" : "professional");
  const skills = (resume.skills || []).slice(0, 4).join(", ");
  const experience = (resume.workExperience?.[0]?.achievements || [])[0] || "";
  if (currentLanguage === "pt") {
    return `${role} com experiência em ${skills || "projetos profissionais"}, foco em resultados mensuráveis e comunicação clara. ${experience ? `Destaque para ${experience.replace(/\.$/, "")}.` : "Atuação orientada a melhoria contínua, colaboração e entrega de valor."}`;
  }
  return `${role} with experience in ${skills || "professional projects"}, focused on measurable outcomes and clear communication. ${experience ? `Known for ${experience.replace(/\.$/, "")}.` : "Brings a practical approach to continuous improvement, collaboration, and value delivery."}`;
}

function ruleBasedExperienceBullets(resume) {
  const experience = resume.workExperience?.[0] || {};
  const bullets = (experience.achievements || []).filter(Boolean);
  if (bullets.length) {
    return bullets.map((item) => item.replace(/^[-â€¢]\s*/, "").replace(/^(worked|responsible)/i, currentLanguage === "pt" ? "Atuei" : "Led"));
  }
  const role = experience.role || resume.personal?.title || (currentLanguage === "pt" ? "profissional" : "professional");
  const skills = (resume.skills || []).slice(0, 3).join(", ");
  return currentLanguage === "pt"
    ? [`Atuei como ${role} em [tipo de projeto], utilizando ${skills || "[ferramentas/tecnologias]"} para entregar [resultado].`, "Colaborei com equipes e clientes para transformar necessidades em entregas claras, organizadas e mensuráveis.", "Melhorei [processo/página/entrega] com foco em qualidade, comunicação e impacto para o usuário final."]
    : [`Worked as ${role} on [project type], using ${skills || "[tools/technologies]"} to deliver [result].`, "Collaborated with teams and stakeholders to turn requirements into clear, organized, measurable deliverables.", "Improved [process/page/deliverable] with focus on quality, communication, and end-user impact."];
}

function ruleBasedSkillSuggestions(resume, jobText = "") {
  const existing = resume.skills || [];
  const keywords = extractJobKeywords(jobText || resumeSearchText(resume), resume);
  const defaults = currentLanguage === "pt"
    ? ["Comunicação", "Análise de dados", "Gestão de prioridades", "Resolução de problemas", "Colaboração"]
    : ["Communication", "Data analysis", "Prioritization", "Problem solving", "Collaboration"];
  return [...new Set([...existing, ...keywords, ...defaults])].slice(0, 12);
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

function aiAnalysisResult(result, resume, values) {
  const a = t().ai;
  const fallback = analyzeResumeForJob(resume, values);
  const matched = Array.isArray(result.matchedKeywords) ? result.matchedKeywords : fallback.foundKeywords;
  const missing = Array.isArray(result.missingKeywords) ? result.missingKeywords : fallback.missingKeywords;
  const suggestions = Array.isArray(result.suggestions) && result.suggestions.length
    ? result.suggestions.map((text, index) => ({
        category: index === 0 ? a.categories.summary : index === 1 ? a.categories.keywords : a.categories.experience,
        text,
        section: index === 1 ? "skills" : "summary",
      }))
    : fallback.suggestions;
  return {
    score: Math.max(0, Math.min(100, Number(result.score) || fallback.score)),
    foundKeywords: matched,
    missingKeywords: missing,
    skillsMatch: fallback.skillsMatch,
    skillsMatched: fallback.skillsMatched,
    experienceMatch: fallback.experienceMatch,
    experienceNote: result.explanation || fallback.experienceNote,
    suggestions,
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
      ${settingsPaymentMethodsSection()}
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
  const access = getUserAccess();
  const planText = accessPlanExpiryLabel(access) ? `${accessPlanLabel(access)} · ${accessPlanExpiryLabel(access)}` : accessPlanLabel(access);
  const themeOptions = ["light", "dark", "system"].map((value) => [value, s.themeOptions[value]]);
  dashboardShell("settings", `
    <main class="settings-page settings-page-premium">
      <section class="settings-hero-card">
        <div class="settings-avatar">${escapeHtml(profileInitials(profile))}</div>
        <div>
          <span class="eyebrow">Succeedora</span>
          <h2>${escapeHtml(profile.fullName)}</h2>
          <p>${escapeHtml(profile.email)} &middot; ${copy.dashboard.currentPlan}: ${escapeHtml(planText)}</p>
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
      ${settingsPaymentMethodsSection()}
      <section class="settings-grid">
        <article class="settings-card account-settings-card">
          <div class="settings-card-head"><div><span class="eyebrow">${s.accountTitle}</span><h2>${s.accountTitle}</h2></div></div>
          <div class="settings-status-list">
            <span>${icon("check")} ${escapeHtml(profile.email)}</span>
            <span>${icon("card")} ${copy.dashboard.currentPlan}: ${escapeHtml(planText)}</span>
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
  const coverLetterLimitLocked = !canUseFeature("cover_letters_unlimited") && letters.length >= 1;
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
          <div class="ai-action-row">
            <button class="secondary-button small ${!canUseAiTask("generate_cover_letter") ? "locked-action" : ""}" type="button" data-cover-letter-generate>${icon(canUseAiTask("generate_cover_letter") ? "sparkles" : "lock")} ${aiCopy().generateLetter}</button>
            <button class="ghost-button small ${!canUseAiTask("improve_cover_letter") ? "locked-action" : ""}" type="button" data-cover-letter-ai="improve_cover_letter">${icon(canUseAiTask("improve_cover_letter") ? "sparkles" : "lock")} ${aiCopy().improveLetter}</button>
            <button class="ghost-button small ${!canUseAiTask("tailor_cover_letter_to_job") ? "locked-action" : ""}" type="button" data-cover-letter-ai="tailor_cover_letter_to_job">${icon(canUseAiTask("tailor_cover_letter_to_job") ? "target" : "lock")} ${aiCopy().tailorLetter}</button>
            <button class="ghost-button small ${!canUseAiTask("formal_cover_letter") ? "locked-action" : ""}" type="button" data-cover-letter-ai="formal_cover_letter">${icon(canUseAiTask("formal_cover_letter") ? "pen" : "lock")} ${aiCopy().formalLetter}</button>
            <button class="ghost-button small ${!canUseAiTask("direct_cover_letter") ? "locked-action" : ""}" type="button" data-cover-letter-ai="direct_cover_letter">${icon(canUseAiTask("direct_cover_letter") ? "pen" : "lock")} ${aiCopy().directLetter}</button>
            <button class="ghost-button small ${!canUseAiTask("confident_cover_letter") ? "locked-action" : ""}" type="button" data-cover-letter-ai="confident_cover_letter">${icon(canUseAiTask("confident_cover_letter") ? "pen" : "lock")} ${aiCopy().confidentLetter}</button>
          </div>
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
      <div class="page-actions"><p>${c.intro}</p><button class="primary-button ${coverLetterLimitLocked ? "locked-action" : ""}" type="button" data-cover-letter-new>${icon(coverLetterLimitLocked ? "lock" : "mail")} ${c.dashboardNew}</button></div>
      ${coverLetterBuilderOpen ? builder : library}
    </main>
  `);
}

function renderTemplatesPage() {
  const copy = t();
  const labels = currentLanguage === "pt"
    ? {
        eyebrow: "Modelos profissionais",
        title: "Escolha um currículo com presença global.",
        text: "Filtre por área, plano e objetivo para encontrar o modelo certo antes de abrir o criador.",
        search: "Buscar modelos...",
      }
    : {
        eyebrow: "Professional templates",
        title: "Choose a resume with global polish.",
        text: "Filter by field, plan and goal to find the right template before opening the builder.",
        search: "Search templates...",
      };
  const templates = resumeTemplates();
  dashboardShell("templates", `
    <main class="dashboard-content templates-catalog-page">
      <section class="templates-catalog-hero">
        <div>
          <span class="eyebrow">${labels.eyebrow}</span>
          <h1>${labels.title}</h1>
          <p>${labels.text}</p>
        </div>
        <label class="template-search">${icon("file")}<input type="search" data-template-search placeholder="${labels.search}" /></label>
      </section>
      <div class="template-filter-row">${templateFilterOptions().map(([key, label], index) => `<button class="${index === 0 ? "active" : ""}" type="button" data-template-filter="${key}">${label}</button>`).join("")}</div>
      <div class="template-grid dashboard-templates">${templates.map((template, index) => {
        const locked = !canUseTemplate(template.key);
        const accessClass = templateAccessClass(template);
        const accessLabel = templateAccessLabel(template);
        const lockFeature = templateLockFeature(template);
        return `
        <article class="template-card dashboard-template-card template-${template.key} ${locked ? "locked-feature" : ""}" data-template-category="${template.key}" data-template-access="${template.access}" data-template-status="${template.status}" data-template-groups="${template.filterGroups.join(" ")}" data-template-search="${escapeHtml(`${template.name} ${template.category} ${template.description} ${template.bestForText}`.toLowerCase())}">
          <div class="template-card-topline">
            <span class="template-badge">${template.category}</span>
            <span class="template-badge ${accessClass}">${accessLabel}</span>
            ${locked ? lockedBadge(lockFeature) : ""}
          </div>
          ${templateCardPreviewMarkup(template.key)}
          <h3>${template.name}</h3>
          <p>${template.description}</p>
          <p class="template-best"><strong>${copy.dashboard.bestFor}:</strong> ${template.bestForText}</p>
          <div class="template-actions">
            <button class="ghost-button small" type="button" data-template-preview="${template.key}" data-preview-context="dashboard">${copy.dashboard.previewTemplate}</button>
            <button class="secondary-button small ${locked ? "locked-action" : ""}" type="button" data-use-template="${template.key}" data-template-destination="builder">${locked ? `${icon("lock")} ${featureAccessCopy().locked}` : copy.dashboard.useTemplate}</button>
          </div>
        </article>
      `;
      }).join("")}</div>
    </main>
  `);
}

function renderBilling() {
  const access = getUserAccess();
  const labels = t().dashboard.access;
  const stripeLabels = t().payments;
  const canManageStripe = access.planState?.source === "stripe" && access.planState?.stripeSubscriptionId;
  const stripeTestNotice = stripeConfig.mode === "test" && isAdminAccount() ? `<p class="planned-payment-note">${stripeLabels.stripeTestMode}: ${stripeLabels.stripeTestNotice}</p>` : "";
  dashboardShell("billing", `
    <main class="dashboard-content billing-page">
      <section class="billing-summary settings-card">
        <div>
          <span class="eyebrow">${t().dashboard.billing}</span>
          <h2>${currentPlanText(access)}</h2>
          <p>${labels.aiCredits}: ${access.aiCredits}</p>
          ${stripeTestNotice}
        </div>
        <div class="billing-actions">
          <button class="primary-button small" type="button" data-pricing-jump="monthly">${t().dashboard.upgrade}</button>
          <button class="secondary-button small" type="button" data-pricing-jump="credits">${labels.buyCredits}</button>
          <button class="secondary-button small" type="button" data-pricing-jump="one-time">${labels.removeWatermark}</button>
          ${canManageStripe ? `<button class="secondary-button small" type="button" data-stripe-portal>${stripeLabels.manageSubscription}</button>` : ""}
        </div>
      </section>
      ${monetizationSections("dashboard", { showFaq: false })}
      ${paymentHistorySection()}
      ${pricingFaqAccordion()}
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
