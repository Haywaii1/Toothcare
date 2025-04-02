<!DOCTYPE html>
<html>
<head>
    <title>Appointment Confirmation</title>
</head>
<body>
    <h2>Hello {{ $appointment->name }},</h2>
    <p>Your appointment has been successfully booked!</p>

    <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($appointment->date)->format('F j, Y') }}</p>
    <p><strong>Time:</strong> {{ \Carbon\Carbon::parse($appointment->time)->format('h:i A') }}</p>
    <p><strong>Ailment:</strong> {{ $appointment->ailment }}</p>

    <p>Thank you for booking with us!</p>
</body>
</html>
