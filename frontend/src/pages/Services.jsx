export default function Services() {
  const services = [
    { id: 1, name: 'Invoice Management', description: 'Create and manage invoices easily' },
    { id: 2, name: 'Estimates', description: 'Generate professional estimates' },
    { id: 3, name: 'Kanban Board', description: 'Organize tasks with our kanban system' },
    { id: 4, name: 'User Management', description: 'Manage team members and roles' },
    { id: 5, name: 'Notifications', description: 'Stay updated with real-time notifications' },
    { id: 6, name: 'Analytics', description: 'Track your business metrics' },
  ];

  return (
    <div>
      <h1>Our Services</h1>
      <div className="services">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

