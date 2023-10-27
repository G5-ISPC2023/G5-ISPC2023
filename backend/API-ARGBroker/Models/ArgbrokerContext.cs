using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API_ARGBroker.Models;

public partial class ArgbrokerContext : DbContext
{
    public ArgbrokerContext()
    {
    }

    public ArgbrokerContext(DbContextOptions<ArgbrokerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Accione> Acciones { get; set; }

    public virtual DbSet<AccionesComprada> AccionesCompradas { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Accione>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Acciones__3214EC274AA820C8");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Apertura).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Maximo).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Minimo).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precio");
            entity.Property(e => e.UltimoCierre).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.VariacionDiaria).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<AccionesComprada>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Acciones__3214EC07480B389A");

            entity.Property(e => e.FechaCompra).HasColumnType("date");

            entity.HasOne(d => d.Accion).WithMany(p => p.AccionesComprada)
                .HasForeignKey(d => d.AccionId)
                .HasConstraintName("FK__AccionesC__Accio__59063A47");

            entity.HasOne(d => d.Usuario).WithMany(p => p.AccionesComprada)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__AccionesC__Usuar__5812160E");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Rol__3214EC277BD3F199");

            entity.ToTable("Rol");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Titulo)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("titulo");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC076D6C07B8");

            entity.ToTable("Usuario");

            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Contraseña)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Dni)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("DNI");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Pais)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.RolId).HasColumnName("RolID");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.RolId)
                .HasConstraintName("FK__Usuario__RolID__5441852A");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
