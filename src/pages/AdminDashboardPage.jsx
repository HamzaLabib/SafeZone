import { Inbox, LogOut, RefreshCcw, Search, UsersRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { InputField, SelectField } from '../components/ui/FormField';

const leadStatuses = ['New', 'Contacted', 'Registered', 'Not Interested'];

function normalizeStatus(status) {
  if (!status) return 'New';
  if (status === 'new') return 'New';
  return status;
}

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function includesQuery(record, query) {
  if (!query) return true;
  const haystack = [
    record.fullName,
    record.name,
    record.email,
    record.phone,
    record.courseInterest,
    record.subject,
    record.message,
    normalizeStatus(record.status),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [registrationLeads, setRegistrationLeads] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState('');

  async function loadDashboardData() {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/dashboard-data');
      const result = await response.json();

      if (response.status === 401) {
        navigate('/admin/login', { replace: true });
        return;
      }

      if (!response.ok || !result.ok) {
        setError(result.error || 'Could not load dashboard data.');
        return;
      }

      setRegistrationLeads(result.registrationLeads || []);
      setContactMessages(result.contactMessages || []);
    } catch {
      setError('Could not reach the admin dashboard service.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLeads = useMemo(
    () =>
      registrationLeads.filter((lead) => {
        const status = normalizeStatus(lead.status);
        return includesQuery(lead, query) && (!statusFilter || status === statusFilter);
      }),
    [registrationLeads, query, statusFilter],
  );

  const filteredMessages = useMemo(
    () =>
      contactMessages.filter((message) => {
        const status = normalizeStatus(message.status);
        return includesQuery(message, query) && (!statusFilter || status === statusFilter);
      }),
    [contactMessages, query, statusFilter],
  );

  async function updateLeadStatus(id, status) {
    setUpdatingId(id);
    setError('');

    try {
      const response = await fetch('/api/admin/update-lead-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();

      if (response.status === 401) {
        navigate('/admin/login', { replace: true });
        return;
      }

      if (!response.ok || !result.ok) {
        setError(result.error || 'Could not update lead status.');
        return;
      }

      setRegistrationLeads((current) =>
        current.map((lead) => (lead._id === id ? { ...lead, status } : lead)),
      );
    } catch {
      setError('Could not reach the status update service.');
    } finally {
      setUpdatingId('');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    navigate('/admin/login', { replace: true });
  }

  return (
    <>
      <Seo
        title="Admin Dashboard"
        description="Protected Safe Zone Security Academy admin dashboard for registration leads and contact messages."
      />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <section className="flex flex-col gap-4 rounded-lg bg-academyNavy p-6 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-200">Admin dashboard</p>
            <h1 className="mt-2 text-3xl font-extrabold">Form submissions</h1>
            <p className="mt-2 text-sm leading-6 text-white/75">
              Review registration leads, contact messages, notification status, and lead follow-up status.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="outlineDark" onClick={loadDashboardData}>
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Refresh
            </Button>
            <Button type="button" variant="secondary" onClick={handleLogout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <Card className="p-5">
            <UsersRound className="h-6 w-6 text-academyBlue" aria-hidden="true" />
            <p className="mt-3 text-3xl font-extrabold text-slate-950">{registrationLeads.length}</p>
            <p className="text-sm font-semibold text-slate-600">Registration leads</p>
          </Card>
          <Card className="p-5">
            <Inbox className="h-6 w-6 text-academyBlue" aria-hidden="true" />
            <p className="mt-3 text-3xl font-extrabold text-slate-950">{contactMessages.length}</p>
            <p className="text-sm font-semibold text-slate-600">Contact messages</p>
          </Card>
        </section>

        <Card className="mt-6 p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <InputField
              id="admin-search"
              label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, email, phone, course, subject, or status"
            />
            <SelectField
              id="admin-status-filter"
              label="Lead status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">All statuses</option>
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </SelectField>
          </div>
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
            <Search className="h-4 w-4" aria-hidden="true" />
            Showing {filteredLeads.length} leads and {filteredMessages.length} messages.
          </p>
        </Card>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}

        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-slate-950">Registration Leads</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[1100px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Notification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="align-top">
                    <td className="px-4 py-3 font-semibold text-slate-950">{lead.fullName || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.email || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.phone || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.courseInterest || '-'}</td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{lead.message || '-'}</td>
                    <td className="px-4 py-3">
                      <select
                        className="w-40 rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 outline-none focus:border-academyBlue focus:ring-2 focus:ring-blue-100"
                        value={normalizeStatus(lead.status)}
                        disabled={updatingId === lead._id}
                        onChange={(event) => updateLeadStatus(lead._id, event.target.value)}
                      >
                        {leadStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(lead.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{lead.notificationStatus || '-'}</td>
                  </tr>
                ))}
                {!isLoading && filteredLeads.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-slate-500" colSpan="8">
                      No registration leads match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-slate-950">Contact Messages</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[1000px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Notification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMessages.map((message) => (
                  <tr key={message._id} className="align-top">
                    <td className="px-4 py-3 font-semibold text-slate-950">{message.name || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{message.email || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{message.phone || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{message.subject || '-'}</td>
                    <td className="max-w-sm px-4 py-3 text-slate-600">{message.message || '-'}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{normalizeStatus(message.status)}</td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(message.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{message.notificationStatus || '-'}</td>
                  </tr>
                ))}
                {!isLoading && filteredMessages.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-slate-500" colSpan="8">
                      No contact messages match the current search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
