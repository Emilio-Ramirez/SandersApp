### Sin autenticación

1. Página de inicio y navegación principal:

```mermaid
stateDiagram-v2
    [*] --> LandingPage
    state LandingPageChoice <<choice>>
    LandingPage --> LandingPageChoice
    LandingPageChoice --> Login : Iniciar sesión
    LandingPageChoice --> Register : Registrarse
    LandingPageChoice --> QuickDonation : Donación rápida
    Login --> [*]
    Register --> [*]
    QuickDonation --> [*]
```

2. Proceso de registro:

```mermaid
stateDiagram-v2
    [*] --> Register
    Register --> FillRegistrationForm
    FillRegistrationForm --> ValidateForm
    state ValidateForm <<choice>>
    ValidateForm --> RegistrationSuccess : Datos válidos
    ValidateForm --> FillRegistrationForm : Datos inválidos
    RegistrationSuccess --> SendConfirmationEmail
    SendConfirmationEmail --> [*]
```

3. Donación rápida:

```mermaid
stateDiagram-v2
    [*] --> QuickDonation
    QuickDonation --> EnterEmailAddress
    EnterEmailAddress --> SelectProject
    SelectProject --> EnterDonationAmount
    EnterDonationAmount --> ProcessPayment
    ProcessPayment --> SendConfirmationEmail
    SendConfirmationEmail --> [*]
```

### Usuario

1. Proceso de login de usuario:

```mermaid
stateDiagram-v2
    [*] --> EnterCredentials
    EnterCredentials --> ValidateCredentials
    state ValidateCredentials <<choice>>
    ValidateCredentials --> UserDashboard : Credenciales correctas
    ValidateCredentials --> EnterCredentials : Credenciales incorrectas
    UserDashboard --> [*]
```

2. Dashboard de usuario:

```mermaid
stateDiagram-v2
    [*] --> UserDashboard
    state UserDashboardChoice <<choice>>
    UserDashboard --> UserDashboardChoice
    UserDashboardChoice --> UserProfile : Ver perfil
    UserDashboardChoice --> ProjectsSection : Ver proyectos
    UserDashboardChoice --> DonationsSection : Ver donaciones
    UserProfile --> UserDashboard
    ProjectsSection --> UserDashboard
    DonationsSection --> UserDashboard
    UserDashboard --> [*]
```

3. Gestión de perfil de usuario:

```mermaid
stateDiagram-v2
    [*] --> UserProfile
    UserProfile --> ViewPersonalInfo
    UserProfile --> EditPersonalInfo
    EditPersonalInfo --> SaveChanges
    state SaveChanges <<choice>>
    SaveChanges --> UserProfile : Cambios guardados
    SaveChanges --> EditPersonalInfo : Error al guardar
    UserProfile --> [*]
```

4. Sección de proyectos:

```mermaid
stateDiagram-v2
    [*] --> ProjectsSection
    ProjectsSection --> ListProjects
    ListProjects --> FilterProjects
    ListProjects --> SearchProjects
    ListProjects --> ViewProjectDetails
    ViewProjectDetails --> DonateToProject
    DonateToProject --> ConfirmDonation
    ViewProjectDetails --> [*]
```

5. Sección de donaciones:

```mermaid
stateDiagram-v2
    [*] --> DonationsSection
    DonationsSection --> ListDonations
    DonationsSection --> CreateNewDonation
    DonationsSection --> ManageRecurringDonations
    ListDonations --> ViewDonationDetails
    CreateNewDonation --> SelectProject
    SelectProject --> EnterDonationAmount
    EnterDonationAmount --> ConfirmDonation
    ManageRecurringDonations --> PauseRecurringDonation
    ManageRecurringDonations --> CancelRecurringDonation
    DonationsSection --> [*]
```

### Administrador

1. Proceso de login de administrador:

```mermaid
stateDiagram-v2
    [*] --> EnterAdminCredentials
    EnterAdminCredentials --> ValidateAdminCredentials
    state ValidateAdminCredentials <<choice>>
    ValidateAdminCredentials --> AdminDashboard : Credenciales correctas
    ValidateAdminCredentials --> EnterAdminCredentials : Credenciales incorrectas
    AdminDashboard --> [*]
```

2. Dashboard de administrador:

```mermaid
stateDiagram-v2
    [*] --> AdminDashboard
    state AdminDashboardChoice <<choice>>
    AdminDashboard --> AdminDashboardChoice
    AdminDashboardChoice --> UserManagement : Gestionar usuarios
    AdminDashboardChoice --> ProviderManagement : Gestionar proveedores
    AdminDashboardChoice --> ProjectManagement : Gestionar proyectos
    AdminDashboardChoice --> DonationManagement : Gestionar donaciones
    AdminDashboardChoice --> ReportGeneration : Generar reportes
    AdminDashboard --> [*]
```

3. Gestión de usuarios:

```mermaid
stateDiagram-v2
    [*] --> UserManagement
    UserManagement --> ListUsers
    UserManagement --> CreateUser
    UserManagement --> EditUser
    UserManagement --> DeleteUser
    CreateUser --> SaveNewUser
    EditUser --> SaveUserChanges
    DeleteUser --> ConfirmUserDeletion
    UserManagement --> [*]
```

4. Gestión de proveedores:

```mermaid
stateDiagram-v2
    [*] --> ProviderManagement
    ProviderManagement --> ListProviders
    ProviderManagement --> CreateProvider
    ProviderManagement --> EditProvider
    ProviderManagement --> DeleteProvider
    CreateProvider --> SaveNewProvider
    EditProvider --> SaveProviderChanges
    DeleteProvider --> ConfirmProviderDeletion
    ProviderManagement --> [*]
```

5. Gestión de proyectos:

```mermaid
stateDiagram-v2
    [*] --> ProjectManagement
    ProjectManagement --> ListProjects
    ProjectManagement --> CreateProject
    ProjectManagement --> EditProject
    ProjectManagement --> DeleteProject
    CreateProject --> SaveNewProject
    EditProject --> SaveProjectChanges
    DeleteProject --> ConfirmProjectDeletion
    ProjectManagement --> [*]
```

6. Gestión de donaciones:

```mermaid
stateDiagram-v2
    [*] --> DonationManagement
    DonationManagement --> ListDonations
    DonationManagement --> ViewDonationDetails
    DonationManagement --> UpdateDonationStatus
    DonationManagement --> DeleteDonation
    UpdateDonationStatus --> SaveStatusChanges
    DeleteDonation --> ConfirmDonationDeletion
    DonationManagement --> [*]
```

7. Generación de reportes:

```mermaid
stateDiagram-v2
    [*] --> ReportGeneration
    ReportGeneration --> GenerateDonationReport
    ReportGeneration --> GenerateProjectReport
    ReportGeneration --> ViewStatistics
    GenerateDonationReport --> DownloadReport
    GenerateProjectReport --> DownloadReport
    ViewStatistics --> ExportStatistics
    ReportGeneration --> [*]
```
