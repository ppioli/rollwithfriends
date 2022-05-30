namespace Server.Models;

public record UsuarioInput( string Username, string Password, string Email, string[] Roles);