import { CreditCard, Inbox, LogOut, RefreshCcw, Search, ShoppingBag, UsersRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { InputField, SelectField } from '../components/ui/FormField';

const leadStatuses = ['New', 'Contacted', 'Registered', 'Not Interested'];
const paymentStatuses = ['unpaid', 'pending', 'paid', 'failed', 'refunded'];
const orderStatuses = ['New', 'Contacted', 'Quoted', 'Confirmed', 'Fulfilled', 'Cancelled'];

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

function formatMoney(amountCents, currency = 'CAD') {
  if (!Number.isInteger(amountCents)) return '-';

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
  }).format(amountCents / 100);
}

function normalizePaymentStatus(status) {
  return paymentStatuses.includes(status) ? status : 'unpaid';
}

function normalizeOrderStatus(status) {
  return orderStatuses.includes(status) ? status : 'New';
}

function formatFulfillmentPreference(value) {
  const labels = {
    pickup: 'Pickup',
    shipping: 'Shipping',
    either: 'Either',
  };

  return labels[value] || value || '-';
}

function formatDisplayName(record) {
  const splitName = [record.firstName, record.lastName].filter(Boolean).join(' ').trim();
  return record.name || record.fullName || splitName || '-';
}

function includesQuery(record, query) {
  if (!query) return true;
  const haystack = [
    record.fullName,
    record.name,
    record.firstName,
    record.lastName,
    record.email,
    record.phone,
    record.courseInterest,
    record.selectedCourseId,
    record.selectedCourseTitle,
    record.productId,
    record.productTitle,
    record.sku,
    record.category,
    record.paymentStatus,
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
  const [orderRequests, setOrderRequests] = useState([]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState('');

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
      setOrderRequests(result.orderRequests || []);
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

  const filteredOrderRequests = useMemo(
    () => orderRequests.filter((orderRequest) => includesQuery(orderRequest, query)),
    [orderRequests, query],
  );

  const paymentStatusCounts = useMemo(
    () =>
      paymentStatuses.reduce((counts, status) => {
        counts[status] = registrationLeads.filter((lead) => normalizePaymentStatus(lead.paymentStatus) === status).length;
        return counts;
      }, {}),
    [registrationLeads],
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

  async function updateOrderStatus(id, status) {
    setUpdatingOrderId(id);
    setError('');

    try {
      const response = await fetch('/api/admin/update-order-status', {
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
        setError(result.error || 'Could not update order request status.');
        return;
      }

      setOrderRequests((current) =>
        current.map((orderRequest) => (orderRequest._id === id ? { ...orderRequest, status } : orderRequest)),
      );
    } catch {
      setError('Could not reach the order status update service.');
    } finally {
      setUpdatingOrderId('');
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
              Review registration leads, market requests, contact messages, notification status, and payment readiness.
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

        <section className="mt-6 grid gap-4 md:grid-cols-4">
          <Card className="p-5">
            <UsersRound className="h-6 w-6 text-academyBlue" aria-hidden="true" />
            <p className="mt-3 text-3xl font-extrabold text-slate-950">{registrationLeads.length}</p>
            <p className="text-sm font-semibold text-slate-600">Registration leads</p>
          </Card>
          <Card className="p-5">
            <CreditCard className="h-6 w-6 text-academyBlue" aria-hidden="true" />
            <p className="mt-3 text-3xl font-extrabold text-slate-950">{paymentStatusCounts.unpaid || 0}</p>
            <p className="text-sm font-semibold text-slate-600">Unpaid registrations</p>
            <p className="mt-2 text-xs text-slate-500">
              Pending {paymentStatusCounts.pending || 0} / Paid {paymentStatusCounts.paid || 0} / Failed{' '}
              {paymentStatusCounts.failed || 0} / Refunded {paymentStatusCounts.refunded || 0}
            </p>
          </Card>
          <Card className="p-5">
            <ShoppingBag className="h-6 w-6 text-academyBlue" aria-hidden="true" />
            <p className="mt-3 text-3xl font-extrabold text-slate-950">{orderRequests.length}</p>
            <p className="text-sm font-semibold text-slate-600">Market requests</p>
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
              placeholder="Name, email, phone, course, item, subject, or status"
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
            Showing {filteredLeads.length} leads, {filteredOrderRequests.length} market requests, and{' '}
            {filteredMessages.length} messages.
          </p>
        </Card>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{error}</p>}

        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-slate-950">Registration Leads</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[1300px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Notification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="align-top">
                    <td className="px-4 py-3 font-semibold text-slate-950">{formatDisplayName(lead)}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.email || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.phone || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.selectedCourseTitle || lead.courseInterest || '-'}</td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">
                        {normalizePaymentStatus(lead.paymentStatus)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatMoney(lead.amountCents, lead.currency)}</td>
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
                    <td className="px-4 py-6 text-center text-slate-500" colSpan="10">
                      No registration leads match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-extrabold text-slate-950">Market Requests</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            These are request-to-order submissions only. Staff must confirm final price, taxes, availability, and pickup or
            shipping before treating any request as a purchase.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-[1300px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Fulfillment</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Listed Price</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Notification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrderRequests.map((orderRequest) => (
                  <tr key={orderRequest._id} className="align-top">
                    <td className="px-4 py-3 font-semibold text-slate-950">{formatDisplayName(orderRequest)}</td>
                    <td className="px-4 py-3 text-slate-600">{orderRequest.email || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{orderRequest.phone || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{orderRequest.productTitle || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{orderRequest.sku || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">{orderRequest.quantity || '-'}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatFulfillmentPreference(orderRequest.fulfillmentPreference)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">
                        {normalizePaymentStatus(orderRequest.paymentStatus)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatMoney(orderRequest.amountCents, orderRequest.currency) === '-'
                        ? orderRequest.displayPrice || '-'
                        : formatMoney(orderRequest.amountCents, orderRequest.currency)}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{orderRequest.message || '-'}</td>
                    <td className="px-4 py-3">
                      <select
                        className="w-40 rounded-lg border border-slate-300 px-3 py-2 font-semibold text-slate-700 outline-none focus:border-academyBlue focus:ring-2 focus:ring-blue-100"
                        value={normalizeOrderStatus(orderRequest.status)}
                        disabled={updatingOrderId === orderRequest._id}
                        onChange={(event) => updateOrderStatus(orderRequest._id, event.target.value)}
                      >
                        {orderStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{formatDate(orderRequest.createdAt)}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700">{orderRequest.notificationStatus || '-'}</td>
                  </tr>
                ))}
                {!isLoading && filteredOrderRequests.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-slate-500" colSpan="13">
                      No market requests match the current search.
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
                    <td className="px-4 py-3 font-semibold text-slate-950">{formatDisplayName(message)}</td>
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
